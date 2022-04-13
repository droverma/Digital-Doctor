package com.stackroute.service;

import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.exceptionhandling.DoctorDoesNotExistException;
import com.stackroute.exceptionhandling.PatientAlreadyExistException;
import com.stackroute.exceptionhandling.PatientDoesNotExistException;
import com.stackroute.model.Doctor;
import com.stackroute.model.Patient;

import java.util.List;

public interface PatientService {
    Patient savePatient(Patient patient)throws PatientAlreadyExistException;
    Patient getPatientByEmail(String email)throws PatientDoesNotExistException;
    Patient updatePatient(Patient patient);
}
