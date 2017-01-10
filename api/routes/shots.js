'use strict';

const R = require('ramda');
const moment = require('moment');
const shots = require('express').Router();
const { ShotLogModel } = require('./../models/');

const byShooter = R.groupBy(R.prop('player_name'));
const madeShot = R.propEq('SHOT_RESULT', 'made');
const shotsMade = R.filter(madeShot);
const shotPoints = R.map(R.prop('PTS_TYPE'));
const pointTotal = R.compose(R.sum, shotPoints, shotsMade);
const pickForValue = R.map(R.pick(['PTS_TYPE', 'PERIOD', 'GAME_CLOCK', 'SHOT_RESULT']));
const timeValue = (clock) => +clock.replace(':', '.') / 10;
const shotValueMade = (shot) => parseInt(shot.PTS_TYPE * shot.PERIOD - timeValue(shot.GAME_CLOCK), 10);
const shotValueMissed = shot => -shotValueMade(shot);
const shotValue = R.map(R.ifElse(madeShot, shotValueMade, shotValueMissed));
const valueTotal = R.compose(R.sum, shotValue, pickForValue);
const sortByValue = R.map(R.sortBy(R.prop('value')));
const percentage = (shots) => parseInt(shotsMade(shots).length / shots.length * 100);

const process = (docs) => {
  const shooters = R.map((shots) => ({
    points: pointTotal(shots),
    value: valueTotal(shots),
    percentage: percentage(shots),
  }), byShooter(docs));

  return { game: R.head(docs).MATCHUP, shooters };
};

shots.get('/', (req, res) => {
  ShotLogModel.distinct('GAME_ID', (err, docs) => res.json(docs));
});

shots.get('/:GAME_ID', (req, res) => {
  const { GAME_ID } = req.params;
  ShotLogModel.find({ GAME_ID }, (err, docs) => res.json(process(docs)));
});

module.exports = shots;
