'use strict';

const R = require('ramda');
const moment = require('moment');
const shots = require('express').Router();
const { ShotLogModel } = require('./../models/');


const capitalize = R.compose(R.join(''), R.juxt([R.compose(R.toUpper, R.head), R.tail]));
const capitalizeAll = R.compose(R.join(' '), R.map(capitalize), R.split(' '));
const shooterName = R.compose(capitalizeAll, R.prop('player_name'), R.head);
const byShooter = R.groupBy(R.prop('player_name'));
const madeShot = R.propEq('SHOT_RESULT', 'made');
const shotsMade = R.filter(madeShot);
const shotPoints = R.map(R.prop('PTS_TYPE'));
const pointTotal = R.compose(R.sum, shotPoints, shotsMade);
const timeValue = (clock) => +clock.replace(':', '.') / 10;
const shotValueMade = (shot) => parseInt(shot.PTS_TYPE * (shot.PERIOD * 2) - timeValue(shot.GAME_CLOCK), 10);
const shotValueMissed = shot => -shotValueMade(shot);
const shotValue = R.map(R.ifElse(madeShot, shotValueMade, shotValueMissed));
const valueTotal = R.compose(R.sum, shotValue);
const percentage = (shots) => parseInt(shotsMade(shots).length / shots.length * 100);
const sortByValue = R.sortWith([ R.descend(R.prop('value')) ]);
const valuateShots = R.map((shots) => ({ shooter: shooterName(shots), value: valueTotal(shots) }));
const mostValuablePlayers = R.compose(sortByValue, R.values, valuateShots, byShooter);
const mvp = (docs) => ({ game: R.head(docs).MATCHUP, shooters: mostValuablePlayers(docs) });
const links = R.map(doc => `http://localhost:3000/shots/${doc}`);

shots.get('/', (req, res) => {
  ShotLogModel.distinct('GAME_ID', (err, docs) => res.json(links(docs)));
});

shots.get('/:GAME_ID', (req, res) => {
  const { GAME_ID } = req.params;
  ShotLogModel.find({ GAME_ID }, (err, docs) => res.json(mvp(docs)));
});

module.exports = shots;
