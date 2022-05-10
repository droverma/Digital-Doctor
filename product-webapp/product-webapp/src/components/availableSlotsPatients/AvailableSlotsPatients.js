
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import '../../component.css';
import AvailableSlotschips from "./AvailableSlotChips.js";
import AppointmentService from "../../services/appointment.service";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function AvailableSlotsPatients() {

    let navigate = useNavigate();
    const [result, setresult] = useState([]);
    const [value] = useState(new Date());
    const [date, setDate] = useState('');
    const [details, setDetails] = useState({});
    const [patientEmail, setpatientEmail] = useState('');
    const [startTime, setstartTime] = useState('');
    const [endTime, setendTime] = useState('');

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
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        appointmentService.getSlots(patientEmail).then((response) => {
            let data = response.data;
            setresult(data);
            setDetails(response.data[1]);
        })
    }, []);

    const currentTimings = (startTime, endTime) => {
        setstartTime(startTime);
        setendTime(endTime);
    }

    const bookAppointment = () => {
        let data = {
            id: "",
            appointmentId: "",
            slotId: "",
            patientEmail: "anilgarg@gmail.com",
            doctorEmail: "anuraggarg@gmail.com",
            specialization: "MBBS,MD-Medicine",
            appointmentDate: date,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime,
            appointmentStatus: "UPCOMING",
            bookedOn: value,
            doctorImage: "https://media.istockphoto.com/photos/doctor-holding-digital-tablet-at-meeting-room-picture-id1189304032?k=20&m=1189304032&s=612x612&w=0&h=ovTNnR0JX2cRZkzMBed9exRO_PamZLlysLDFkXesr4Q="
        }
        if (startTime && endTime) {
            appointmentService.getBookedAppointment(data).then((response) => {
                if (response) {
                    toast.success('Appointment Booked Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setTimeout(()=>{navigate('/appointmentViewForPatients')},2000)   
                }

            })
        }

    }

    return (
        <div className="container-fluid">
            <div className="row calender-doctor-details">
                <div className="col-md-8 col-sm-12 calender-container">

                    <Calendar onChange={changeDate} value={value} />
                </div>
                <div className="col-md-4 col-sm-12">
                    <div className="doctors-details">
                        <div className="col mb-1 mt-4">
                            <img src="../Doctor_image.jpg" className="doctor-image" alt="" />
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
                <div>
                    {
                        result.filter(x => x.slotDate === date).length === 0 &&
                        <div className="no-slots-available-for-patients">
                            <p>No Slots Available</p>
                        </div>
                    }
                </div>
                {
                    result.map((response) => {

                        if (response.slotDate === date) {
                            return (
                                <AvailableSlotschips
                                    slotStartTime={response.slotStartTime}
                                    slotEndTime={response.slotEndTime}
                                    slotStatus={response.slotStatus}
                                    currentTimings={currentTimings}
                                />
                            )
                        } else {
                            return (
                                console.log('No slots found')
                            )
                        }
                    })

                }
            </div>
            <div className="row">
                <div className="col row bookedAvailableButton">
                    <div className="col-lg-6 row">
                        <div className="col text-end">
                            <p className="bookedButtonColor"></p>
                        </div>
                        <div className="col">
                            <span>BOOKED</span>
                        </div>
                    </div>
                    <div className="col-lg-6 row">
                        <div className="col text-end">
                            <p className="availableButtonColor"></p>
                        </div>
                        <div className="col">
                            <span>AVAILABLE</span>
                        </div>
                    </div>
                </div>
                <div className="book-appointment col">
                    <Button className="btn-secondary button-styling appointment-button" onClick={bookAppointment} >Book Appointment</Button>

                </div>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />

            </div>

        </div>
    )
}

export default AvailableSlotsPatients;