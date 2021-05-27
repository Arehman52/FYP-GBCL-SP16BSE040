const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const StudentAttemptedLabTaskSchema = mongoose.Schema({
  LabJoinCode: String,
  AttemptedLabTask_id: String,
  StudentzUsername: String,
  LabTaskQuestion: String,
  LabTaskAnswerCode: String,
  LabTaskAnswerOutput: String,
  LabTaskAnswerInput: String,
  GainedXPs: Number,

  LabTaskAttempted:Boolean,
  LabTaskChecked:Boolean
});

StudentAttemptedLabTaskSchema.plugin(uniqueValidator);

module.exports = mongoose.model("StudentAttemptedLabTask",StudentAttemptedLabTaskSchema);
