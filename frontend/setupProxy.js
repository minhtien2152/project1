const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  //nodejs backend
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8086",
      changeOrigin: true,
    })
  );
};
