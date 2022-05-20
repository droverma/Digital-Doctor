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

// _id
// "prakhar@gmail.com"
// specialization
// "neurosurgeon"
// yearsOfExperience
// 4
// doctorName
// "prakhar"
// password
// "prakhar"
// city
// "Gurgaon"
// image
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAA…"
// doctorMobileNumber
// 8899889989
// _class
// "com.stackroute.model.Doctor"
