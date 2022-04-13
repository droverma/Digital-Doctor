package com.stackroute.exceptionhandling;

public class DoctorDoesNotExistException extends Exception{
    public DoctorDoesNotExistException(String message){

        super(message);
    }


}
