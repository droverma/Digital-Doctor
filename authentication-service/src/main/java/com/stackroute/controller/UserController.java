package com.stackroute.controller;

import com.stackroute.exception.UserNotFoundException;
import com.stackroute.models.User;
import com.stackroute.service.SecurityTokenGenerator;
import com.stackroute.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    private ResponseEntity responseEntity;
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityTokenGenerator securityTokenGenerator;

    @PostMapping("/register")
    public User saveUser(@RequestBody User user) {
        System.out.println("save user contrller");
        return userService.saveUser(user);

    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user) throws UserNotFoundException {
        Map<String, String> map = null;
        try {
            User user1 = userService.findUserByEmailIdAndPassword(user.getEmailId(), user.getPassword());
            if (user1.getEmailId().equals(user.getEmailId())) {
                map = securityTokenGenerator.generateToken(user);

            }
            responseEntity = new ResponseEntity(map, HttpStatus.OK);
        } catch (UserNotFoundException ex) {
            throw new UserNotFoundException();
        }
        catch (Exception e) {
            responseEntity = new ResponseEntity("error ouccured", HttpStatus.INTERNAL_SERVER_ERROR);

        }
        return responseEntity;
    }


}
