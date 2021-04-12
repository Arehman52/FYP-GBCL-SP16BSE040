const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

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
  Username: {type:String, required : true, unique:true},
  Password: String
});


userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
