const mongoose = require("mongoose");

const doctorSlotSchema = mongoose.Schema({
        doctorEmail: String, // primary key
        specialization: String,
        yearsOfExperience: Number,
        doctorMobileNumber: Number,//optional
        doctorName: String,
        password: String,
        city: String,
        doctorImage: String
    
});

module.exports = mongoose.model("doctorSlot", doctorSlotSchema);
