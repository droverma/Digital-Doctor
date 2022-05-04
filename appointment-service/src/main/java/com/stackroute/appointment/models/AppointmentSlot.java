package com.stackroute.appointment.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
@Document
@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class AppointmentSlot {
    @Id
    private String appointmentId= UUID.randomUUID().toString();
    private String slotId;
    private String patientEmail;
    private String doctorEmail;
    private String specialization;
    private LocalDate appointmentDate;
    private LocalTime appointmentStartTime;
    private LocalTime appointmentEndTime;
    private AppointmentStatus appointmentStatus;
    private LocalDate bookedOn=LocalDate.now();



}
