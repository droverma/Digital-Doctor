package com.stackroute.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table
public class User {
    @Id
    private String emailId;
    private String password;
    private UserRole role;

}




