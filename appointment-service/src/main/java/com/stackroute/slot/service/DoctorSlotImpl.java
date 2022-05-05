package com.stackroute.slot.service;

import com.stackroute.slot.exceptions.SlotAlredyExist;
import com.stackroute.slot.models.DoctorSlot;
import com.stackroute.slot.repository.DoctorSlotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
@Service
public class DoctorSlotImpl implements DoctorSlotService {

    @Autowired
    DoctorSlotRepository doctorSlotRepository;

    @Override
    public DoctorSlot createSlot(DoctorSlot doctorSlot) throws SlotAlredyExist {
        return doctorSlotRepository.save(doctorSlot);
    }

    @Override
    public Optional<DoctorSlot> getSlotDetails(String slotId) {
        return doctorSlotRepository.findById(slotId);

    }


    /*@Override
    public List<DoctorSlot> getAllSlotsByDoctor(String doctorEmail) {
        return doctorSlotRepository.findSlotByDoctorEmailId(doctorEmail);
    }*/
    public List<DoctorSlot> getAllSlotsByDoctor(String doctorEmailId) {
        return doctorSlotRepository.findSlotByDoctorEmailId(doctorEmailId);
    }

    @Override
    public DoctorSlot updateStatus(String slotId, DoctorSlot doctorSlot) {
        Optional<DoctorSlot> slotList =doctorSlotRepository.findById(slotId);
        if (slotList.isPresent()){
            if (doctorSlot.getSlotStatus() != null){
                slotList.get().setSlotStatus(doctorSlot.getSlotStatus());
            }
            return doctorSlotRepository.save(slotList.get());
        }
        return null;
    }

    @Override
    public void deleteSlotById(String slotId) {
        doctorSlotRepository.deleteById(slotId);

    }


}
