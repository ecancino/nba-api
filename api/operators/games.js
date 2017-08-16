'use strict';

const { map } = require('ramda');
const { ShotLogModel } = require('./../models/');

const gamesView = map(doc => ({
  id: doc._id,
  game: doc.game,
  link: `http://localhost:3000/games/${doc._id}`
}));

const gamesOperator = (req, res) => {
  const game = { $first: '$MATCHUP' };
  const group = { $group: { _id: '$GAME_ID', game } };
  const sort = { $sort: { game: -1 } };
  ShotLogModel.aggregate([ group, sort ], (err, docs) => res.json(gamesView(docs)));
};

module.exports = gamesOperator;
