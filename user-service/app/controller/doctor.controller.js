const Doctor = require("../models/doctor.model.js");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

// Doctor Registration
exports.registerDoctor = (req, res) => {
  const pwd = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(pwd, salt);
  if (!req.body) {
    return res.status(400).send({
      message: "Doctor content cannot be empty...........",
    });
  }
  const doctor = new Doctor({
    id: req.body.id,
    specialization: req.body.specialization,
    yearsOfExperience: req.body.yearsOfExperience,
    doctorName: req.body.doctorName,
    password: req.body.password,
    city: req.body.city,
    image: req.body.image,
    doctorMobileNumber: req.body.doctorMobileNumber,
  });
  doctor
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "Error Occured while creating Doctor records.........",
      });
    });
};

//update the Doctor list
exports.updateDoctor = (req, res) => {
  const pwd = req.body.password;
  const salt = bcrypt.genSaltSync(10);
  req.body.password = bcrypt.hashSync(pwd, salt);

  if (!req.body) {
    return res.status(400).send({
      message: "Doctor Data to update can not be Empty..........",
    });
  }
  let id = req.params.id;
  Doctor.findByIdAndUpdate(id, req.body, { useFineAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Doctor With id = ${id}.may be the data not found! `,
        });
      } else res.send({ message: "Doctor was updated Successfully..." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error Update Doctor with id=" + id,
      });
    });
};

//Doctor Sign in and Generate the JWT token
exports.signInDoctor = (req, res) => {
  const normalPassword = req.body.password;
  console.log("received");
  Doctor.findOne({ id: req.body.id }, "password", (err, doctor) => {
    if (err) {
      res.send("Invalid Password");
    }
    if (!doctor) {
      res.send("user not found ");
    }
    bcrypt.compare(req.body.password, doctor.password, (err, result) => {
      if (result == true) {
        let jwtsecretKey = process.env.JWT_SECRET_KEY;
        let data = { time: Date(), userId: 101 };
        const token = jwt.sign(data, jwtsecretKey);
        res.send(token);
      } else {
        res.send(" invalid user or password");
      }
    });
  });
};

// Find the All the doctors from the Collection
exports.getAllDoctor = (req, res) => {
  Doctor.find()
    .then((doctor) => {
      res.send(doctor);
    })
    .catch((err) => {
      res.status(500).send({ msg: "Error Occured while Fetching the Doctors" });
    });
};

// Find the doctors on the basis of specific id(Email)
exports.findDoctor = (req, res) => {
  const id = req.params.id;
  Doctor.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Doctor with id=${id}. May be Doctor was not exist.... `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Doctor with id = " + id,
      });
    });
};

// Find the doctors from the specific city
exports.findDoctorCity = (req, res) => {
  const city = req.params.city;
  Doctor.find({ city: city })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Doctor with city=${city}. May be Doctor was not exist.... `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Doctor with city only with " + city,
      });
    });
};

// Find the doctors from the specific city and specialization
exports.findDoctorCitySpec = (req, res) => {
  const { specialization, city } = req.params;
  Doctor.find({ specialization: specialization, city: city })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot find Doctor with city=${city}. May be Doctor was not exist.... `,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not find Doctor with city = " + city,
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
