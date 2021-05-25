const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const labJoinRequestSchema = mongoose.Schema({
  LabJoinCode: String, //     replace _id with LabJoinCode
  LabTitle: String,
  LabInstructor: String,
  LabMemberzLabAccessStatus: String,
  FirstNameOfLabMember: String,
  LastNameOfLabMember: String,
  UsernameOfLabMember: String,
  RegistrationNumberOfLabMember: String,
  UniversityNameOfLab: String
});


labJoinRequestSchema.plugin(uniqueValidator);

module.exports = mongoose.model('LabJoinRequest', labJoinRequestSchema);
