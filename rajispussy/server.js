const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function send(res, code, body, type = 'text/plain') {
  res.writeHead(code, { 'Content-Type': type });
  res.end(body);
}

function resolveFile(urlPath) {
  const clean = path.normalize(urlPath.split('?')[0]).replace(/^\/+/, '');
  if (!clean || clean === 'index.html') return path.join(ROOT, 'index.html');
  const candidate = path.join(ROOT, clean);
  if (candidate.startsWith(ROOT) && fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
    return candidate;
  }
  return path.join(ROOT, 'index.html');
}

const server = http.createServer((req, res) => {
  const filePath = resolveFile(req.url || '/');
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error('Read error', err);
      send(res, 500, 'Server error');
      return;
    }
    const ext = path.extname(filePath);
    send(res, 200, data, MIME[ext] || 'application/octet-stream');
  });
});

server.listen(PORT, () => {
  console.log(`Dev server running at http://localhost:${PORT}`);
});
