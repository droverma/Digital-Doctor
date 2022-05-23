const mongoose = require("mongoose");

const patientschema = new mongoose.Schema({
  _id: String,
  patientName: String,
  patientMobileNumber: String,
  password: String,
  city: String,
  patientImage: String,
  role: String,
});

module.exports = mongoose.model("Patient", patientschema);
