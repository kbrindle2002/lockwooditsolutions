// Future CI-only metadata request. Never execute during static preparation.
const environment = process.env.LITS_ENVIRONMENT;
const repository = process.env.GITHUB_REPOSITORY;
if (!['lits-production','lits-preview','lits-preview-cleanup'].includes(environment) ||
    !/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(repository || '') || !process.env.GH_TOKEN) {
  throw new Error('Missing or invalid gate context');
}
const response = await fetch(`https://api.github.com/repos/${repository}/environments/${encodeURIComponent(environment)}`, {
  headers: { Accept:'application/vnd.github+json', Authorization:`Bearer ${process.env.GH_TOKEN}` },
  redirect:'error', signal:AbortSignal.timeout(10000),
});
if (!response.ok) throw new Error(`Cannot verify environment protection (HTTP ${response.status})`);
const settings = await response.json();
const rule = settings.protection_rules?.find(value => value.type === 'required_reviewers');
if (settings.name !== environment || !rule?.reviewers?.length || rule.prevent_self_review !== true) {
  throw new Error('Required reviewers with self-review prevention must be configured');
}
const run = process.env.GITHUB_RUN_ID;
const attempt = process.env.GITHUB_RUN_ATTEMPT;
const commit = process.env.GITHUB_SHA;
const digest = environment === 'lits-preview-cleanup' ? 'cleanup' : process.env.LITS_MANIFEST_SHA256;
if (!/^\d+$/.test(run || '') || !/^\d+$/.test(attempt || '') || !/^[a-f0-9]{40}$/.test(commit || '') ||
    (environment !== 'lits-preview-cleanup' && !/^[a-f0-9]{64}$/.test(digest || ''))) throw new Error('Invalid approval identity');
const requiredComment = `APPROVE ${environment} ${commit} ${digest} run:${run} attempt:${attempt}`;
const reviewResponse = await fetch(`https://api.github.com/repos/${repository}/actions/runs/${run}/approvals`, {
  headers:{Accept:'application/vnd.github+json',Authorization:`Bearer ${process.env.GH_TOKEN}`},
  redirect:'error',signal:AbortSignal.timeout(10000),
});
if (!reviewResponse.ok) throw new Error(`Cannot verify approval history (HTTP ${reviewResponse.status})`);
const reviews = await reviewResponse.json();
// History ordering is not treated as evidence of recency. Any rejection for this
// environment vetoes approval for this run, even if another entry is approved.
// A rejected run requires a fresh run; reapproval within that run is not inferred.
const hasRejection = Array.isArray(reviews) && reviews.some(review =>
  review?.state === 'rejected' && review.environments?.some(value =>
    value.id === settings.id || value.name === environment));
if (!Array.isArray(reviews) || hasRejection || !reviews.some(review =>
  review.state === 'approved' && review.comment?.trim() === requiredComment &&
  review.user?.type === 'User' && review.user.login !== process.env.GITHUB_ACTOR &&
  review.user.login !== process.env.GITHUB_TRIGGERING_ACTOR &&
  review.environments?.some(value => value.id === settings.id && value.name === environment))) {
  throw new Error(`Exact human approval required: ${requiredComment}`);
}
console.log('Required-reviewer configuration and exact run/attempt approval verified.');
