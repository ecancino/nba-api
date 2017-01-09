'use strict';

const middleware = require('express')();
const compression = require('compression');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('./logger');

middleware.use(compression());
middleware.use(helmet());
middleware.use(logger);
middleware.use(bodyParser.urlencoded({ extended: true }));

module.exports = middleware;
