package com.stackroute.meetingdetails.repository;

import com.stackroute.meetingdetails.models.MeetingDetails;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface MeetingDetailsRepository extends MongoRepository<MeetingDetails,String> {
    MeetingDetails findByMeetingId(String meetingId);

}
