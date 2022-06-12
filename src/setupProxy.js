const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'http://localhost:3001', //http://localhost:3001 https://back.zoovetagro.org.ua
  changeOrigin: true,
};
module.exports = function (app) {
  app.use(
    [
      '/change-user-data',
      '/get-admin-orders',
      '/change-prod-data',
      '/change-password',
      '/get-user-data',
    ],
    createProxyMiddleware(proxy),
  );
};
