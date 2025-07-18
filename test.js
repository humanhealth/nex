const http = require('http');
const assert = require('assert');

const { server, start } = require('./server');

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, res => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({ status: res.statusCode, body });
      });
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

(async () => {
  const port = 4000;
  start(port);
  server.on('listening', async () => {
    let res = await request({ hostname: 'localhost', port, path: '/', method: 'GET' });
    assert.strictEqual(res.status, 200);
    assert.ok(res.body.includes('HealthLink'));

    res = await request({ hostname: 'localhost', port, path: '/users', method: 'POST', headers: { 'Content-Type': 'application/json' } }, JSON.stringify({ name: 'Alice' }));
    assert.strictEqual(res.status, 201);

    res = await request({ hostname: 'localhost', port, path: '/users', method: 'GET' });
    assert.ok(res.body.includes('Alice'));

    console.log('All tests passed');
    server.close();
  });
})();
