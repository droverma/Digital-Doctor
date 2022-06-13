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
public class Patient {
    @Id
    private String patientEmail;
    private String patientName;
    private long patientmobileNumber;
    private String password;
    private String city;
    private String patientImage;
}