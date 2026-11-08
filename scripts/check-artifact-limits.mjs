import { lstat, readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const MAX_BYTES = 50 * 1024 * 1024;
const DAY = 24 * 60 * 60 * 1000;
async function sizeCheck() {
  const manifest = JSON.parse(await readFile('release/manifest.json', 'utf8'));
  if (!Array.isArray(manifest.files)) throw Error('Missing validated file inventory');
  const expected = new Set(['manifest.json']);
  for (const file of manifest.files) {
    if (!/^(app|api)\//.test(file.path) || file.path.split('/').some(p => !p || p === '.' || p === '..') || file.path.includes('\\') || expected.has(file.path)) throw Error('Invalid inventory path');
    expected.add(file.path);
  }
  let bytes = 0;
  const seen = new Set();
  async function walk(name = '') {
    const info = await lstat(join('release', name));
    if (info.isSymbolicLink()) throw Error('Symbolic link prohibited');
    if (info.isDirectory()) {
      if (name && ![...expected].some(p => p.startsWith(name + '/'))) throw Error('Unexpected directory');
      for (const entry of await readdir(join('release', name))) await walk(name ? name + '/' + entry : entry);
    } else {
      if (!info.isFile() || !expected.has(name) || !Number.isSafeInteger(info.size) || info.size < 0) throw Error('Unexpected package entry');
      seen.add(name);
      bytes += info.size;
      if (bytes > MAX_BYTES) throw Error('Artifact exceeds 50 MiB');
    }
  }
  await walk();
  if (seen.size !== expected.size) throw Error('Missing package entry');
  console.log('Artifact size and file-set limit passed');
}
async function frequencyCheck() {
  const env = process.env;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(env.GITHUB_REPOSITORY || '') || !/^\d+$/.test(env.GITHUB_RUN_ID || '') || env.GITHUB_RUN_ATTEMPT !== '1' || !env.GITHUB_TOKEN) throw Error('Missing context or rerun prohibited');
  const now = Date.now();
  const cutoff = now - DAY;
  // Count all repository runs, including failed/deleted-artifact runs: conservative,
  // fail-closed reservation. Global workflow concurrency serializes this check/upload.
  const query = new URLSearchParams({per_page:'100', created:'>=' + new Date(cutoff).toISOString()});
  const response = await fetch(`https://api.github.com/repos/${env.GITHUB_REPOSITORY}/actions/runs?${query}`, {
    headers:{Authorization:`Bearer ${env.GITHUB_TOKEN}`, Accept:'application/vnd.github+json', 'X-GitHub-Api-Version':'2022-11-28'},
    redirect:'error', signal:AbortSignal.timeout(15000)
  });
  if (!response.ok) throw Error('Upload history unavailable');
  const data = await response.json();
  if (!Number.isSafeInteger(data.total_count) || data.total_count < 1 || data.total_count > 100 || !Array.isArray(data.workflow_runs) || data.workflow_runs.length !== data.total_count) throw Error('Incomplete upload history');
  let own = 0;
  for (const run of data.workflow_runs) {
    const created = Date.parse(run.created_at);
    if (!Number.isFinite(created) || created < cutoff || created > now || !Number.isSafeInteger(run.id)) throw Error('Invalid history');
    if (String(run.id) === env.GITHUB_RUN_ID) own++;
    else throw Error('Another repository run exists within 24 hours');
  }
  if (own !== 1) throw Error('Current run not confirmed');
  console.log('Conservative daily upload reservation passed');
}
if (process.argv[2] === 'size') await sizeCheck();
else if (process.argv[2] === 'frequency') await frequencyCheck();
else throw Error('Explicit size/frequency check required');
