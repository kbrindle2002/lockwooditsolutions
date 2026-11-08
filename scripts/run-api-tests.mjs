// Offline runner: never pulls images, installs packages, forwards host env or mounts secrets.
import { spawnSync } from 'node:child_process';
import { mkdtemp,mkdir,copyFile,lstat,realpath,rm,chmod } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname,resolve,join,relative,isAbsolute,basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const project = resolve(dirname(fileURLToPath(import.meta.url)),'..');
const args = process.argv.slice(2);
if (args.length && (args.length !== 2 || args[0] !== '--api-root')) throw new Error('Only --api-root is supported');
const apiRoot = resolve(project,args[1] || 'api');
const sourceTests = join(project,'api','test');
const image = process.env.LITS_TEST_IMAGE;
if (!/^node@sha256:[a-f0-9]{64}$/.test(image || '')) throw new Error('Approved cached node@sha256 image required; no mutable tag fallback');
const staging = await mkdtemp(join(tmpdir(),'lits-api-offline-'));
const containerName = basename(staging).toLowerCase();
async function copy(sourceRoot,file,targetRoot) {
  const source = join(sourceRoot,file);
  const canonicalRoot = await realpath(sourceRoot);
  const canonicalFile = await realpath(source);
  const within = relative(canonicalRoot,canonicalFile);
  const info = await lstat(source);
  if (within.startsWith('..') || isAbsolute(within) || info.isSymbolicLink() || !info.isFile()) throw new Error('Unsafe test source');
  const target = join(targetRoot,file);
  await mkdir(dirname(target),{recursive:true});
  await chmod(dirname(target),0o755);
  await copyFile(source,target);
  await chmod(target,0o644);
}
try {
  await chmod(staging,0o755); // mkdtemp defaults to 0700; the unprivileged container must be able to read.
  // Only these public source files enter the container; no host config or credentials.
  for (const file of ['package.json','host.json','contacts-create/function.json','contacts-create/index.js']) await copy(apiRoot,file,staging);
  for (const file of ['contacts-create.test.js','offline-guard.cjs','network-preflight.cjs']) await copy(sourceTests,file,join(staging,'test'));
  const result = spawnSync('docker',[
    'run','--rm','--name',containerName,'--pull=never','--network=none','--read-only',
    '--cap-drop=ALL','--security-opt=no-new-privileges','--pids-limit=128',
    '--memory=256m','--cpus=1','--user=65534:65534',
    '--tmpfs=/tmp:rw,noexec,nosuid,size=16m',
    '--mount',`type=bind,source=${staging},target=/api,readonly`,
    '--workdir=/api','--env=LITS_NETWORK_BLOCKED=1',
    '--entrypoint=/bin/sh',image,'-c',
    'node test/network-preflight.cjs && node --require ./test/offline-guard.cjs --test test/contacts-create.test.js',
  ],{stdio:'inherit',timeout:120000});
  if (result.error || result.signal) {
    if (result.error?.code !== 'ENOENT') {
      const stop = spawnSync('docker',['rm','--force',containerName],{stdio:'pipe',timeout:10000});
      if (stop.error || stop.status !== 0) throw new Error('STOP_UNCONFIRMED: container cleanup could not be verified; inspect the named container before retrying');
    }
    throw new Error('Offline API test container failed or exceeded its deadline');
  }
  if (result.status !== 0) throw new Error('Offline API tests failed');
} finally {
  // This process created the unique directory; no caller-supplied cleanup target.
  if (dirname(staging) !== await realpath(tmpdir()) && dirname(staging) !== resolve(tmpdir())) throw new Error('Unsafe staging cleanup path');
  await rm(staging,{recursive:true,force:true});
}
