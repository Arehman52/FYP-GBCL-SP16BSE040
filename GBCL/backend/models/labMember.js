const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const labMemberSchema = mongoose.Schema({
  LabJoinCode: String, //     foreign key
  MemberUsername: String, //     foreign key
  LabTitle: String,
  LabMemberFN: String,
  LabMemberLN: String,
  MemberType: String,
  MemberzLabAccessStatus: String, //Pending or Allowed or Rejected
});

labMemberSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Lab", labMemberSchema);
