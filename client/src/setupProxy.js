const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://31a1-49-228-171-235.ngrok-free.app',
      changeOrigin: true,
    })
  );
};