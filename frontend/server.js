// server.js
require('dotenv').config();
const next = require('next')
const express = require('express')
const { createProxyMiddleware } = require('http-proxy-middleware');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(
      '/users',
      createProxyMiddleware({
          target: process.env.BACKENDURL,
          changeOrigin: true,
      }),
  );

  server.all('*', (req, res) => handle(req, res));

  server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
  });
});