package com.stackroute.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public class EmailDetails {

        // Class data members
        private String emailId;
        private String msgBody;
        private String subject;

    }


