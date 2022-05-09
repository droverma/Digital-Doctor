package com.stackroute;


import com.stackroute.model.EmailDetails;
import com.stackroute.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailController {

    @Autowired
    private EmailService emailService;

    // Sending a simple Email
    @PostMapping("/sendMail")
    public ResponseEntity<?>
    sendMail(@RequestBody EmailDetails details)
    {
      try {
          emailService.sendEmail(details);
          return new ResponseEntity<String>("Email sent successfully", HttpStatus.OK);

      }
      catch (Exception e){
          return new ResponseEntity<String>("Email sending failure",HttpStatus.EXPECTATION_FAILED);
      }
    }

}


