const { createServer } = require('http');
const { parse } = require('url');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const port = parseInt(process.env.PORT || '3000', 10);

// Configure Next.js
const app = next({
  dev,
  hostname,
  port,
  dir: __dirname,
  conf: {
    distDir: '.next',
    assetPrefix: '',
    basePath: '',
  }
});

const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname } = parsedUrl;

      // Ensure static files are served correctly
      if (pathname.startsWith('/_next')) {
        await handle(req, res, parsedUrl);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
    console.log(`> Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`> Next.js static files served from: /_next/static`);
  });
});