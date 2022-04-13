package com.stackroute.service;

import com.stackroute.exception.UserAlreadyExists;
import com.stackroute.exception.UserNotFoundException;
import com.stackroute.models.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Optional;

public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserByIdAndPassword(String emailId, String password) throws UserNotFoundException {
       User user =userRepository.findByIdAndPassword(emailId,password);
       if (user== null){
           throw new UserNotFoundException();

       }

       return user;
    }

    @Override
    public User saveUser(User user)  {
       return userRepository.save(user);

    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
