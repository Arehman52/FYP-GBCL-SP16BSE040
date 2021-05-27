const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { type } = require("node:os");

//should store statistics + attemptedChallenges + attemptedLabTasks of student(s) for only one lab
const StudLabDataAndStatsSchema = mongoose.Schema({
  LabJoinCode: String, //as a foreign key
  StudentzUsername: String, //as a foreign key
  LevelUpdateViewed: Boolean, // if false, then show a level updated Modal and then update it to false.
  Promoted: Boolean,
  Demoted: Boolean,
  RivalStudents: [String],
  currentXPs: Number,
  currentLevel: Number,
  currentBadge: String,
  currentCPPs: Number,
  Warned: Boolean,
  Appreciated:Boolean,
  StudentzLabAccessStatus: String,  // Expelled or Allowed
});

StudLabDataAndStatsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudLabDataAndStat", StudLabDataAndStatsSchema);
