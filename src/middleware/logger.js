'use strict';

const logger = require('express').Router(),
  fs = require('fs'),
  morgan = require('morgan'),
  uuid = require('node-uuid'),
  logDirectory = __dirname + '/../logs/access.log',
  accessLogStream = fs.createWriteStream(logDirectory, { flags: 'a' });

morgan.token('id', (req) => req.id);
logger.use((req, res, next) => {
  req.id = uuid.v4();
  next();
});
logger.use(morgan(':id :method :url :response-time'))
logger.use(morgan('combined', { stream: accessLogStream }))

module.exports = logger;
