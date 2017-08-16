'use strict';

const games = require('express').Router();
const { gameOperator, gamesOperator } = require('./../operators');

games.get('/', gamesOperator);
games.get('/:GAME_ID', gameOperator);

module.exports = games;
