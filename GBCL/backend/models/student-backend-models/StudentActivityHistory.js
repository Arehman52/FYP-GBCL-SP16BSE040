const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentActivityHistorySchema = mongoose.Schema({
  LabJoinCode: String,         //foreign key
  StudentzUsername: String,    //foreign key
  LabTaskQuestion: String,
  LabChallengeQuestionType: String,
  LabChallengeQuestion: String,
  GainedOrLoosedXPsCount: Number,
  LabTaskStatus: String,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
  LabChallengeStatus: String,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
});

StudentActivityHistorySchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentActivityHistory",StudentActivityHistorySchema);
