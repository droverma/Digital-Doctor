package com.stackroute.slot.repository;

import com.stackroute.slot.models.DoctorSlot;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorSlotRepository extends MongoRepository<DoctorSlot, String> {

    List<DoctorSlot> findSlotByDoctorEmailId(String doctorEmailId);


}

