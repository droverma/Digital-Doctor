package com.stackroute.Repository;

import com.stackroute.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends MongoRepository<Doctor,String>{

    List<Doctor> findBySpecializationAndCity(String specialization, String city);

}
