const { createProxyMiddleware } = require('http-proxy-middleware');
const proxy = {
  target: 'https://back.zoovetagro.org.ua', //http://localhost:3001 https://back.zoovetagro.org.ua
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
      '/change-prod-data-all',
      '/delete-review',
      '/new-product',
      '/change-category',
      '/change-admin-orders',
    ],
    createProxyMiddleware(proxy),
  );
};
