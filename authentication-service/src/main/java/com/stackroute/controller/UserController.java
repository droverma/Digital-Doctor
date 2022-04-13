package com.stackroute.controller;

import com.stackroute.models.User;
import com.stackroute.service.UserService;
import com.stackroute.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {
    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/save")
    public void saveUser(@RequestBody User user){
        userService.saveUser(user);

    }




}
