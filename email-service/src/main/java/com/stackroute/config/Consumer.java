package com.stackroute.config;

import com.stackroute.model.EmailDetails;
import com.stackroute.rabbitmq.AppointmentDto;
import com.stackroute.service.EmailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Consumer {


    @Autowired
    private EmailService emailService;


    @RabbitListener(queues="appointment_queue")
    public void getAppointmentDtoFromRabbitMq(AppointmentDto appointmentDto){
        System.out.println(appointmentDto.getPatientEmail());
        EmailDetails emailDetails = new EmailDetails();
        emailDetails.setEmailId(appointmentDto.getPatientEmail());
        emailService.sendEmail(emailDetails);

    }


}
