const ws = require("ws");

const wsServer = new ws.Server({
  noServer: true,
  port: 8080,
});

module.exports = wsServer;
