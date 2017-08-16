'use strict';

const { ShotLogModel } = require('./../models');
const { map, filter } = require('ramda');
// const { capitalizeAll } = require('./../utils');

const playersView = map(doc => ({
  id: doc._id,
  player: doc.player,
  link: `http://localhost:3000/players/${doc._id}`
}));

const playerOperator = (req, res) => {
  const { search } = req.query;
  const playerName = { $regex: new RegExp(search), $options: 'ig' };
  const match = search ? { $match: { PLAYER_NAME: playerName } } : null;
  const player = { $first: '$PLAYER_NAME' };
  const group = { $group: { _id: '$PLAYER_ID', player } };
  const sort = { $sort: { player: 1 } };
  const aggregate = filter(Boolean, [ match, group, sort ]);
  ShotLogModel.aggregate(aggregate, (err, docs) =>
    res.json(playersView(docs))
  );
};

module.exports = playerOperator;
