package com.stackroute.meetingdetails.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Setter
@Getter
public class MeetingDetails {
    @Id
    private String appointmentId;
    private String meetingId;
}

