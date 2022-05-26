module.exports = (app) => {
  const appointments = require("../controllers/appointment.controller");

  app.post('/api/v1/appointments/add', appointments.bookAppointment);
  app.get('/api/v1/appointmentFilter', appointments.appointmentListByFilter);
  app.put('/api/v1/appointments/status', appointments.updateAppointmentStatus);

};
