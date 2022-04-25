package com.stackroute.model;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.sql.Time;
@Document
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Data
public class Message {

    private  String senderId;
    private  String reciverId;
    private  String messageContent;
    private  String file;
    private  Time timeSent;
}
