'use strict';

const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0';
const server = require('express')();
const routes = require('./src/routes');

server.use(routes);
server.listen(port, host, null, () => {
  console.log(`Server running ${host}:${port}...`);
});

module.exports = server;
