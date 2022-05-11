package com.stackroute.service;

import com.stackroute.config.Producer;
import com.stackroute.rabbitmq.UserDTO;
import com.stackroute.repository.PatientRepository;
import com.stackroute.exceptionhandling.PatientAlreadyExistException;
import com.stackroute.exceptionhandling.PatientDoesNotExistException;
import com.stackroute.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class PatientServiceImpl implements PatientService{

    @Autowired
    Producer producer;
    @Autowired
    private PatientRepository patientRepository;
    @Override
    public Patient savePatient(Patient patient) throws PatientAlreadyExistException {
        UserDTO userDTO=new UserDTO();
        userDTO.setEmailId(patient.getEmailId());
        userDTO.setPassword(patient.getPassword());
        userDTO.setUserRole("patient");
        producer.sendMessageToRabbitMq(userDTO);
        return patientRepository.save(patient);
    }

    @Override
    public Patient getPatientByEmail(String email) throws PatientDoesNotExistException {
        Optional<Patient> patient=this.patientRepository.findById(email);
        if(patient.isPresent()){
            return patient.get();
        }
        else{
            throw new PatientDoesNotExistException("patient with id"+email+"does not exist");
        }

    }

    @Override
    public Patient updatePatient(Patient patient) {
        try{
            Patient patient1 =patientRepository.findById(patient.getEmailId()).get();
            patient1.setPatientName(patient.getPatientName());
            patient1.setEmailId(patient.getEmailId());
            patient1.setPatientImage(patient.getPatientImage());
            patient1.setPassword(patient.getPassword());
            patient1.setCity(patient.getCity());
            patient1.setPatientMobileNumber(patient.getPatientMobileNumber());
            return patientRepository.save(patient1);
        }
        catch(PatientDoesNotExistException e){
            throw new PatientDoesNotExistException("PatientDoesNotExistException");


        }

    }
}
