package com.stackroute.service;

import com.stackroute.Repository.PatientRepository;
import com.stackroute.exceptionhandling.PatientAlreadyExistException;
import com.stackroute.exceptionhandling.PatientDoesNotExistException;
import com.stackroute.model.Patient;
import org.springframework.beans.factory.annotation.Autowired;

public class PatientServiceImpl implements PatientService{
    @Autowired
    private PatientRepository patientRepository;
    @Override
    public Patient savePatient(Patient patient) throws PatientAlreadyExistException {
        return null;
    }

    @Override
    public Patient getPatientByEmail(String email) throws PatientDoesNotExistException {
        return null;
    }

    @Override
    public Patient updatePatient(Patient patient) {
        return null;
    }
}
