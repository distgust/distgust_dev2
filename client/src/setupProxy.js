const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://1e83-49-228-169-213.ngrok-free.app',
      changeOrigin: true,
    })
  );
};