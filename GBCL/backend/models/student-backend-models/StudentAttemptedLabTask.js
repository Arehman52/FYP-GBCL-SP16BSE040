const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentAttemptedLabTaskSchema = mongoose.Schema({
  LabJoinCode: String,
  StudentzUsername: String,
  LabTaskQuestion: String,
  LabTaskAnswerCode: String,
  LabTaskAnswerOutput: String,
  LabTaskAnswerInput: String,
  GainedXPs: Number,
  LabTaskStatus: String,  // Unattempted, Attempted or Checked
});

StudentAttemptedLabTaskSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentAttemptedLabTask",StudentAttemptedLabTaskSchema);
