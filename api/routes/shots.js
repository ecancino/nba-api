'use strict';

const shots = require('express').Router();
const {
  map, sortWith, descend, ascend, prop, compose, values, length
} = require('ramda');

const { ShotLogModel } = require('./../models/');
const {
  groupByProp, playerName, pickMap, pointTotal,
  valueTotal, shotsMadeTotal, shotPercentage, matchInfo
} = require('./../utils');

const gamesView = map(doc => ({
  id: doc._id,
  game: doc.game,
  link: `http://localhost:3000/shots/${doc._id}`
}));

shots.get('/', (req, res) => {
  ShotLogModel.aggregate([
    { $group: { _id: '$GAME_ID', game: { $first: '$MATCHUP' } } },
    { $sort: { game: -1 } }
  ], (err, docs) => res.json(gamesView(docs)));
});

const sortByValue = sortWith([ descend(prop('value')) ]);
const sortByPeriodShotResuls = sortWith([
  ascend(prop('PERIOD')),
  descend(prop('SHOT_RESULT'))
]);
const pickForShots = pickMap([ 'PERIOD', 'SHOT_RESULT', 'PTS_TYPE' ]);
const showShots = compose(values, groupByProp('PERIOD'), sortByPeriodShotResuls, pickForShots);

const valuateShots = map(shots => ({
  shooter: playerName(shots),
  points: pointTotal(shots),
  value: valueTotal(shots),
  percentage: shotPercentage(shots),
  made: shotsMadeTotal(shots),
  taken: length(shots),
  shots: showShots(shots)
}));

const valuateShooters = compose(sortByValue, values, valuateShots, groupByProp('player_name'));
const gameView = shots => ({
  game: matchInfo(shots),
  shooters: valuateShooters(shots)
});

shots.get('/:GAME_ID', (req, res) => {
  const { GAME_ID } = req.params;
  ShotLogModel.find({ GAME_ID }, (err, docs) => res.json(gameView(docs)));
});

module.exports = shots;
