package com.stackroute.repository;

import com.stackroute.model.Doctor;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


import java.util.List;



public interface DoctorRepository extends MongoRepository<Doctor,String>{

    List<Doctor> findBySpecializationAndCity(String specialization, String city);
     @Query
    List<Doctor> findByDoctorEmail();

}
