import axios from "axios";
import React, { useState } from "react";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';

function AvailableSlotsPatients() {

    const [result, setresult] = useState([]);
    const [value, onChange] = useState(new Date());

    function changeDate(value, event){
            console.log(value);
    }

    useState(() => {
        console.log("ab");
        axios.get('http://localhost:3000/availableSlots').then((response) => {
            console.log(response);
            setresult(response.data[0]);
            console.log(response.data);
        })
    })

    return (
        <div className="container-fluid">
                <Calendar onChange={changeDate} value={value} />
           
        </div>
    )
}

export default AvailableSlotsPatients;