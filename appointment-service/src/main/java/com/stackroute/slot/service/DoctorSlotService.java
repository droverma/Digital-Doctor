package com.stackroute.slot.service;

import com.stackroute.slot.exceptions.SlotAlredyExist;
import com.stackroute.slot.models.DoctorSlot;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


public interface DoctorSlotService {


    DoctorSlot createSlot(DoctorSlot doctorSlot) throws SlotAlredyExist;

    Optional<DoctorSlot> getSlotDetails(String slotId);


    DoctorSlot updateStatus(DoctorSlot doctorSlot);

    void deleteSlotById(String slotId);

    public List<DoctorSlot> getAllSlotsByDoctor(String doctorEmailId);

    public List<DoctorSlot> getSlotsByDate(LocalDate slotDate);
}
