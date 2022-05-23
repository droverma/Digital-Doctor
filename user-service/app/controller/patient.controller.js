const Patient = require("../models/patient.model.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();
// Patient Registration
exports.registerPatient = (req, res) => {
  const pwd = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(pwd, salt);
  if (!req.body) {
    return res.status(400).send({
      message: "Patient content cannot be empty...........",
    });
  }
  const patient = new Patient({
    _id: req.body.emailId,
    role: req.body.role,
    patientName: req.body.patientName ? req.body.patientName : "",
    patientMobileNumber: req.body.patientMobileNumber
      ? req.body.patientMobileNumber
      : "",
    password: req.body.password ? req.body.password : "",
    city: req.body.city ? req.body.city : "",
    patientImage: req.body.patientImage ? req.body.patientImage : "",
  });
  patient
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error Occured while creating Patient records.........",
      });
    });
};

//Update Patient Profile Details
exports.updatePatient = (req, res) => {
  // console.log(req.body);
  if (!req.body) {
    return res.status(400).send({
      message: "Patient Data to update can not be Empty..........",
    });
  }
  let _id = req.params.id;
  Patient.findByIdAndUpdate(_id, req.body, { useFineAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Patient With _id = ${_id}.may be the data not found! `,
        });
      } else res.send({ message: "Patient was updated Successfully..." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Update Patient with id=" + id,
      });
    });
};

//Patient Sign in and JWT Token Generation
exports.signInPatient = (req, res) => {
  const normalPassword = req.body.password;
  Patient.findOne({ _id: req.body.emailId }, "password", (err, patient) => {
    if (err) {
      return res.status(501).send({ error: "Invalid Password" });
    }
    if (patient.length === 0) {
      return res.status(500).send({ error: "user not found " });
    }
    bcrypt.compare(normalPassword, patient.password, (err, result) => {
      if (result == true) {
        console.log("Success");
        let jwtsecretKey = process.env.JWT_SECRET_KEY;
        let data = { time: Date(), userId: 101 };
        const token = jwt.sign(data, jwtsecretKey);
        res.send(token);
      } else {
        return res.status(502).send({ error: "invalid user or password" });
      }
    });
  });
};

//Fetching All Patients
exports.getAllPatient = (req, res) => {
  Patient.find()
    .then((patient) => {
      res.send(patient);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ msg: "Error Occured while Fetching the Patients" });
    });
};

//Fetchin Patient Based on id(EmailId)
exports.findPatient = (req, res) => {
  // console.log(req.params);
  const _id = req.params.id;
  Patient.findById(_id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Patient with _id=${_id}. May be Patient was not exist.... `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Patient with _id = " + _id,
      });
    });
};

//Token Validation
exports.validateToken = (req, res) => {
  let tokenHeaderKey = process.env.JWT_HEADER_KEY;
  let jwtsecretKey = process.env.JWT_SECRET_KEY;
  try {
    const token = req.header("authrization");
    // const token = req.header.authrization;
    // console.log("token is " + token);
    const verified = jwt.verify(token, jwtsecretKey);
    if (verified) {
      return res.send(token);
    } else {
      return res.status(401).send(error);
    }
  } catch (error) {
    return res.status(401).send(error);
  }
};
