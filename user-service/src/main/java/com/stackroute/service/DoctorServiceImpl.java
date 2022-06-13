package com.stackroute.service;

import com.stackroute.repository.DoctorRepository;
import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.exceptionhandling.DoctorDoesNotExistException;
import com.stackroute.model.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
@Service

public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Doctor saveDoctor(Doctor doctor) throws DoctorAlreadyExistException {
        return doctorRepository.save(doctor);
    }

    @Override
    public Doctor getDoctorByEmail(String email) throws DoctorDoesNotExistException {
        Optional<Doctor> doctor = this.doctorRepository.findById(email);
        if (doctor.isPresent()) {
            return doctor.get();
        } else {
            throw new DoctorDoesNotExistException("doctor with id " + email + "doesnotexist");
        }

    }

    @Override
    public List<Doctor> getAllDoctorsBasedOnSpecializationAndCity(String specialization, String city) {
       return doctorRepository.findBySpecializationAndCity(specialization,city);

    }

    @Override
    public Doctor updateDoctor(Doctor doctor) {
        try{
           Doctor doctor1 =doctorRepository.findById(doctor.getDoctorEmail()).get();
           doctor1.setDoctorName(doctor.getDoctorName());
           doctor1.setSpecialization(doctor.getSpecialization());
           doctor1.setYearsOfExperience(doctor.getYearsOfExperience());
           doctor1.setCity(doctor.getCity());
           doctor1.setImage(doctor.getImage());
           doctor1.setPassword(doctor.getPassword());
           doctor1.setDoctorEmail(doctor.getDoctorEmail());
           doctorRepository.save(doctor1);
           return doctor1;
        }
           catch (DoctorDoesNotExistException ex){
            throw new DoctorDoesNotExistException("DoctorDoesNotExistException");

           }
    }
}
