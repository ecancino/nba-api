'use strict';

const hello = require('express').Router();

hello.get('/:name?', (req, res) => {
  let name = req.params.name || 'stranger';
  res.render('hello', { name });
});

module.exports = hello;
