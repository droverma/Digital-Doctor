import React from "react";
import { Button } from "react-bootstrap";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';

function AvailableSlotschips(props) {

    const currentTiming =() =>{
        console.log(props);
        props.currentTimings(props.slotStartTime,props.slotEndTime,props.slotId,props.doctorEmailId)
    }

    return (
        <div className="col mb-4">
            <Button className={props.slotStatus === 'AVAILABLE' ? 'available-button-color btn-secondary button-styling' :
                'booked-button-color btn-secondary'}
                onClick={currentTiming}
            >{props.slotStartTime} - {props.slotEndTime}</Button>
        </div>
    )
}

export default AvailableSlotschips;