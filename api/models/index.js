const mongoose = require('mongoose');
const database = mongoose.connect('mongodb://localhost:27017/nba');

// models
const { ShotLogModel } = require('./shot-log');

exports.ShotLogModel = ShotLogModel;
