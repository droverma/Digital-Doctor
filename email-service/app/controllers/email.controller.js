const nodemailer = require("nodemailer");

exports.emailSender = (req, res) => {
    console.log(req.body, 'body')
    if (!req.body) {
        return res.status(400).send({
            messsage: 'The content can not be empty'
        });
    }

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'drishti.1@globallogic.com',
            pass: 'kuku@Diva'
        },
        tls: {
            rejectUnauthorized: false,
        }
    });

    const mailOptions = {
        from: 'drishti@gmail.com', // sender address
        to: req.body.emailId, // list of receivers
        subject: 'Booking confirmation for Appointment', // Subject line
        text: `Hello ${req.body.emailId}, Thank you for booking an appointment with us`// plain text body
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
}
