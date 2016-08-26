'use strict';

const middleware = require('express')(),
  compression = require('compression'),
  helmet = require('helmet'),
  logger = require('./logger');

middleware.use(compression());
middleware.use(helmet());
middleware.use(logger);

module.exports = middleware;
