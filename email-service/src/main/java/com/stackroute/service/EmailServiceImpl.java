package com.stackroute.service;

import com.stackroute.model.EmailDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceImpl implements EmailService{


    @Autowired
    private JavaMailSender javaMailSender;

  /*  @Value("${spring.mail.username}")
    private String sender;
*/


    @Override
    public void sendEmail(EmailDetails details) {

        try {

            SimpleMailMessage mailMessage = new SimpleMailMessage();

           // mailMessage.setFrom(sender);
            mailMessage.setTo(details.getEmailId());
            mailMessage.setText("Hello "+ details.getEmailId()+", "+System.lineSeparator()+ "Thank you for booking an appointment with us");
            mailMessage.setSubject("Booking confirmation");

            javaMailSender.send(mailMessage);

        }

            catch (Exception e) {
               e.printStackTrace();
            }
    }


}
