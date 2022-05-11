package com.stackroute.meetingdetails.controller;

import com.stackroute.meetingdetails.models.MeetingDetails;
import com.stackroute.meetingdetails.service.MeetingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin("*")
public class MeetingController {


    @Autowired
    MeetingServiceImpl meetingService;

    @PostMapping("/meeting")
    public MeetingDetails saveMeetingDetails(@RequestBody MeetingDetails meetingDetails){
        return meetingService.saveMeetingDetails(meetingDetails);
    }
    @GetMapping("/meeting/{meetingId}")
    public MeetingDetails getMeetingDetails(@PathVariable String meetingId){
        return meetingService.getMeetingDetails(meetingId);
    }

}
