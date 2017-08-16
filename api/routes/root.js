'use strict';

const root = require('express').Router();
const { rootOperator } = require('./../operators');

root.get('/', rootOperator);

module.exports = root;
