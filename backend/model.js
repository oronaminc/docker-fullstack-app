const mongoose = require('./db');

var userLog = mongoose.Schema({
  name: String,
  date: {type: Date, default: Date.now},
  durationOfTime: Number,
  fare: Number
});

module.exports = mongoose.model('Schema', userLog);