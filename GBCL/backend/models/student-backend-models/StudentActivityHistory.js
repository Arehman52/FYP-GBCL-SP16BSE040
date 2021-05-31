const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentActivityHistorySchema = mongoose.Schema({
  LabJoinCode: String, //foreign key
  StudentzUsername: String, //foreign key
  StudentzFullName:String,


  Activity: String,
  GainedOrLoosedXPsCount: Number,
  AttemptedQuestion: String,
  Passed: Boolean,
  Failed: Boolean,
  TimeAndDate: String,
  wasPromotedOrDemotedToLevel: String,

  // wasPromoted: Boolean,
  // wasDemoted: Boolean,
  // wasWarned: Boolean,
  // wasAppreciated: Boolean,
  // wasExpelled: Boolean,
  // LabChallengeQuestionType: String,
  // LabChallengeQuestion: String,
  // LabTaskOrChallengeAttempted: Boolean,
  // LabTaskOrChallengeChecked: Boolean,
  // //new fields below
  // LabChallengePassed:Boolean,
  // LabChallengeFailed:Boolean,
  // LabTaskPassed:Boolean,
  // LabTaskFailed:Boolean,
  // wasPromotedOrDemotedToLevel:String,
  // LabChallengeFailedDueToTimeout: Boolean
});

StudentActivityHistorySchema.plugin(uniqueValidator);

module.exports = mongoose.model(
  "StudentActivityHistory",
  StudentActivityHistorySchema
);
