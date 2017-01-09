'use strict';

const _ = require('lodash');
const shots = require('express').Router();
const mongoose, { Schema } = require('mongoose');

const database = mongoose.connect('mongodb://localhost:27017/nba');

const BlogPost = new Schema({
  title: String,
  body: String,
  date: Date
});

MyModel.find({}, function (err, docs) {
  // docs.forEach
});

// 21400898
shots.get('/:game_id', (req, res) => {

});

module.exports = shots;
