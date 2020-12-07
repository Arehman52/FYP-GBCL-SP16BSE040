const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  // userID: String
  userType: String,
  FName: String,
  LName: String,
  UniversityNameOfUser: String,
  RegistrationNumber: String,
  HECID: String,
  UniversityTitle: String,
  Username: String,
  Password: String,
});
