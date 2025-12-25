const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PUBLIC_DIR = path.join(ROOT, 'public');
const SRC_DIR = path.join(ROOT, 'src');
const PORT = process.env.PORT || 3000;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
};

function send(res, status, body, contentType = 'text/plain') {
  res.writeHead(status, { 'Content-Type': contentType });
  res.end(body);
}

function safeJoin(base, target) {
  const targetPath = path.join(base, target);
  if (!targetPath.startsWith(base)) return null;
  return targetPath;
}

function resolvePath(urlPath) {
  const cleanPath = path.normalize(urlPath.split('?')[0]);
  if (cleanPath === '/' || cleanPath === '') {
    return path.join(PUBLIC_DIR, 'index.html');
  }

  if (cleanPath.startsWith('/src/')) {
    const candidate = safeJoin(SRC_DIR, cleanPath.replace('/src/', ''));
    return candidate && fs.existsSync(candidate) ? candidate : null;
  }

  const publicPath = safeJoin(PUBLIC_DIR, cleanPath.replace(/^\//, ''));
  if (publicPath && fs.existsSync(publicPath) && fs.statSync(publicPath).isFile()) {
    return publicPath;
  }

  // If a static asset was explicitly requested but not found, surface a 404
  if (/\.(js|css|json|png|jpg|jpeg|svg|map)$/.test(cleanPath)) {
    return null;
  }

  // Fallback to SPA shell for other routes
  return path.join(PUBLIC_DIR, 'index.html');
}

const server = http.createServer((req, res) => {
  const target = resolvePath(req.url || '/');
  if (!target) {
    send(res, 404, 'Not found');
    return;
  }

  fs.readFile(target, (err, data) => {
    if (err) {
      console.error('Failed to read', target, err);
      send(res, 404, 'Not found');
      return;
    }

    const ext = path.extname(target);
    const type = MIME_TYPES[ext] || 'application/octet-stream';
    send(res, 200, data, type);
  });
});

server.listen(PORT, () => {
  console.log(`Script Market dev server running at http://localhost:${PORT}`);
});
