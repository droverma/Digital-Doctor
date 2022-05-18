const mongoose = require("mongoose");

const doctorSlotSchema = mongoose.Schema({
        slotId: String, // Auto generated primary key
        doctorEmail: String,
        specialization: String,
        slotDate: Date,//optional
        slotStartTime: Date,
        slotEndTime: Date,
        slotStatus: String  
});

module.exports = mongoose.model("doctorSlot", doctorSlotSchema);
