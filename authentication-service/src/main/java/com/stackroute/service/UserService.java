package com.stackroute.service;



import com.stackroute.exception.UserNotFoundException;
import com.stackroute.models.User;


import java.util.List;

public interface UserService {

    User findUserByEmailIdAndPassword(String emailId,String password) throws UserNotFoundException;
    User saveUser(User user) ;
    List<User> getAllUsers();

}
