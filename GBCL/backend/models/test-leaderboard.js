const mongoose = require('mongoose');

const testLeaderboardSchema = mongoose.Schema({
  _id: String,
  rank: Number,
  name:String,
  XPs: Number,
  CPPs: Number,
  level: Number,
  badge: String,
  color: String
});


module.exports = mongoose.model('TestLeaderboard', testLeaderboardSchema);
