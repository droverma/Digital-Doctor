package com.stackroute.repository;

import com.stackroute.model.Patient;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

<<<<<<< HEAD:user-service/src/main/java/com/stackroute/repository/PatientRepository.java
=======


>>>>>>> d786b1dbefe8444b56aaa2f43be9ad5c63bfe276:user-service/src/main/java/com/stackroute/Repository/PatientRepository.java
@Repository

public interface PatientRepository extends MongoRepository<Patient,String> {
}
