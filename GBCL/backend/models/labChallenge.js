const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labChallengeSchema = mongoose.Schema({
  // ChallengeID: {type:String, required : true, unique:true},
  // ChallengeID is replaced with _id now
  LabId: String, //as a foreign key
  //DesiredOutput + MCQs + CodeCompletion
  ChallengeQuestionType: String,
  ChallengeQuestion: String,
  ChallengeAnswer: String,
  ChallengeOptionA: String,
  ChallengeOptionB: String,
  ChallengeOptionC: String,
  ChallengeOptionD: String,
  ChallengeXPs: Number,
  ChallengeAllowedTime: Number
});


labChallengeSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LabChallenge', labChallengeSchema);
