const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labTaskSchema = mongoose.Schema({
  // labTaskID: {type:String, required : true, unique:true},
  LabID: String, //as a foreign key    <== _id of lab where lab task should be displayed
  ChallengeQuestionType: String,
  labTaskNumber: Number, // like Lab Task 01
  labTaskQuestion: String,
  labTaskAnswer: String,
  labTaskXPs: Number
  });


labTaskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('labTask', labTaskSchema);
