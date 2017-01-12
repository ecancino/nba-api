'use strict';

const express = require('express');
const router = express();
const middleware = require('./../middleware');
const shots = require('./shots');
const players = require('./players');

router.set('views', `${__dirname}/../views` );
router.set('view engine', 'pug');

router.use(express.static('public'));
router.use(middleware);
router.use('/shots', shots);
router.use('/players', players);

const title = 'NBA Shots';
const links = [
  { url: '/shots', title: 'Shots' },
  { url: '/players', title: 'Players' }
];
router.get('/', (req, res) => {
  res.render('index', { title, links });
});

module.exports = router;
