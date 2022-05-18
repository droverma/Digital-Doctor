const Slots = require("../models/slot.model");

exports.getSlotDetails = (req, res) => {
    let slotId = req.params.slotId;
   Slots.findById(slotId)
    .then((slots) => {
      res.send(slots);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching slots",
      });
    });
};

exports.getByDate = (req, res) => {
    let slotDate = req.params.slotDate;
   Slots.findById(slotDate)
    .then((slots) => {
      res.send(slots);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching slots",
      });
    });
};


exports.getAllSlotsByDoctor = (req, res) => {
    let doctorEmailId = req.params.doctorEmailId;
   Slots.findById(doctorEmailId)
    .then((slots) => {
      res.send(slots);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching slots",
      });
    });
};

exports.createSlot = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: " Slots content connot be empty",
    });
  }

  const doctorSlot = new  Slots({
    doctorEmail: req.body.doctorEmail,
    specialization: req.body.specialization,
    yearsOfExperience: req.body.yearsOfExperience,
    doctorMobileNumber: req.body.doctorMobileNumber,
    doctorName: req.body.doctorName,
    password: req.body.password,
    city: req.body.city,
    doctorImage: req.body.doctorImage
  });

  doctorSlot
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while creating slot !!",
      });
    });
};

exports.updateStatus = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  let slotId = req.params.slotId;
   Slots.findByIdAndUpdate(slotId, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  Slots with id=${slotId}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: " Slots was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating  Slots with id=" + slotId,
      });
    });
};

exports.deleteSlotById = (req, res) => {
  const slotId = req.params.slotId;
   Slots.findByIdAndRemove(slotId)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete  Slots with id=${slotId}. Maybe  Slots was not found!`,
        });
      } else {
        res.send({
          message: " Slots was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete  Slots with id=" + slotId,
      });
    });
};
