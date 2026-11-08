// Executed only inside the offline container, before the test suite.
const assert = require('node:assert/strict');
const { networkInterfaces } = require('node:os');
const { readFileSync } = require('node:fs');
const net = require('node:net');
assert.equal(process.env.LITS_NETWORK_BLOCKED,'1');
for (const addresses of Object.values(networkInterfaces())) {
  for (const address of addresses || []) assert.equal(address.internal,true,'Non-loopback interface is prohibited');
}
const routes = readFileSync('/proc/net/route','utf8').trim().split('\n').slice(1);
assert.equal(routes.some(line => line.trim().split(/\s+/)[1] === '00000000'),false,'Default IPv4 route is prohibited');
const socket = net.createConnection({host:'192.0.2.1',port:443});
socket.setTimeout(2000);
socket.once('connect',() => { socket.destroy(); console.error('Network preflight unexpectedly connected'); process.exitCode=1; });
socket.once('timeout',() => { socket.destroy(); console.error('Network denial was not proven'); process.exitCode=1; });
socket.once('error',error => {
  if (!['ENETUNREACH','EHOSTUNREACH'].includes(error.code)) {
    console.error('Unexpected preflight failure; refusing tests'); process.exitCode=1;
  } else console.log('Non-loopback interfaces absent; outbound route denied before tests');
});
