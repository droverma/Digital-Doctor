package com.stackroute.repository;

import com.stackroute.model.Doctor;
import org.springframework.context.annotation.Configuration;
//import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
//import org.springframework.stereotype.Repository;

import java.util.List;


@Configuration

public interface DoctorRepository extends MongoRepository<Doctor,String>{
    List<Doctor> findBySpecializationAndCity(String specialization, String city);

}
