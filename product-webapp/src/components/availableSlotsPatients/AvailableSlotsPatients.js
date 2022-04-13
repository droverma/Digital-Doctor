import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';

function AvailableSlotsPatients() {

    const [result, setresult] = useState([]);
    const [value, onChange] = useState(new Date());
    const [date, setDate] = useState('');

    let a = result.map((response) => {
        console.log(response);
        console.log(date);
        console.log(response.slotDate);

        if (response.slotDate === date){
            return (
            <div>
                <Button>{response.slotStartTime}-{response.slotEndTime}</Button>
            </div>
            )
        }
            
            else return <div style={{color:'blue'}}></div>
    })

    function changeDate(value, event) {
        console.log(value);
        let a = value.toString();
        let date = a.substring(4, 15);
        console.log(date);
        setDate(date);

    }

    useEffect(() => {
        console.log("ab");
        axios.get('http://localhost:3000/availableSlots').then((response) => {
            let data = response.data;
            setresult(data);
            console.log(result);
        })
    }, [])

    return (
        <div className="container-fluid">
            <Calendar onChange={changeDate} value={value} />
            {
                a

            }

        </div>
    )
}

export default AvailableSlotsPatients;