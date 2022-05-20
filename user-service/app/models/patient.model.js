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

// _id: "anurag@gmail.com";
// patientName: "Anurag";
// patientMobileNumber: 4536623726;
// password: "anurag";
// city: "Gurgaon";
// patientImage: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAA…";
// _class: "com.stackroute.model.Patient";
