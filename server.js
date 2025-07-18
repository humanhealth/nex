const http = require('http');
const url = require('url');

const users = [];
const posts = [];

function sendJson(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(data));
}

function handleRequest(req, res) {
  const parsed = url.parse(req.url, true);
  const method = req.method;
  if (parsed.pathname === '/' && method === 'GET') {
    sendJson(res, 200, { message: 'Welcome to HealthLink' });
  } else if (parsed.pathname === '/users' && method === 'GET') {
    sendJson(res, 200, users);
  } else if (parsed.pathname === '/users' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const user = JSON.parse(body);
        user.id = users.length + 1;
        users.push(user);
        sendJson(res, 201, user);
      } catch (e) {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
  } else if (parsed.pathname === '/posts' && method === 'GET') {
    sendJson(res, 200, posts);
  } else if (parsed.pathname === '/posts' && method === 'POST') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const post = JSON.parse(body);
        post.id = posts.length + 1;
        post.createdAt = new Date();
        posts.push(post);
        sendJson(res, 201, post);
      } catch (e) {
        sendJson(res, 400, { error: 'Invalid JSON' });
      }
    });
  } else {
    sendJson(res, 404, { error: 'Not found' });
  }
}

const server = http.createServer(handleRequest);

function start(port = 3000) {
  return server.listen(port, () => {
    console.log(`HealthLink server running on port ${port}`);
  });
}

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  start(PORT);
}

module.exports = { server, start };
