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
import { useLocation } from 'react-router-dom';
import DoctorImage from '../../assets/images/doctor_avatar.jpg'


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
    const { state } = useLocation();

    function changeDate(value) {
        let momentDate = moment(value).format('YYYY-MM-DD');
        AppointmentService.getSlotsUsingDate(momentDate, state).then((response) => {
            setresult(response.data);
        })
        setDate(momentDate);
    }

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        AppointmentService.getSlots(state).then((response) => {
            let data = response.data;
            setresult(data);
            ProfileDetailsService.doctorProfileAvailableSlots(data[0].doctorEmail).then((response) => {
                setDetails(response.data)
            })
        });

    }, [state]);

    const currentTimings = (startTime, endTime, slotId) => {
        setstartTime(startTime);
        setendTime(endTime);
        setslotId(slotId);
    }

    const bookAppointment = () => {
        let data = {
            slotId: slotId,
            patientEmail: patientEmail,
            doctorEmail: details._id,
            specialization: details.specialization ? details.specialization : '',
            appointmentDate: date,
            appointmentStartTime: startTime,
            appointmentEndTime: endTime,
            appointmentStatus: "UPCOMING",
            bookedOn: value,
        }
        if (startTime && endTime) {
            AppointmentService.bookAppointment(data).then((response) => {
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
                    setTimeout(() => { navigate('/appointmentViewForPatients', { state: state }) }, 2000)
                }

            })

            AppointmentService.getSlotDetails(slotId).then((response) => {

                let data = {
                    doctorEmail: response.data[0].doctorEmail,
                    slotDate: response.data[0].slotDate,
                    slotEndTime: response.data[0].slotEndTime,
                    slotId: response.data[0].slotId,
                    slotStartTime: response.data[0].slotStartTime,
                    slotStatus: "BOOKED",
                    specialization: response.data[0].specialization,
                    __v: response.data[0].__v,
                    _id: response.data[0]._id
                }
                AppointmentService.updateSlotStatus(data);
            })

        } else {
            toast.warning('Please select slot date!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
                            <img src={details.image ? details.image : DoctorImage} className="doctor-image" alt="" />
                        </div>
                        <div className="col mb-4">
                            <h6>Dr.{" "}{details.doctorName ? details.doctorName : 'No name'}</h6>
                        </div>
                        <div className="col mb-4">
                            {details.specialization ? details.specialization : 'No Specialization'}
                        </div>
                        <div className="col mb-4">
                            Email: {details._id ? details._id : 'No Email'}
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
                        result.filter(x => moment(x.slotDate).format('YYYY-MM-DD') === date).length === 0 &&
                        <div className="no-slots-available-for-patients">
                            <p>No Slots Available</p>
                        </div>
                    }
                </div>
                {result.map((response,i) => moment(response.slotDate).format('YYYY-MM-DD') === date
                    ?
                    <AvailableSlotschips
                        slotStartTime={response.slotStartTime}
                        slotEndTime={response.slotEndTime}
                        slotStatus={response.slotStatus}
                        currentTimings={currentTimings}
                        slotId={response.slotId}
                        key={i}
                        doctorEmailId={response.doctorEmail}
                    />
                    :
                    null
                )}
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
                <ToastContainer />

            </div>

        </div>
    )
}

export default AvailableSlotsPatients;
