const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (app) => {
  app.use(
    createProxyMiddleware("/api", {
      target: "ws://163.180.146.59",
      changeOrigin: true,
      ws: true,
    })
  );
};
