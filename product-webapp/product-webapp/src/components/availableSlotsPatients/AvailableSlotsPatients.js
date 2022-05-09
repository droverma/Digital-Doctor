
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';
import AvailableSlotschips from "./AvailableSlotChips.js";
import AppointmentService from "../../services/appointment.service";
import moment from "moment";

function AvailableSlotsPatients() {

    const [result, setresult] = useState([]);
    const [value] = useState(new Date());
    const [date, setDate] = useState('');
    const [details, setDetails] = useState({});
    // const [bookedAppointments, setbookedAppointments] = useState([]);

    function changeDate(value, event) {
        let momentDate = moment(value).format('DD/MM/YYYY');
        console.log(momentDate);
        setDate(momentDate);

        // let a = value.toString();
        // let date = a.substring(4, 15);
        // setDate(date);
    }

    let appointmentService = new AppointmentService();

    useEffect(() => {
        appointmentService.getSlots().then((response) => {
            let data = response.data;
            setresult(data);
            setDetails(response.data[1]);
        })
    }, []);

    const bookAppointment = () =>{
        appointmentService.getBookedAppointment().then((response) =>{
            // let data = response.data;
            // setbookedAppointments = data;

        })
    }

    return (
        <div className="container-fluid">
            <div className="row calender-doctor-details">
                <div className="col-md-8 col-sm-12 calender-container">

                    <Calendar onChange={changeDate} value={value} />
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="doctors-details column">
                        <div className="col mb-1 mt-4">
                            <img src="../Doctor_image.jpg"  className="doctor-image" alt="" />
                        </div>
                        <div className="col mb-4">
                            <h6>Dr. Jatin Chugh</h6>
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
                        }else{
                            return(
                               console.log('No slots found')
                            )
                        }
                    })
                    
                }
            </div>
            <div className="book-appointment">
                <Button className="btn-secondary button-styling" disabled onClick={bookAppointment} >Book Appointment</Button>
            </div>

        </div>
    )
}

export default AvailableSlotsPatients;