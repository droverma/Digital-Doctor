import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';

function AvailableSlotschips(props) {

    return (
        <div className= "appointment-button col mb-4">
        <Button className="btn-secondary button-styling">{props.slotStartTime} - {props.slotEndTime}</Button>
        </div> 
    )
}

export default AvailableSlotschips;