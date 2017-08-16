'use strict';

const express = require('express');
const router = express();

const middleware = require('./../middleware');
const root = require('./root');
const games = require('./games');
const players = require('./players');

// Views
router.set('views', `${__dirname}/../views` );
router.set('view engine', 'pug');

// Middleware
router.use(express.static('public'));
router.use(middleware);

// Routes
router.use('/', root);
router.use('/games', games);
router.use('/players', players);

module.exports = router;
