const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { type } = require("node:os");

//should store statistics + attemptedChallenges + attemptedLabTasks of student(s) for only one lab
const StudentzStatisticSchema = mongoose.Schema({
  LabJoinCode: String, //as a foreign key
  StudentzUsername: String, //as a foreign key
  currentXPs: Number,
  currentLevel: Number,
  currentBadge: String,
  currentCPPs: Number,
  XPsRequiredForPromotion: Number,
  XPsRequiredForDemotion: Number,
});

StudentzStatisticSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentzStatistic", StudentzStatisticSchema);
