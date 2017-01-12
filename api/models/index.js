const mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.0.2:27017/nba');

// models
const { ShotLogModel } = require('./shot-log');

exports.ShotLogModel = ShotLogModel;
