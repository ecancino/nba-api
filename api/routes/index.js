'use strict';

const moment = require('moment');
const express = require('express');
const router = express();
const middleware = require('./../middleware');
const hello = require('./hello');

router.set('views', `${__dirname}/../views` );
router.set('view engine', 'pug');

router.use(express.static('public'));
router.use(middleware);
router.use('/hello', hello);

router.get('/', (req, res) => {
  const time = moment(req.time).format('MMMM Do YYYY, h:mm:ss a');
  const title = 'New Journey';
  const message = 'This is the first step in a long journey';
  res.render('index', { title, message, time });
});

module.exports = router;
