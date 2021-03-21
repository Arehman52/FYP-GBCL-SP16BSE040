const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  UserType: String,
  // attribs of UserType = Student/Teacher
  FirstNameOfUser: String,
  LastNameOfUser: String,
  UniversityNameOfUser: String,
  RegistrationNumberOfUser: String,
  // attribs of UserType = University
  TitleOfUniversity: String,
  HECIDofUniversity: String,
  // common attribs
  Username: String,
  Password: String
}); //,{ versionKey: false } can be 2nd parameter passing.


module.exports = mongoose.model('User', userSchema);
