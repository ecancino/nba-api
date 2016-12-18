'use strict';

const middleware = require('express')();
const compression = require('compression');
const helmet = require('helmet');
const logger = require('./logger');

middleware.use(compression());
middleware.use(helmet());
middleware.use(logger);

module.exports = middleware;
