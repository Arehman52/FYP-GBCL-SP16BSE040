const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentActivityHistorySchema = mongoose.Schema({
  LabJoinCode: String,         //foreign key
  StudentzUsername: String,    //foreign key
  wasPromoted: Boolean,
  wasDemoted: Boolean,
  wasWarned: Boolean,
  wasAppreciated: Boolean,

  LabTaskQuestion: String,
  LabChallengeQuestionType: String,
  LabChallengeQuestion: String,
  GainedOrLoosedXPsCount: Number,

  LabTaskOrChallengeAttempted: Boolean,
  LabTaskOrChallengeChecked: Boolean,
  LabTaskOrChallengeFailedDueToTimeout: Boolean
});

StudentActivityHistorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentActivityHistory",StudentActivityHistorySchema);
