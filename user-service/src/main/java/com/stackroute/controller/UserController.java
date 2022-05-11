package com.stackroute.controller;

import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.exceptionhandling.DoctorDoesNotExistException;
import com.stackroute.exceptionhandling.PatientAlreadyExistException;
import com.stackroute.exceptionhandling.PatientDoesNotExistException;
import com.stackroute.model.Doctor;
import com.stackroute.model.Patient;
import com.stackroute.service.DoctorService;
import com.stackroute.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class UserController {
    private ResponseEntity responseEntity;
    @Autowired
    private DoctorService doctorService;
    @Autowired
    private PatientService patientService;

     @PostMapping("/doctor")
    public ResponseEntity<Doctor>saveDoctor(@RequestBody Doctor doctor) {
      try{
          doctor.setEmailId(doctor.getEmailId());
          responseEntity=new ResponseEntity<Doctor>(doctorService.saveDoctor(doctor), HttpStatus.CREATED);
      }
      catch(DoctorAlreadyExistException ex){
          responseEntity= new ResponseEntity("Doctor Already Exist",HttpStatus.INTERNAL_SERVER_ERROR);

      }
      return responseEntity;
    }
    @GetMapping("/doctor/{city}/{specialization}")
    public ResponseEntity<List<Doctor>>getDoctorsBySpecializationAndCity(@PathVariable String city,@PathVariable String specialization){
         try{
             responseEntity =new ResponseEntity<List<Doctor>>(doctorService.getAllDoctorsBasedOnSpecializationAndCity(specialization,city),HttpStatus.OK);
         }
         catch(Exception ex){
             responseEntity= new ResponseEntity("error occured",HttpStatus.EXPECTATION_FAILED);
         }
         return responseEntity;
    }
    @GetMapping("/doctorcity/{city}")
    public ResponseEntity<List<Doctor>>getAllDoctorsByCity(@PathVariable String city){
        try{
            responseEntity =new ResponseEntity<List<Doctor>>(doctorService.getAllDoctorsByCity(city),HttpStatus.OK);
        }
        catch(Exception ex){
            responseEntity= new ResponseEntity("error occured",HttpStatus.EXPECTATION_FAILED);
        }
        return responseEntity;
    }

    @PutMapping("/doctor/profile/{doctorEmail}")
    public ResponseEntity<Doctor>updateDoctor(@PathVariable String doctorEmail,@RequestBody Doctor doctor){
         return new ResponseEntity<Doctor>(doctorService.updateDoctor(doctor),HttpStatus.OK);
    }

    @GetMapping("/doctor/{doctorEmail}")
    public ResponseEntity <Doctor>getDoctorInfo(@PathVariable String doctorEmail){
         try {
            responseEntity= new ResponseEntity<Doctor>(doctorService.getDoctorByEmail(doctorEmail),HttpStatus.OK);
         }
         catch(DoctorDoesNotExistException ex){
             responseEntity=new ResponseEntity("doctor does not exist",HttpStatus.INTERNAL_SERVER_ERROR);

         }
         return responseEntity;
    }
    @PostMapping("/patient")
    public ResponseEntity<Patient>savePatient(@RequestBody Patient patient) {
        try{
            responseEntity=new ResponseEntity<Patient>(patientService.savePatient(patient), HttpStatus.CREATED);
        }
        catch(PatientAlreadyExistException ex){
            responseEntity= new ResponseEntity("Patient Alread Exist",HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return responseEntity;
    }
    @PutMapping("/patient/details/{patientEmail}")
    public ResponseEntity<Patient>updatePatient(@PathVariable String patientEmail,@RequestBody Patient patient){
        return new ResponseEntity<Patient>(patientService.updatePatient(patient),HttpStatus.OK);
    }
    @GetMapping("/patient/{patientEmail}")
    public ResponseEntity <Patient>getPatientInfo(@PathVariable String patientEmail){
        try {
            responseEntity= new ResponseEntity<Patient>(patientService.getPatientByEmail(patientEmail),HttpStatus.OK);
        }
        catch(PatientDoesNotExistException ex){
            responseEntity=new ResponseEntity("Patient Does Not Exist",HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return responseEntity;
    }

}
