'use strict';

const players = require('express').Router();
const { map, filter, length } = require('ramda');

const { ShotLogModel } = require('./../models/');
const {
  capitalizeAll, playerName, pointTotal, valueTotal, shotPercentage, shotsMadeTotal
} = require('./../utils');

const playersView = map(doc => ({
  id: doc._id,
  player: capitalizeAll(doc.player),
  link: `http://localhost:3000/players/${doc._id}`
}));

players.get('/', (req, res) => {
  const { search } = req.query;
  const match = search ? {
    $match: { player_name: { $regex: new RegExp(search), $options: 'ig' } }
  } : null;
  const group = {
    $group: { _id: '$player_id', player: { $first: '$player_name' } }
  };
  const sort = { $sort: { player: 1 } };
  const aggregate = filter(Boolean, [ match, group, sort ]);
  ShotLogModel.aggregate(aggregate, (err, docs) => res.json(playersView(docs)));
});

const playerView = docs => ({
  player_name: playerName(docs),
  efficiency: valueTotal(docs),
  points: pointTotal(docs),
  percentage: shotPercentage(docs),
  made: shotsMadeTotal(docs),
  taken: length(docs)
});

players.get('/:player_id', (req, res) => {
  const { player_id: playerId } = req.params;
  ShotLogModel.find({ player_id: +playerId }, (err, docs) => res.json(playerView(docs)));
});

module.exports = players;
