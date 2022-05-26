module.exports = (app) => {
  const slots = require("../controllers/slot.controller.js");

  app.post("/doctor/slot", slots.createSlot);
  app.get("/doctor/slot/:slotId", slots.getSlotDetails);
  app.get("/doctor/slotDetails/:doctorEmailId", slots.getAllSlotsByDoctor);
  app.put("/doctor/slot/status", slots.updateStatus);
  app.delete("/doctor/slot/:slotId", slots.deleteSlotById);
  app.get("/slotDetails/doctor/:slotDate/:doctorEmailId", slots.getByDate);

};
