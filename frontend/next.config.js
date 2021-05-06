module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost:8086/api/:slug*",
      },
    ];
  },
};
