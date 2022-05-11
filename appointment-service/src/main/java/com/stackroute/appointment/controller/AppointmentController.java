package com.stackroute.appointment.controller;

import com.stackroute.appointment.models.AppointmentSlot;
import com.stackroute.appointment.service.AppointmentSlotImpl;

import com.stackroute.appointment.service.AppointmentSlotService;
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
    AppointmentSlotService appointmentSlotService;



   @PostMapping("/patient/appointmentSlots")
    public AppointmentSlot createAppointment(@RequestBody AppointmentSlot appointmentSlot){
       System.out.println(appointmentSlot.getAppointmentDate());
       System.out.println(appointmentSlot.getAppointmentEndTime());

       return appointmentSlotService.createAppointment(appointmentSlot);
   }

    @GetMapping("/appointmentSlot/patient/{patientEmail}")
    public List<AppointmentSlot> getAllAppointmentsByPatient(@PathVariable String patientEmail ){
        System.out.println("patient Email");
        return appointmentSlotService.getAllAppointmentsByPatient(patientEmail);
    }
    @GetMapping("appointmentSlot/{doctorEmail}")
    public List<AppointmentSlot> getAllAppointmentsByDoctor(@PathVariable String doctorEmail ){
        System.out.println("doctor Email");
        return appointmentSlotService.getAllAppointmentsByDoctor(doctorEmail);
    }

    @GetMapping("/appointmentDetails/{appointmentId}")
    public Optional<AppointmentSlot> getAppointmentDetails(@PathVariable String appointmentId)  {
        return appointmentSlotService.getAppointmentDetails(appointmentId);
    }

    @GetMapping("/patient/appointmentDetails/{specialization}")
    List<AppointmentSlot> getAppointmentDetailsBySpecialization(@PathVariable String specialization ){
        return appointmentSlotService.getAppointmentDetailsBySpecialization(specialization);
    }

    @GetMapping("/appointmentDetails/patient/{appointmentDate}")
    List<AppointmentSlot> getAppointmentsByDate(@PathVariable (name = "appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate appointmentDate){
        return appointmentSlotService.getAppointmentsByDate(appointmentDate);
    }


    @GetMapping("/appointmentDetails/{appointmentDate}/{specialization}")
    List<AppointmentSlot> getAppointmentDetailsByDateAndSpec(@PathVariable String specialization , @PathVariable (name = "appointmentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)LocalDate appointmentDate){
        return appointmentSlotService.getAppointmentDetailsBYDateAndSpec(appointmentDate,specialization);
    }

    @DeleteMapping("/user/appointment/{appointmentId}")
    void deleteAppointmentById(@PathVariable String appointmentId){
        appointmentSlotService.deleteAppointmentById(appointmentId);
    }

    @PutMapping("/user/appointmentStatus")
    public AppointmentSlot updateSlotStatus(@RequestBody AppointmentSlot appointmentSlot) {
       return appointmentSlotService.updateStatus(appointmentSlot);
    }


}
