package com.stackroute.meetingdetails.service;

import com.stackroute.meetingdetails.models.MeetingDetails;
import com.stackroute.meetingdetails.repository.MeetingDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class MeetingServiceImpl implements MeetingService {

    @Autowired
    MeetingDetailsRepository meetingDetailsRepository;

    @Override
    public MeetingDetails saveMeetingDetails(MeetingDetails meetingDetails) {
        return meetingDetailsRepository.save(meetingDetails);
    }

    @Override
    public MeetingDetails getMeetingDetails(String appoinmentId) {
        return meetingDetailsRepository.findById(appoinmentId).get();
    }
}
