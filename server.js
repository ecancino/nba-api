'use strict';

const port = process.env.PORT || 8080,
  host = process.env.HOST || '0.0.0.0',
  server = require('express')(),
  routes = require('./app/routes');

server.use(routes);
server.listen(port, host, null, () => {
  console.log(`Server running ${host}:${port}...`);
});

module.exports = server;
