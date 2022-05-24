module.exports = (app) => {
  const meeting = require("../controllers/meeting.controller");

  app.post('/api/v1/meeting', meeting.meetingIdByAppointment);
  app.get('/api/v1/meetings/:id', meeting.meetingsByAppointment);

};
