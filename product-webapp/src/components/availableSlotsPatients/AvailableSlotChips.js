import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';

function AvailableSlotschips(props) {

    return (
        <div className= "appointment-button col">
        <Button className="btn-secondary">{props.slotStartTime} - {props.slotEndTime}</Button>
        </div> 
    )
}

export default AvailableSlotschips;