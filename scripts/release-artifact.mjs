import { createHash } from 'node:crypto';
import { lstat,readdir,readFile,mkdir,copyFile,writeFile,appendFile } from 'node:fs/promises';
import { resolve,join,relative,sep } from 'node:path';

const root = resolve('release');
const commit = process.env.EXPECTED_COMMIT;
const mode = process.argv[2];
if (!/^[a-f0-9]{40}$/.test(commit || '') || !['package','verify'].includes(mode)) throw new Error('Explicit commit and package/verify mode required');
const hash = bytes => createHash('sha256').update(bytes).digest('hex');
const sensitive = /(^|\/)(\.env[^/]*|local\.settings[^/]*|[^/]*(credential|password|secret|token)[^/]*)(\/|$)/i;
async function walk(directory,base=directory) {
  const directoryInfo = await lstat(directory);
  if (!directoryInfo.isDirectory() || directoryInfo.isSymbolicLink()) throw new Error('Directory must be real');
  const files = [];
  for (const entry of await readdir(directory)) {
    const path = join(directory,entry);
    const info = await lstat(path);
    const name = relative(base,path).split(sep).join('/');
    if (info.isSymbolicLink() || sensitive.test(name)) throw new Error('Forbidden package entry');
    if (info.isDirectory()) files.push(...await walk(path,base));
    else if (info.isFile()) files.push(name);
    else throw new Error('Nonregular package entry');
  }
  return files.sort();
}
const runtime = ['host.json','package.json','contacts-create/function.json','contacts-create/index.js'];
async function inventory() {
  const files = [];
  for (const area of ['app','api']) {
    for (const file of await walk(join(root,area))) files.push({path:`${area}/${file}`,sha256:hash(await readFile(join(root,area,file)))});
  }
  return files.sort((a,b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}
if (mode === 'package') {
  const apiPackage = JSON.parse(await readFile('api/package.json','utf8'));
  if (['dependencies','optionalDependencies','devDependencies'].some(key => Object.keys(apiPackage[key] || {}).length)) {
    throw new Error('API dependencies require a separately reviewed packaging design');
  }
  await mkdir(root); // Never overwrite an old package.
  await mkdir(join(root,'app'));
  await mkdir(join(root,'api'));
  for (const file of await walk(resolve('out'))) {
    const target = join(root,'app',file);
    await mkdir(resolve(target,'..'),{recursive:true});
    await copyFile(join('out',file),target);
  }
  for (const file of runtime) {
    const source = join('api',file);
    const info = await lstat(source);
    if (!info.isFile() || info.isSymbolicLink()) throw new Error('Invalid API runtime source');
    const target = join(root,'api',file);
    await mkdir(resolve(target,'..'),{recursive:true});
    await copyFile(source,target);
  }
  const manifest = JSON.stringify({schemaVersion:1,commit,files:await inventory()},null,2)+'\n';
  await writeFile(join(root,'manifest.json'),manifest,{flag:'wx'});
  if (!process.env.GITHUB_OUTPUT) throw new Error('CI output destination required');
  await appendFile(process.env.GITHUB_OUTPUT,`manifest_sha256=${hash(manifest)}\n`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    const environment = process.env.GITHUB_EVENT_NAME === 'push' ? 'lits-production' : 'lits-preview';
    await appendFile(process.env.GITHUB_STEP_SUMMARY,
      `Validated package candidate\n\nCommit: ${commit}\n\nManifest SHA-256: ${hash(manifest)}\n\nAfter validation succeeds, an independent human reviewer must approve with this exact comment:\n\nAPPROVE ${environment} ${commit} ${hash(manifest)} run:${process.env.GITHUB_RUN_ID} attempt:${process.env.GITHUB_RUN_ATTEMPT}\n\nUpload occurs only after all validation succeeds.\n`);
  }
} else {
  const expected = process.env.EXPECTED_MANIFEST_SHA256;
  if (!(await lstat(root)).isDirectory() || (await lstat(root)).isSymbolicLink() ||
      !(await lstat(join(root,'manifest.json'))).isFile() || (await lstat(join(root,'manifest.json'))).isSymbolicLink()) throw new Error('Invalid release root or manifest');
  const bytes = await readFile(join(root,'manifest.json'));
  if (!/^[a-f0-9]{64}$/.test(expected || '') || hash(bytes) !== expected) throw new Error('Manifest digest mismatch');
  const manifest = JSON.parse(bytes);
  if (manifest.schemaVersion !== 1 || manifest.commit !== commit) throw new Error('Commit/schema mismatch');
  if (JSON.stringify((await readdir(root)).sort()) !== JSON.stringify(['api','app','manifest.json'])) throw new Error('Unexpected package root entries');
  if (JSON.stringify(await inventory()) !== JSON.stringify(manifest.files)) throw new Error('Package files differ from validation');
  if (JSON.stringify(await walk(join(root,'api'))) !== JSON.stringify([...runtime].sort())) throw new Error('Unexpected API runtime contents');
  for (const required of ['app/index.html','app/staticwebapp.config.json']) {
    if (!manifest.files.some(file => file.path === required)) throw new Error('Required static output missing');
  }
  console.log('Package commit, complete file set and SHA-256 hashes verified');
}
