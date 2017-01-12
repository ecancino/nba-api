const {
  compose, join, juxt, toUpper, head, tail, map, filter, split,
  groupBy, prop, pick, propEq, negate, ifElse, sum, length
} = require('ramda');

const capitalize = compose(join(''), juxt([compose(toUpper, head), tail]));
const capitalizeAll = compose(join(' '), map(capitalize), split(' '));
const groupByProp = propName => groupBy(prop(propName));
const pickMap = fields => map(pick(fields));

const playerName = compose(capitalizeAll, prop('player_name'), head);
const matchInfo = compose(prop('MATCHUP'), head);

const madeShot = propEq('SHOT_RESULT', 'made');
const shotValueMade = ({ PTS_TYPE, PERIOD }) => parseInt(PTS_TYPE * PERIOD);
const shotValueMissed = shot => negate(shotValueMade(shot) / 2);
const shotValue = ifElse(madeShot, shotValueMade, shotValueMissed);
const shotsValue = map(shotValue);

const shotsMade = filter(madeShot);
const shotPoints = map(prop('PTS_TYPE'));
const pointTotal = compose(sum, shotPoints, shotsMade);
const valueTotal = compose(sum, shotsValue);
const shotsMadeTotal = shots => length(shotsMade(shots));
const shotPercentage = shots => parseInt(shotsMadeTotal(shots) / length(shots) * 100);

module.exports = {
  capitalize,
  capitalizeAll,
  groupByProp,
  playerName,
  matchInfo,
  pickMap,
  madeShot,
  shotValueMade,
  shotValueMissed,
  shotValue,
  shotsValue,
  shotsMade,
  shotPoints,
  pointTotal,
  valueTotal,
  shotsMadeTotal,
  shotPercentage
};
