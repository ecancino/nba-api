'use strict';

const _ = require('lodash');
const hello = require('express').Router();

hello.get('/:name?', (req, res) => {
  let name = req.params.name || 'stranger';
  res.render('hello', { name: _.capitalize(name) });
});

module.exports = hello;
