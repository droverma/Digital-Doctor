package com.stackroute.models;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum UserRole {
    @JsonProperty("doctor")
    DOCTOR,
    @JsonProperty("patient")
    PATIENT;

    UserRole() {
    }

}
