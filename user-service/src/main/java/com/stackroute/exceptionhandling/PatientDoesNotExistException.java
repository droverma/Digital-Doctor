package com.stackroute.exceptionhandling;

public class PatientDoesNotExistException extends RuntimeException {
    public PatientDoesNotExistException(String message) {

        super(message);
    }
    public PatientDoesNotExistException(String message,Throwable throwable){
        super(message,throwable);
    }
}
