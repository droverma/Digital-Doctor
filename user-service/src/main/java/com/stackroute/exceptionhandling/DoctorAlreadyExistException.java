package com.stackroute.exceptionhandling;

public class DoctorAlreadyExistException extends Exception{
    public DoctorAlreadyExistException(String message){
        super(message);
    }

}
