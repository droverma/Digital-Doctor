const Appointment = require('../models/appointment.model');
const uuid = require('uuid');
var amqp = require('amqplib/callback_api');
const queue = 'tasks';

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

    // if (bookAppointment.slotId === null || bookAppointment.slotId === '' ||
    //     bookAppointment.patientEmail === null || bookAppointment.patientEmail === '' ||
    //     bookAppointment.doctorEmail === null || bookAppointment.doctorEmail === '') {
    //     return res.status(401).send({ msg: 'Book Appointment data missing' })
    // }

    bookAppointment.save().then(data => {
        res.send(data);
        amqp.connect('amqp://localhost', function (error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                  throw error1;
                }
            
                channel.assertQueue(queue);
            
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
                console.log(" [x] Sent %s", JSON.stringify(data));
              });
        });

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
    Appointment.find({ doctorEmail: req.params.email }).then(response => {
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
    Appointment.find({ specialization: req.params.specialization, appointmentStatus: req.params.activeTab }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}
exports.appointmentListByDate = (req, res) => {
    Appointment.find({ appointmentDate: req.params.date, appointmentStatus: req.params.activeTab }).then(response => {
        res.send(response);
    }).catch(err => {
        res.status(500).send({
            msg: "Appointment not found"
        })
    })
}

exports.appointmentListByFilter = (req, res) => {
   if (req.query.date)
        Appointment.find({
            appointmentDate: req.query.date,
            specialization: req.query.spec,
            appointmentStatus: req.query.status,
        }).then(response => {
            res.send(response);
        }).catch(err => {
            res.status(500).send({
                msg: "Appointment not found"
            })
        })
}

exports.updateAppointmentStatus = (req, res) => {
    Appointment.find({ appointmentId: req.body.appointmentId }).then(response => {
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
       res.status(500).send({
            msg: "Appointment not found"
        })
    })
}