package com.stackroute.slot.controller;

import com.stackroute.slot.exceptions.SlotAlredyExist;
import com.stackroute.slot.models.DoctorSlot;
import com.stackroute.slot.service.DoctorSlotImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1")
public class SlotController {



    @Autowired
    private DoctorSlotImpl doctorSlotImpl;

//  Post request to Create a slot for doctor
    @PostMapping("doctor/slot")
   public DoctorSlot createSlot(@RequestBody DoctorSlot doctorSlot) throws SlotAlredyExist {
       return doctorSlotImpl.createSlot(doctorSlot);
   }

// Get request to Get slot details by slot id
   @GetMapping("/doctor/slot/{slotId}")
   public Optional<DoctorSlot> getSlotDetails(@PathVariable String slotId)  {
       return doctorSlotImpl.getSlotDetails(slotId);
   }

// Get request to get all slots by doctors emailid

 /*   @GetMapping("/doctor/slot/doctor/{doctorEmail}")
    public List<DoctorSlot> getAllSlotsByDoctor(@PathVariable String doctorEmail){
        return doctorSlotImpl.getAllSlotsByDoctor(doctorEmail);
    }*/

    @GetMapping("/doctor/slot/doctor/{doctorEmailId}")
    public List<DoctorSlot> getAllSlotsByDoctor(@PathVariable String doctorEmailId){
        return doctorSlotImpl.getAllSlotsByDoctor(doctorEmailId);

    }

// Put request to update the slot status by slotid

    @PutMapping("/doctor/slot/status/{slotId}")
    public DoctorSlot updateStatus(@PathVariable String slotId,@RequestBody DoctorSlot doctorSlot){
        return  doctorSlotImpl.updateStatus(slotId,doctorSlot);

    }

//  Delete request for delete a particular slot by slotid
    @DeleteMapping("/doctor/slot/{slotId}")
    void deleteSlotById(@PathVariable String slotId){
        doctorSlotImpl.deleteSlotById(slotId);
    }

}
