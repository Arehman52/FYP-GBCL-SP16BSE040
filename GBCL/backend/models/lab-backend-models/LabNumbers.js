const mongoose = require('mongoose');

const labNumbersSchema = mongoose.Schema({
  LabJoinCode: String,
  LabNumber: Number,
  LabTaskIds: [String]
});

module.exports = mongoose.model('LabNumber', labNumbersSchema);
