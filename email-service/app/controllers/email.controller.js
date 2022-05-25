const nodemailer = require("nodemailer");
var amqp = require('amqplib/callback_api');
const queue = 'tasks';
const axios = require('axios');
var message = '';


amqp.connect('amqp://localhost', function (error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }
        channel.assertQueue(queue);
        channel.consume(queue, function (msg) {
            console.log(" [x] Received %s", msg.content.toString());
            let messageFromSource = msg.content.toString();
            message = JSON.parse(messageFromSource);
            console.log(message.patientEmail);
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'noreply.digitaldoctor@gmail.com',
                    pass: 'Digi@1234'
                },
                tls: {
                    rejectUnauthorized: false,
                }
            });
        
            const mailOptions = {
                from: 'noreply.digitaldoctor@gmail.com', // sender address
                to: message.patientEmail, // list of receivers
                subject: 'Booking confirmation for Appointment', // Subject line
                text: `Hello ${message.patientEmail}, Thank you for booking an appointment with us`// plain text body
            };
        
            transporter.sendMail(mailOptions, (err, success) => {
                if (err) {
                    console.log(err, 'error')
                    res.status(500).send({ msg: 'Email failed !!' })
                }
                else {
                    console.log('Email sent successfully !!');
                    res.status(200).send({ msg: 'Email sent successfully !!' })
                }
            })
        }, {
            noAck: true
        });
    });
});

exports.emailSender = (req, res) => {
    console.log(req.body, 'body')
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }
}
