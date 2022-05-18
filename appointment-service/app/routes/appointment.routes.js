module.exports = (app) => {
  const appointments = require("../controllers/appointment.controller");

  app.post('/api/v1/appointments/add', appointments.bookAppointment);
  app.get('/api/v1/appointments/patients/:email', appointments.appointmentListByPatient);
  app.get('/api/v1/appointments/:email', appointments.appointmentListByDoctor);
  app.get('/api/v1/appointmentDetails/:id', appointments.appointmentDetails);
  app.put('/api/v1/appointments/status', appointments.updateAppointmentStatus);
  
};
