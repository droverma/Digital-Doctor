package com.stackroute.exceptionhandling;

public class PatientDoesNotExistException extends Exception {
    public PatientDoesNotExistException(String message) {
        super(message);
    }
}
