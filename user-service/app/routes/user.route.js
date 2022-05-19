module.exports = (app) => {
  const patient = require("../controller/patient.controller.js");
  const doctor = require("../controller/doctor.controller.js");

  //Doctors API End-Points
  app.post("/v1/doctor", doctor.registerDoctor); // register new doctor
  app.put("/v1/doctor/:id", doctor.updateDoctor); // update any particular doctor info
  app.post("/v1/user/doctor/", doctor.signInDoctor); // Login
  app.get("/get-doctor", doctor.getAllDoctor);
  app.get("/v1/doctor/:id", doctor.findDoctor); // get any particular doctor info
  app.get("/v1/doctor/:city", doctor.findDoctorCity); //get the list of doctors based on city
  app.get("/v1/doctor/:specialization/:city", doctor.findDoctorCitySpec); //get the list of doctors based on city and specialization.
  app.get("/v1/doc/validateToken", doctor.validateToken);

  // Patients API End-Points
  app.post("/v1/patient", patient.registerPatient); // register new patient
  app.put("/v1/patient/:id", patient.updatePatient); // update any particular doctor info
  app.post("/v1/user/patient", patient.signInPatient); // Login
  app.get("/get-patient", patient.getAllPatient);
  app.get("/v1/patient/:id", patient.findPatient); // get any particular patient info
  app.get("/v1/pat/validateToken", patient.validateToken);
};
