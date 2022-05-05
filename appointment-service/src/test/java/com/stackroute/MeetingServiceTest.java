package com.stackroute;


import com.stackroute.meetingdetails.models.MeetingDetails;
import com.stackroute.meetingdetails.repository.MeetingDetailsRepository;
import com.stackroute.meetingdetails.service.MeetingServiceImpl;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;


import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.when;

@SpringBootTest(classes ={MeetingServiceTest.class})
public class MeetingServiceTest
{
    @InjectMocks
    MeetingServiceImpl meetingServiceImpl;

    @Mock
    MeetingDetailsRepository meetingDetailsRepository;

    @Test
    public void test_add(){


        MeetingDetails meeting = new MeetingDetails("1","1");
        when(meetingDetailsRepository.save(meeting)).thenReturn(meeting);
        MeetingDetails meetingDetails = null;
        assertEquals(meetingDetails,meetingServiceImpl.saveMeetingDetails(meetingDetails));

    }



    @Test
    public void test_getMeetingDetails(){

        MeetingDetails md=new MeetingDetails("2","3");
        String meetingbyid="3";
        Optional< MeetingDetails> opt= Optional.ofNullable(md);
        when(meetingDetailsRepository.findById(Mockito.anyString())).thenReturn(opt);
        assertEquals(new MeetingDetails("2","3"),meetingServiceImpl.getMeetingDetails(meetingbyid));
    }


}
