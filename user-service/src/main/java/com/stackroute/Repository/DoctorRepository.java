package com.stackroute.Repository;

import com.stackroute.model.Doctor;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DoctorRepository extends MongoRepository<Doctor,String>{
}
