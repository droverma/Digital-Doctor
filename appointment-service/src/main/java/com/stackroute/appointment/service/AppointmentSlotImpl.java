package com.stackroute.appointment.service;

import com.stackroute.appointment.models.AppointmentSlot;
import com.stackroute.appointment.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentSlotImpl implements AppointmentSlotService {

    @Autowired
    private AppointmentRepository appointmentRepository;


    @Override
    public AppointmentSlot createAppointment(AppointmentSlot appointmentSlot) {
        return appointmentRepository.save(appointmentSlot);
    }

    @Override
    public List<AppointmentSlot> getAllAppointmentsByPatient(String patientEmail) {
        return appointmentRepository.findAppointmentsByPatientEmail(patientEmail);
    }

    public Optional<AppointmentSlot> getAppointmentDetails(String appointmentId) {
        return appointmentRepository.findById(appointmentId);
    }

    public List<AppointmentSlot> getAppointmentDetailsBYDateAndSpec(LocalDate appointmentdate, String specialization){
        return appointmentRepository.findAppointmentsByAppointmentDateAndSpecialization(appointmentdate,specialization);
    }

    public List<AppointmentSlot> getAppointmentsByDate(LocalDate appointmentDate) {
        return appointmentRepository.findAppointmentByAppointmentDate(appointmentDate);
    }


    public List<AppointmentSlot> getAppointmentDetailsBySpecialization(String specialization) {
        return appointmentRepository.findAppointmentBySpecialization(specialization);
    }

}
