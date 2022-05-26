const Slots = require("../models/slot.model");
const uuid = require('uuid');
const { response } = require('express');
var moment = require("moment") ;

exports.getSlotDetails = (req, res) => {
  let slotId = req.params.slotId
  Slots.find({ slotId: slotId })
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching slots",
      });
    });
};

exports.getByDate = (req, res) => {
  let slotDate = req.params.slotDate
  let doctorEmail = req.params.doctorEmailId
  Slots.find({ slotDate: slotDate, doctorEmail: doctorEmail})
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      res.status(500).send({
        msg: "error occured while fetching slots",
      });
    });
};


exports.getAllSlotsByDoctor = (req, res) => {
  let doctorEmail = req.params.doctorEmailId
  Slots.find({ doctorEmail: doctorEmail })
    .then((response) => {
      res.send(response);
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
  
  // let slotStartTime = req.body.slotDate + "T" + req.body.slotStartTime + ":00.000Z"
  // let slotEndTime =  req.body.slotDate + "T" + req.body.slotEndTime + ":00.000Z"
  let slotDate = moment(req.body.slotDate).format("YYYY-MM-DD");
  const doctorSlot = new Slots({
    slotId: uuid.v1(),
    doctorEmail: req.body.doctorEmail,
    specialization: req.body.specialization,
    slotDate: slotDate,
    slotStartTime: req.body.slotStartTime,
    slotEndTime: req.body.slotEndTime,
    slotStatus: req.body.slotStatus,
  });

  if (doctorSlot.slotId === null|| doctorSlot.slotId === '' || doctorSlot.doctorEmail === null ||
    doctorSlot.doctorEmail === '' || doctorSlot.slotDate === '' || doctorSlot.slotDate === null ||
    doctorSlot.slotStartTime === null || doctorSlot.slotStartTime === '' || doctorSlot.slotEndTime === ''
    || doctorSlot.slotEndTime === null || doctorSlot.slotStatus === null
    || doctorSlot.slotStatus === '') {
    return res.status(401).send({ msg: 'Slot data inappropriate' })
  }


  doctorSlot
    .save()
    .then((response) => {
      res.send(response);
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
  let slotId = req.body.slotId;
  Slots.find({slotId: slotId}).then((response) =>{
    Slots.findByIdAndUpdate(response[0]._id, { $set: req.body }, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update  Slots with id=${slotId}!!!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating  Slots with id=" + slotId,
      });
    });
  }).catch((err) => {
    res.status(500).send({
      message: "Error updating  Slots with id=" + slotId,
    });
  });
 
};

exports.deleteSlotById = (req, res) => {
  let slotId = req.params.slotId;
  Slots.find({slotId: slotId}).then((response) =>{
    Slots.findByIdAndRemove(response[0]._id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete  Slots with id=${slotId}. Maybe  Slots was not found!`,
        });
      } else {
        res.send({
          message: " Slot was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete  Slots with id=" + slotId,
      });
    });
  }).catch((err) => {
    res.status(500).send({
      message: "Cannot delete Slot with id=" + slotId,
    });
  });
  
};
