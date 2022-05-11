package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Doctor {
    @Id
    private String emailId;
    private String specialization;
    private double yearsOfExperience;
    private String doctorName;
    private String password;
    private String city;
    private String image;
    private Long doctorMobileNumber;

}




