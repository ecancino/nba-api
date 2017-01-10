'use strict';

const logger = require('express').Router();
const fs = require('fs');
const morgan = require('morgan');
const uuid = require('uuid');
const logDirectory = __dirname + '/../logs/access.log';
const accessLogStream = fs.createWriteStream(logDirectory, { flags: 'a' });

morgan.token('id', (req) => req.id);
logger.use((req, res, next) => {
  req.id = uuid.v4();
  next();
});
logger.use(morgan(':id :method :url :response-time'))
logger.use(morgan('combined', { stream: accessLogStream }))

module.exports = logger;
