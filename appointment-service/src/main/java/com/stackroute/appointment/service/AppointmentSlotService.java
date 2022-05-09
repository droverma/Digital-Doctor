package com.stackroute.appointment.service;

import com.stackroute.appointment.models.AppointmentSlot;

import java.util.List;
import java.util.Optional;

public interface AppointmentSlotService {

    AppointmentSlot createAppointment(AppointmentSlot appointmentSlot);

    List<AppointmentSlot> getAllAppointmentsByPatient(String patientEmail);

     Optional<AppointmentSlot> getAppointmentDetails(String appointmentId);


}
