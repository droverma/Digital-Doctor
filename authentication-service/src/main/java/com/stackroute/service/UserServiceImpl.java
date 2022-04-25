package com.stackroute.service;


import com.stackroute.exception.UserNotFoundException;
import com.stackroute.models.User;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Override
    public User findUserByEmailIdAndPassword(String emailId, String password) throws UserNotFoundException {
       User user =userRepository.findByEmailIdAndPassword(emailId,password);
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
