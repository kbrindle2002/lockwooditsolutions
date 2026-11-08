const assert = require('node:assert/strict');
if (process.env.LITS_NETWORK_BLOCKED !== '1') throw new Error('Use the network-disabled container runner');
const attempts = [];
function deny(kind) {
  return function () {
    attempts.push(kind);
    throw new Error(`Unexpected network operation blocked: ${kind}`);
  };
}
const denyFetch = deny('fetch');
global.fetch = denyFetch;
for (const [name,methods] of [
  ['node:http',['request','get']], ['node:https',['request','get']],
  ['node:net',['connect','createConnection']], ['node:tls',['connect']],
  ['node:dgram',['createSocket']],
  ['node:dns',['lookup','resolve','resolve4','resolve6']],
]) {
  const api = require(name);
  for (const method of methods) api[method] = deny(`${name}.${method}`);
}
require('node:net').Socket.prototype.connect = deny('Socket.connect');
for (const method of ['lookup','resolve','resolve4','resolve6']) require('node:dns').promises[method] = deny(`dns.promises.${method}`);
module.exports = {
  denyFetch,
  assertNoNetworkAttempts() {
    // Preserve attempts across tests: a swallowed exception must still fail the suite.
    assert.deepEqual(attempts,[],'Unexpected network calls occurred');
  },
};
