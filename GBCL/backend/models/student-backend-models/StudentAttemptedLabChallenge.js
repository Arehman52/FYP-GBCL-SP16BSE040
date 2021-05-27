const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentAttemptedLabChallengeSchema = mongoose.Schema({
  LabJoinCode: String,         //foreign key
  StudentzUsername: String,    //foreign key
  LabChallengeQuestionType: String,
  LabChallengeQuestion: String,
  LabChallengeAnswerOptionA: String,
  LabChallengeAnswerOptionB: String,
  LabChallengeAnswerOptionC: String,
  LabChallengeAnswerOptionD: String,
  GainedXPs: Number,
  LabChallengeStatus: String,  // Unattempted, Attempted, Checked, FailedDueToTimeShortage or Cheated.
});

StudentAttemptedLabChallengeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentAttemptedLabChallenge",StudentAttemptedLabChallengeSchema);
