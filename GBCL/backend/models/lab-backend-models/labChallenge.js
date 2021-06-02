const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labChallengeSchema = mongoose.Schema({
  // ChallengeID: {type:String, required : true, unique:true},
  // ChallengeID is replaced with _id now
  //DesiredOutput + MCQs + CodeCompletion
  LabJoinCode: String, //as a foreign key
  ChallengeQuestionType: String,
  ChallengeQuestion: String,
  ChallengeOptionA: String,
  ChallengeOptionB: String,
  ChallengeOptionC: String,
  ChallengeOptionD: String,
  ChallengeCorrectOption: String,
  ChallengeXPs: Number,
  ChallengeAllowedTime: Number,
  AttemptedByStudents: [String]
});


labChallengeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LabChallenge', labChallengeSchema);
