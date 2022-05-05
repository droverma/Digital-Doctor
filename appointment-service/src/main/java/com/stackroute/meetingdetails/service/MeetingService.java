package com.stackroute.meetingdetails.service;

import com.stackroute.meetingdetails.models.MeetingDetails;



public interface MeetingService {


    MeetingDetails saveMeetingDetails(MeetingDetails meetingDetails);


    MeetingDetails getMeetingDetails(String appointmentId);
}
