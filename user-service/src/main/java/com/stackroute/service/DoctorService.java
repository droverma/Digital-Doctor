package com.stackroute.service;

import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.exceptionhandling.DoctorDoesNotExistException;
import com.stackroute.model.Doctor;

import java.util.List;

public interface DoctorService{
    Doctor saveDoctor(Doctor doctor)throws DoctorAlreadyExistException;
    Doctor getDoctorByEmail(String email)throws DoctorDoesNotExistException;
    List<Doctor> getAllDoctorsBasedOnSpecializationAndCity(String specialization,String city);
    Doctor updateDoctor(Doctor doctor);

    public List<Doctor> getAllDoctorsByCity( String city);
}

