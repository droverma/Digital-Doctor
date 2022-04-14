package com.stackroute.service;

import com.stackroute.Repository.DoctorRepository;
import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.exceptionhandling.DoctorDoesNotExistException;
import com.stackroute.model.Doctor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class DoctorServiceImpl implements DoctorService{
    @Autowired
    private DoctorRepository doctorRepository;
    @Override
    public Doctor saveDoctor(Doctor doctor) throws DoctorAlreadyExistException {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor getDoctorByEmail(String email) throws DoctorDoesNotExistException {
        Optional<Doctor> doctor=this.doctorRepository.findById(email);
        if(doctor.isPresent()){
            return doctor.get();
        }
        else{
            throw new DoctorDoesNotExistException("doctor with id "+ email +"doesnotexist");
        }

    }

    @Override
    public List<Doctor> getAllDoctorsBasedOnSpecializationAndCity(String specialization, String city) {
        return null;
    }

    @Override
    public Doctor updateDoctor(Doctor doctor) {
        return null;
    }
}
