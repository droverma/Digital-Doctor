const Meeting = require('../models/meeting.model');
const uuid = require('uuid');

exports.meetingIdByAppointment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }

    const meeting = new Meeting({
        appointmentId: req.body.appointmentId,
        meetingId: req.body.meetingId,
    })
    Meeting.find({ appointmentId: req.body.appointmentId }).then(response => {
        if (response.length > 0)
            Meeting.findOneAndUpdate(response[0]._id, { $set: req.body }, { new: true }).then(response => {
                console.log(response)
                res.send('Meeting Id saved successfully!!');
            });
        else
            meeting.save().then(data => {
                console.log(data)
                res.send('Meeting Id saved successfully!!');
            }).catch(err => {
                res.status(500).send({
                    msg: "Error"
                });
            });
    });
}

exports.meetingsByAppointment = (req, res) => {
    Meeting.findOne({ appointmentId: req.params.id }).then(response => {
        res.send(response)
    }).catch(err => {
        res.status(500).send({
            msg: "error"
        })
    })
}
