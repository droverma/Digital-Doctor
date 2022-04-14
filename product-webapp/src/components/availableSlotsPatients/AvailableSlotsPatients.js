import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';
import AvailableSlotschips from "./AvailableSlotChips.js";

function AvailableSlotsPatients() {

    const [result, setresult] = useState([]);
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState('');
    const [noSlots, setNoSlots] = useState(false);
    const [details, setDetails] = useState({});

    function changeDate(value, event) {
        let a = value.toString();
        let date = a.substring(4, 15);
        setDate(date);
    }


    useEffect(() => {
        axios.get('http://localhost:3000/availableSlots').then((response) => {
            let data = response.data;
            setresult(data);
            setDetails(response.data[1]);
        })
    }, [])

    return (
        <div className="container-fluid">
            <div className="row calender-doctor-details">
                <div className="col">

                    <Calendar onChange={changeDate} value={value} />
                </div>
                <div className="col">
                    <div className="doctors-details column">
                        <div className="col mb-4 mt-4">
                            <img src="../Doctor_image.jpg"  className="doctor-image" />
                        </div>
                        <div className="col mb-4">
                            <h2>Dr. Jatin Chugh</h2>
                        </div>
                        <div className="col mb-4">
                            {details.specialization}
                        </div>
                        <div className="col mb-4">
                            Email: {details.doctorEmail}
                        </div>
                        <div className="col mb-4">
                            Phone: 9898457877
                        </div>
                    </div>
                </div>
            </div>
            <div className="row button-container">
                {
                    result.map((response) => {

                        if (response.slotDate === date) {
                            return (
                                <AvailableSlotschips
                                    slotStartTime={response.slotStartTime}
                                    slotEndTime={response.slotEndTime}
                                />
                            )
                        }
                    })
                }
            </div>
            <div className="book-appointment">
                <Button className="btn-secondary" disabled>Book Appointment</Button>
            </div>

        </div>
    )
}

export default AvailableSlotsPatients;