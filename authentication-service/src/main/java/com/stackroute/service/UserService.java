package com.stackroute.service;

import com.stackroute.exception.UserAlreadyExists;
import com.stackroute.exception.UserNotFoundException;
import com.stackroute.models.User;
import com.stackroute.repository.UserRepository;

import java.util.List;

public interface UserService {

    User findUserByIdAndPassword(String emailId,String password) throws UserNotFoundException;
    User saveUser(User user) ;
    List<User> getAllUsers();
}
