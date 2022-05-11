package com.stackroute.appointment.service;

import com.stackroute.appointment.models.AppointmentSlot;
import com.stackroute.appointment.repository.AppointmentRepository;
import com.stackroute.config.Producer;
import com.stackroute.rabitmq.AppointmentDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentSlotImpl implements AppointmentSlotService {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    Producer producer;
    @Override
    public AppointmentSlot createAppointment(AppointmentSlot appointmentSlot) {
        AppointmentDto appointmentDto = new AppointmentDto();
        appointmentDto.setPatientEmail(appointmentSlot.getPatientEmail());
        producer.sendMessageToRabbitMq(appointmentDto);
        return appointmentRepository.save(appointmentSlot);
    }

    @Override
    public List<AppointmentSlot> getAllAppointmentsByPatient(String patientEmail) {
        return appointmentRepository.findAppointmentsByPatientEmail(patientEmail);
    }
    public List<AppointmentSlot> getAllAppointmentsByDoctor(String doctorEmail) {
        return appointmentRepository.findAppointmentsByDoctorEmail(doctorEmail);
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

    @Override
    public void deleteAppointmentById(String appointmentId) {
        appointmentRepository.deleteById(appointmentId);
    }

    @Override
    public AppointmentSlot updateStatus(AppointmentSlot appointmentSlot) {
        AppointmentSlot appointmentSlot1 = appointmentRepository.findById(appointmentSlot.getAppointmentId()).get();
        appointmentSlot1.setAppointmentStatus(appointmentSlot.getAppointmentStatus());
        return appointmentRepository.save(appointmentSlot1);
    }


}
