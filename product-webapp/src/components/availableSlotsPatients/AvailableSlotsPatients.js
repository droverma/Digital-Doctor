
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
import ProfileDetailsService from "../../services/profileDetails.service";
import {useLocation} from 'react-router-dom';
import DoctorImage from '../../assets/images/Doctor_image.jpg'


function AvailableSlotsPatients() {

    let navigate = useNavigate();
    const [result, setresult] = useState([]);
    const [value] = useState(new Date());
    const [date, setDate] = useState('');
    const [details, setDetails] = useState({});
    const [patientEmail, setpatientEmail] = useState('');
    const [startTime, setstartTime] = useState('');
    const [endTime, setendTime] = useState('');
    const [slotId, setslotId] = useState('');
    const [doctorEmailId, setdoctorEmailId] = useState('');
    const { state } = useLocation();

    // const [bookedAppointments, setbookedAppointments] = useState([]);

    function changeDate(value, event) {
        let momentDate = moment(value).format('YYYY-MM-DD');
        console.log(momentDate);
        appointmentService.getSlotsUsingDate(momentDate).then((response)=>{
            console.log(response);
        })
        setDate(momentDate);

        // let a = value.toString();
        // let date = a.substring(4, 15);
        // setDate(date);
    }

    let appointmentService = new AppointmentService();

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        appointmentService.getSlots(state).then((response) => {
            let data = response.data;
            setresult(data);
            // setDetails(response.data[1]);
            console.log(response.data);
            console.log(response.data[0].doctorEmailId);
            ProfileDetailsService.doctorProfileAvailableSlots(response.data[0].doctorEmailId).then((response)=>{
                console.log(response);
                setDetails(response.data)
            })
        });
        
    }, []);

    const currentTimings = (startTime, endTime, slotId,doctorEmailId) => {
        setstartTime(startTime);
        setendTime(endTime);
        setslotId(slotId);
        setdoctorEmailId(doctorEmailId);
        
    }
    // const doctorsDetails = (doctorEmail) =>{
    //     ProfileDetailsService.doctorProfile(doctorEmail).then((response)=>{
    //         console.log(response);
    //         setDetails(response.data)
    //     })
    // }

    const bookAppointment = () => {
        let data = {
            slotId: slotId,
            patientEmail: patientEmail,
            doctorEmail: details.emailId,
            specialization: details.specialization ? details.specialization : '',
            appointmentDate: date,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime,
            appointmentStatus: "UPCOMING",
            bookedOn: value,
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
                    setTimeout(()=>{navigate('/appointmentViewForPatients', { state: state })},2000)   
                }

            })
            appointmentService.getSlotDetails(slotId).then((response)=>{
                response.data.slotStatus = "BOOKED";
                appointmentService.updateSlotStatus(response.data).then((res)=>{
                        console.log(res);
                })
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
                            <img src={details.image ? details.image : DoctorImage } className="doctor-image" alt="" />
                        </div>
                        <div className="col mb-4">
                            <h6>{details.doctorName ? details.doctorName : 'No name'}</h6>
                        </div>
                        <div className="col mb-4">
                            {details.specialization ? details.specialization : 'No Specialization'}
                        </div>
                        <div className="col mb-4">
                            Email: {details.emailId ? details.emailId : 'No Email'}
                        </div>
                        <div className="col mb-4">
                            Experience: {details.yearsOfExperience ? details.yearsOfExperience : '0'} years
                        </div>
                        <div className="col mb-4">
                            City: {details.city ? details.city : 'No City'}
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
                                    slotId={response.slotId}
                                    doctorEmailId={response.doctorEmailId}
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