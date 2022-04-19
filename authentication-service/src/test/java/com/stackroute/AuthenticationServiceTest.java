package com.stackroute;

import com.stackroute.models.User;
import com.stackroute.models.UserRole;
import com.stackroute.repository.UserRepository;
import com.stackroute.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


@SpringBootTest
public class AuthenticationServiceTest {

    @Autowired
    private UserService userService;

    @MockBean
    private UserRepository userRepository;


    // testcase for saveUser method
    @Test
    public void saveUserTest() {
        User user =new User("akhil","akhil", UserRole.DOCTOR);
        User user1 =new User("ram","ram", UserRole.PATIENT);
        Mockito.when(userRepository.save(user)).thenReturn(user);
        Assertions.assertEquals(user,userService.saveUser(user));
        System.out.println(user);
        System.out.println(user1);
    }
    @Test
    public void jwtTest(){

    }
}
