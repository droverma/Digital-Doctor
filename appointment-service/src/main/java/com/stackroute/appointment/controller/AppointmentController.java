package com.stackroute.appointment.controller;

import com.stackroute.appointment.models.AppointmentSlot;
import com.stackroute.appointment.service.AppointmentSlotImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/api/v1/")
public class AppointmentController {


    @Autowired
    AppointmentSlotImpl appointmentSlotImpl;



   @PostMapping("/patient/appointmentSlots")
    public AppointmentSlot createAppointment(@RequestBody AppointmentSlot appointmentSlot){
       System.out.println(appointmentSlot.getAppointmentDate());
       System.out.println(appointmentSlot.getAppointmentEndTime());

       return appointmentSlotImpl.createAppointment(appointmentSlot);
   }

    @GetMapping("/appointmentSlot/patient/{patientEmail}")
    public List<AppointmentSlot> getAllAppointmentsByPatient(@PathVariable String patientEmail ){
        System.out.println("patient Email");
        return appointmentSlotImpl.getAllAppointmentsByPatient(patientEmail);
    }
    @GetMapping("/appointmentSlot/{doctorEmail}")
    public List<AppointmentSlot> getAllAppointmentsByDoctor(@PathVariable String doctorEmail ){
        System.out.println("doctor Email");
        return appointmentSlotImpl.getAllAppointmentsByDoctor(doctorEmail);
    }

    @GetMapping("/appointmentDetails/{appointmentId}")
    public Optional<AppointmentSlot> getAppointmentDetails(@PathVariable String appointmentId)  {
        return appointmentSlotImpl.getAppointmentDetails(appointmentId);
    }

    @GetMapping("/patient/appointmentDetails/{specialization}")
    List<AppointmentSlot> getAppointmentDetailsBySpecialization(@PathVariable String specialization ){
        return appointmentSlotImpl.getAppointmentDetailsBySpecialization(specialization);
    }

    @GetMapping("/appointmentDetails/patient/{appointmentDate}")
    List<AppointmentSlot> getAppointmentsByDate(@PathVariable (name = "appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate appointmentDate){
        return appointmentSlotImpl.getAppointmentsByDate(appointmentDate);
    }


    @GetMapping("/appointmentDetails/{appointmentDate}/{specialization}")
    List<AppointmentSlot> getAppointmentDetailsByDateAndSpec(@PathVariable String specialization , @PathVariable (name = "appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate appointmentDate){
        return appointmentSlotImpl.getAppointmentDetailsBYDateAndSpec(appointmentDate,specialization);
    }

}
