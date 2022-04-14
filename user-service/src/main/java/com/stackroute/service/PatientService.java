package com.stackroute.service;

import com.stackroute.exceptionhandling.PatientAlreadyExistException;
import com.stackroute.exceptionhandling.PatientDoesNotExistException;
import com.stackroute.model.Patient;

public interface PatientService {
    Patient savePatient(Patient patient)throws PatientAlreadyExistException;
    Patient getPatientByEmail(String email)throws PatientDoesNotExistException;
    Patient updatePatient(Patient patient);
}
