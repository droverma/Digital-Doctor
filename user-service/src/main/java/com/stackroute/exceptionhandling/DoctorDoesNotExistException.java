package com.stackroute.exceptionhandling;

import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus

public class DoctorDoesNotExistException extends RuntimeException{
    public DoctorDoesNotExistException(String message){

        super(message);
    }
    public DoctorDoesNotExistException (String message,Throwable throwable){
        super(message, throwable);
    }


}
