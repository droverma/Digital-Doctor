module.exports = (app) => {
  const patient = require("../controller/patient.controller.js");
  const doctor = require("../controller/doctor.controller.js");

  //Doctors API End-Points
  app.post("/api/v1/doctor", doctor.registerDoctor); // register new doctor
  app.post("/api/v1/doctor/login", doctor.signInDoctor); // Login
  app.put("/api/v1/doctor/profile/:id", doctor.updateDoctor); // update any particular doctor info
  app.get("/api/get-doctor", doctor.getAllDoctor);
  app.get("/api/v1/doctor/:id", doctor.findDoctor); // get any particular doctor info
  app.get("/api/v1/doctorlist/:city", doctor.findDoctorCity); //get the list of doctors based on city
  app.get(
    "/api/v1/doctorlist/:city/:specialization",
    doctor.findDoctorCitySpec
  ); //get the list of doctors based on city and specialization.
  app.get("/api/v1/doc/validateToken", doctor.validateToken);

  // Patients API End-Points
  app.post("/api/v1/patient", patient.registerPatient); // register new patient
  app.post("/api/v1/patient/login", patient.signInPatient); // Login
  app.put("/api/v1/patient/profile/:id", patient.updatePatient); // update any particular doctor info
  app.get("/api/get-patient", patient.getAllPatient);
  app.get("/api/v1/patient/:id", patient.findPatient); // get any particular patient info
  app.get("/api/v1/pat/validateToken", patient.validateToken);
};
