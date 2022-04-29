package com.stackroute.config;
import com.stackroute.model.Doctor;
import com.stackroute.model.Patient;
import com.stackroute.rabbitmq.DoctorDto;
import com.stackroute.rabbitmq.PatientDto;
import com.stackroute.service.*;
import lombok.SneakyThrows;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


@Configuration
public class Consumer {
    @Autowired
    private DoctorService DoctorService;
    @Autowired
    private PatientService PatientService;

    @SneakyThrows
    @RabbitListener(queues="doctor_queue")
    public void getDoctorDtoFromRabbitMq(DoctorDto doctorDto)
    {
        System.out.println(doctorDto.toString());
        Doctor doctor=new Doctor();
        doctor.setDoctorEmail(doctorDto.getEmail());
        doctor.setPassword(doctorDto.getPassword());
        DoctorService.saveDoctor(doctor);
    }

    @SneakyThrows
    @RabbitListener(queues="doctor_queue")
    public void getPatientDtoFromRabbitMq(PatientDto patientDto)
    {
        System.out.println(patientDto.toString());
        Patient patient=new Patient();
        patient.setPatientEmail(patientDto.getEmail());
        patient.setPassword(patientDto.getPassword());
        PatientService.savePatient(patient);
    }

}