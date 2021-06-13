const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labTaskSchema = mongoose.Schema({
  LabJoinCode: String,
  LabTaskTitle: String,
  LabTaskQuestion: String,
  LabTaskAnswer: String,
  TaskBeingAttempted:Boolean,
  LabTaskXPs: Number,
  AttemptedByStudents: [ String ]
  });


labTaskSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LabTask', labTaskSchema);
