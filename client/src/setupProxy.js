const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://37cc-49-228-171-180.ngrok-free.app',
      changeOrigin: true,
    })
  );
};