package com.stackroute.models;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity
public class User {
    @Id
    private String emailId;
    private String password;
    @Enumerated(EnumType.STRING)
    private UserRole role;

    public User() {
    }

    public User(String emailId, String password, UserRole role) {
        this.emailId = emailId;
        this.password = password;
        this.role = role;
    }



    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserRole getRole() {
        return role;
    }

    public void setRole(UserRole role) {

        this.role = role;
    }

}




