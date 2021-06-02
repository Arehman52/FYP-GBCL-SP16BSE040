const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentAttemptedLabChallengeSchema = mongoose.Schema({
  LabJoinCode: String,
  StudentzUsername: String,
  AttemptedLabChallenge_id: String,
  LabChallengeQuestionType: String,
  LabChallengeQuestion: String,
  LabChallengeAnswerOptionA: String,
  LabChallengeAnswerOptionB: String,
  LabChallengeAnswerOptionC: String,
  LabChallengeAnswerOptionD: String,
  GainedXPs: Number,
  ChallengeAttempted:Boolean,
  ChallengeChecked:Boolean,
  ChallengeFailedDueToTimeShortage:Boolean,
  ChallengeCheated:Boolean
});

StudentAttemptedLabChallengeSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentAttemptedLabChallenge",StudentAttemptedLabChallengeSchema);
