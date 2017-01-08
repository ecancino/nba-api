'use strict';

const _ = require('lodash');
const hello = require('express').Router();

hello.get('/:name?', (req, res) => {
  let name = _.startCase(_.get(req.params, 'name', 'stranger'));
  res.render('hello', { name });
});

module.exports = hello;
