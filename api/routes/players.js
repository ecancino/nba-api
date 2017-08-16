'use strict';

const players = require('express').Router();
const { playerOperator, playersOperator } = require('./../operators');

players.get('/', playersOperator);
players.get('/:PLAYER_ID', playerOperator);

module.exports = players;
