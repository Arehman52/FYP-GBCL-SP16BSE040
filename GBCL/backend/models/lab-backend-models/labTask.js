const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labTaskSchema = mongoose.Schema({
  LabJoinCode: String, //as a foreign key    <== _id of lab where lab task should be displayed
  LabTaskTitle: String, // like Lab Task 01
  LabTaskQuestion: String,
  LabTaskAnswer: String,
  LabTaskXPs: Number,
  AttemptedByStudents: [ String ]
  });


labTaskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LabTask', labTaskSchema);
