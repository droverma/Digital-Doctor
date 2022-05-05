package com.stackroute.slot.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.UUID;
@Document
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class DoctorSlot {

    @Id
    private String slotId= UUID.randomUUID().toString();
    private String doctorEmailId;
    private String specialization;
    private LocalDate slotDate;
    private LocalTime slotStartTime;
    private LocalTime slotEndTime;
    private SlotStatus slotStatus;


}
