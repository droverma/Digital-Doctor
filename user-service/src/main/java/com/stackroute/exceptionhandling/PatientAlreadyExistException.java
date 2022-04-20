package com.stackroute.exceptionhandling;

public class PatientAlreadyExistException extends Exception {
    public PatientAlreadyExistException(String message) {
        super(message);
    }
}
