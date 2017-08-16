'use strict';

const { ShotLogModel } = require('./../models');
const { length } = require('ramda');
const {
  playerName, pointTotal, valueTotal, shotPercentage, shotsMadeTotal
} = require('./../utils');

const playerView = docs => ({
  player_name: playerName(docs),
  efficiency: valueTotal(docs),
  points: pointTotal(docs),
  percentage: shotPercentage(docs),
  made: shotsMadeTotal(docs),
  taken: length(docs)
});

const playerOperator = (req, res) => {
  const { PLAYER_ID } = req.params;
  ShotLogModel.find({ PLAYER_ID: +PLAYER_ID }, (err, docs) =>
    res.json(playerView(docs))
  );
};

module.exports = playerOperator;
