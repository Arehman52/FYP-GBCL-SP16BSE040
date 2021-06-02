const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { type } = require("node:os");

//should store statistics + attemptedChallenges + attemptedLabTasks of student(s) for only one lab
const StudLabDataAndStatsSchema = mongoose.Schema({
  LabJoinCode: String,
  StudentzUsername: String,
  StudentzFN: String,
  StudentzLN: String,
  LevelUpdateViewed: Boolean,
  Promoted: Boolean,
  Demoted: Boolean,
  RivalStudents: [String],
  currentXPs: Number,
  currentLevel: Number,
  currentBadge: String,
  currentCPPs: Number,
  Warned: Boolean,
  Appreciated:Boolean,
  StudentzLabAccessStatus: String  // Expelled or Allowed
});

StudLabDataAndStatsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudLabDataAndStat", StudLabDataAndStatsSchema);
