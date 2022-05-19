const mongoose = require('mongoose');

const bookAppointmentSchema = mongoose.Schema({
    appointmentId:String,
    slotId: String,
    patientEmail: String,
    doctorEmail: String,
    specialization: String,
    appointmentDate: Date,
    appointmentStartTime: Date,
    appointmentEndTime: Date,
    appointmentStatus: String,
    bookedOn: Date,
})

module.exports = mongoose.model('bookAppointment', bookAppointmentSchema)