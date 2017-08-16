const mongoose = require('mongoose');
const hostname = process.env.DB_PORT_27017_TCP_ADDR || 'localhost';
const { ShotLogModel } = require('./shot-log');

mongoose.connect(`mongodb://${hostname}:27017/nba`);

exports.ShotLogModel = ShotLogModel;
