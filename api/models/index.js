const mongoose = require('mongoose');
const hostname = process.env.DB_PORT_27017_TCP_ADDR || 'localhost';
mongoose.connect(`mongodb://${hostname}:27017/nba`);

// Models
const { ShotLogModel } = require('./shot-log');

exports.ShotLogModel = ShotLogModel;
