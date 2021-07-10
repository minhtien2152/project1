module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:slug*",
        destination: "http://localhost:8088/api/:slug*",
      },
      {
        source: "/cdn/:slug*",
        destination: "http://localhost:8088/cdn/:slug*",
      },
    ];
  },
};
