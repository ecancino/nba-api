const mongoose = require('mongoose');

const ShotLogSchema = new mongoose.Schema({
  _id: mongoose.Schema.ObjectId,
  GAME_ID: Number,
  MATCHUP: String,
  SHOT_RESULT: String,
  PERIOD: Number,
  GAME_CLOCK: String,
  PTS_TYPE: Number,
  player_name: String,
  player_id: Number
});
const ShotLogModel = mongoose.model('shots', ShotLogSchema);

exports.ShotLogModel = ShotLogModel;
