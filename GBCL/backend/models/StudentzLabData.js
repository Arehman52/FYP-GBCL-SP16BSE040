const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
// const { type } = require("node:os");

//should store statistics + attemptedChallenges + attemptedLabTasks of student(s) for only one lab
const StudentzLabDataSchema = mongoose.Schema({
  LabJoinCode: String, //as a foreign key
  StudentzUsername: String, //as a foreign key

  Statistics: {
    currentXPs: Number,
    currentLevel: Number,
    currentBadge: String,
    currentCPPs: Number,
    XPsRequiredForPromotion: Number,
    XPsRequiredForDemotion: Number,
  },
  AttemptedChallenges: [
    {
      AttemptedChallengeID: String,
      CheckedByTeacherStatus: String, //Checked or Unchecked
      GainedXPs: Number,
    },
  ],
  AttemptedLabTasks: [
    {
      AttemptedLabTaskID: String,
      GainedXPs: Number,
    },
  ],

  RivalStudentzUsernames: [{ type: String }],

  HistoryForRivals: [
    {
      AttemptedLabTaskDescription: String,
      GainedXPsForAttemptedLabTask: Number,
      AttemptedLabChallengeDescription: String,
      GainedXPsForAttemptedLabChallenge: Number,
    },
  ],
});

StudentzLabDataSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentzLabData", StudentzLabDataSchema);
