package com.stackroute;

import com.stackroute.models.User;
import com.stackroute.repository.UserRepository;
import com.stackroute.service.UserServiceImpl;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;

import static com.stackroute.models.UserRole.DOCTOR;
import static com.stackroute.models.UserRole.PATIENT;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest(classes ={UserServiceMockitoTestCase.class})
public class UserServiceMockitoTestCase {
    @InjectMocks
    private UserServiceImpl userService;
    @Mock
    private UserRepository userRepository;

    private List<User>userList=new ArrayList<>();

    private User user;


    /* @Test
    public void test_postuser(){

        List<User> myUsers = new ArrayList<User>();
        myUsers.add(new User("srikumar@gmail.com","srikumar",DOCTOR));
       String email = "srikumar@gmail.com";
      // String Password = "Srikumar";
        when(userRepository.findByEmailIdAndPassword("srikumar@gmail.com", "srikumar")).thenReturn((User) myUsers);
       assertEquals(email,userService.findUserByEmailIdAndPassword(email).getEmailId());

    }*/
}
