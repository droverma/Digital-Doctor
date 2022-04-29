package com.stackroute.config;
import com.stackroute.exceptionhandling.DoctorAlreadyExistException;
import com.stackroute.model.Doctor;
import com.stackroute.model.Patient;
import com.stackroute.models.User;
import com.stackroute.models.UserRole;
import com.stackroute.rabbitmq.DoctorDto;
import com.stackroute.rabbitmq.PatientDto;
import com.stackroute.rabbitmq.UserDTO;
import com.stackroute.service.*;
import lombok.SneakyThrows;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;


@Configuration
public class Consumer {
    @Autowired
    private UserServiceImpl userService;



    @RabbitListener(queues="user_queue")
    public void getUserDtoFromRabbitMq(UserDTO userDTO)
    {
        System.out.println(userDTO.toString());
        User user = new User();
        user.setEmailId(userDTO.getEmailId());
        user.setPassword(userDTO.getPassword());
        String enumValue = userDTO.getUserRole();
        user.setRole(UserRole.valueOf(enumValue));
        userService.saveUser(user);
    }

//    @RabbitListener(queues="doctor_queue")
//    public void getPatientDtoFromRabbitMq(PatientDto patientDto)
//    {
//        System.out.println(patientDto.toString());
//        Patient patient=new Patient();
//        patient.setPatientEmail(patientDto.getEmail());
//        patient.setPassword(patientDto.getPassword());
//        PatientService.savePatient(patient);
//    }

}