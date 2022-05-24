const mongoose = require('mongoose');

const meetingSchema = mongoose.Schema({
    appointmentId: String,
    meetingId: String
})

module.exports = mongoose.model('meetingDetails', meetingSchema)