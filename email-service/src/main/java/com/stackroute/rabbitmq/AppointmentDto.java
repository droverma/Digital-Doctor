package com.stackroute.rabbitmq;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AppointmentDto {
    private String patientEmail;
}
