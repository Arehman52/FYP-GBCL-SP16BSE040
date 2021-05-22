const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labSchema = mongoose.Schema({
  // LabJoinCode: String, //     replace _id with LabJoinCode
  LabTitle: String,
  LabInstructor: String,
  LabCourse: String,
  LabClass: String,
  UniversityNameOfLab: String
});


labSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Lab', labSchema);
