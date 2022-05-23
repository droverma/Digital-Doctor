const mongoose = require("mongoose");

const doctorschema = new mongoose.Schema({
  _id: String,
  specialization: String,
  yearsOfExperience: String,
  doctorName: String,
  password: String,
  city: String,
  image: String,
  doctorMobileNumber: String,
  role: String,
});

module.exports = mongoose.model("Doctor", doctorschema);
