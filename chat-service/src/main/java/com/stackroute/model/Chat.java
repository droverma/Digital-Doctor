package com.stackroute.model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Document
public class Chat {
    @Id
    private String chatId;
    private String patientId;
    private String doctorId;
    private Message message;
}
