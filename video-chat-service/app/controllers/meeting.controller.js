const VideoMeeting = require('../models/videoMeeting.model');
const ChatMeeting = require('../models/chatMeeting.model');
const uuid = require('uuid');

exports.meetingIdByAppointment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }

    const meeting = new VideoMeeting({
        appointmentId: req.body.appointmentId,
        meetingId: req.body.meetingId,
    })
    VideoMeeting.find({ appointmentId: req.body.appointmentId }).then(response => {
        if (response.length > 0)
            VideoMeeting.findOneAndUpdate(response[0]._id, { $set: req.body }, { new: true }).then(response => {
                res.send('Meeting Id saved successfully!!');
            });
        else
            meeting.save().then(data => {
                res.send('Meeting Id saved successfully!!');
            }).catch(err => {
                res.status(500).send({
                    msg: "Error"
                });
            });
    });
}

exports.meetingsByAppointment = (req, res) => {
    VideoMeeting.findOne({ appointmentId: req.params.id }).then(response => {
        res.send(response)
    }).catch(err => {
        res.status(500).send({
            msg: "error"
        })
    })
}

exports.chatMeetingByAppointment = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }
    var data = req.body;

    ChatMeeting.create(data, (err, response) => {
        if (err)
            return res.send('Error');
        res.send(response);
    });
}

exports.chatListByAppointment = (req, res) => {
    ChatMeeting.find({ appointmentId: req.params.id }).then(response => {
        res.send(response)
    }).catch(err => {
        res.status(500).send({
            msg: "error"
        })
    })
}
