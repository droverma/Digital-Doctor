const Appointment = require('../models/appointment.model');
const uuid = require('uuid');
const moment = require('moment');

exports.bookAppointment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }

    const bookAppointment = new Appointment({
        appointmentId: uuid.v1(),
        slotId: req.body.slotId,
        patientEmail: req.body.patientEmail,
        doctorEmail: req.body.doctorEmail,
        specialization: req.body.specialization,
        appointmentDate: req.body.appointmentDate,
        appointmentStartTime: req.body.appointmentStartTime,
        appointmentEndTime: req.body.appointmentEndTime,
        appointmentStatus: req.body.appointmentStatus,
        bookedOn: req.body.bookedOn,
    })

    if (bookAppointment.slotId === null || bookAppointment.slotId === '' ||
        bookAppointment.patientEmail === null || bookAppointment.patientEmail === '' ||
        bookAppointment.doctorEmail === null || bookAppointment.doctorEmail === '') {
        return res.status(401).send({ msg: 'Book Appointment data missing' })
    }

    bookAppointment.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            msg: "Error"
        });
    });
}

exports.appointmentListByPatient = (req, res) => {
    Appointment.find({ patientEmail: req.params.email }).then(response => {
        res.send(response)
    }).catch(err => {
        res.status(500).send({
            msg: "error"
        })
    })
}

exports.appointmentListByDoctor = (req, res) => {
    Appointment.find({ appointmentId: req.params.id }).then(response => {
        res.send(response)
    }).catch(err => {
        res.status(500).send({
            msg: "error"
        })
    })
}

exports.appointmentDetails = (req, res) => {
    Appointment.find({ appointmentId: req.params.id }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}

exports.appointmentListBySpecialization = (req, res) => {
    Appointment.find({ specialization: req.params.specialization }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}
exports.appointmentListByDate = (req, res) => {
    console.log(req.params.date)
    Appointment.find({ appointmentDate: req.params.date }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}

exports.updateAppointmentStatus = (req, res) => {
    Appointment.find({ appointmentId: req.body.appointmentId }).then(response => {
        console.log(response[0]._id, 'user')
        if (response.length > 0)
            Appointment.findByIdAndUpdate(response[0]._id, { $set: req.body }, { new: true }).then(users => {
                res.send(users)
            }).catch(err => {
                res.status(500).send({
                    msg: "error"
                })
            })
        else
            return res.status(500).send({
                msg: "Appointment not found"
            })
    }).catch(err => {
        console.log(err, 'err')
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}