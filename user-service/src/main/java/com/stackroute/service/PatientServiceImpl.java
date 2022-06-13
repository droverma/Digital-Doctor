package com.stackroute.service;

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
    private PatientRepository patientRepository;
    @Override
    public Patient savePatient(Patient patient) throws PatientAlreadyExistException {
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
            Patient patient1 =patientRepository.findById(patient.getPatientEmail()).get();
            patient1.setPatientName(patient.getPatientName());
            patient1.setPatientEmail(patient.getPatientEmail());
            patient1.setPatientImage(patient.getPatientImage());
            patient1.setPassword(patient.getPassword());
            patient1.setCity(patient.getCity());
            patient1.setPatientmobileNumber(patient.getPatientmobileNumber());
            return patient1;
        }
        catch(PatientDoesNotExistException e){
            throw new PatientDoesNotExistException("PatientDoesNotExistException");


        }

    }
}
