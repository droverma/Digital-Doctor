package com.stackroute.appointment.service;

import com.stackroute.appointment.models.AppointmentSlot;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AppointmentSlotService {

    AppointmentSlot createAppointment(AppointmentSlot appointmentSlot);

    List<AppointmentSlot> getAllAppointmentsByPatient(String patientEmail);

     Optional<AppointmentSlot> getAppointmentDetails(String appointmentId);

     List<AppointmentSlot> getAllAppointmentsByDoctor(String doctorEmail);

     List<AppointmentSlot> getAppointmentDetailsBYDateAndSpec(LocalDate appointmentdate, String specialization);

    List<AppointmentSlot> getAppointmentsByDate(LocalDate appointmentDate);

    List<AppointmentSlot> getAppointmentDetailsBySpecialization(String specialization);

    void deleteAppointmentById(String appointmentId);

    AppointmentSlot updateStatus(AppointmentSlot appointmentSlot);
}
