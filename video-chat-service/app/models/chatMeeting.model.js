const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    appointmentId: String,
    msg: String,
    type: String,
    time: String,
    sender: String,
    role: String
})

module.exports = mongoose.model('chatMeetingDetails', meetingSchema)