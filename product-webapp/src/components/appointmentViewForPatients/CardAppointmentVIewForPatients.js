import { Tooltip } from "@material-ui/core";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppointmentService from "../../services/appointment.service";
import VideoChatService from "../../services/VideoChat.service";
import { SocketContext } from '../../context/Context';
import ProfileDetailsService from "../../services/profileDetails.service";
import DoctorAvatar from '../../assets/images/doctor_avatar.jpg';


function CardAppointmentVIewForPatients(props) {
    const { socket, me, createMeeting } = useContext(SocketContext);
    const [doctorBasicDetails, setdoctorBasicDetails] = useState({});

    let navigate = useNavigate();
    let appointmentService = new AppointmentService();

    const cancelClicked = () => {
        console.log(props);
        appointmentService.getAppointmentDetails(props.appointmentId).then((res) => {
            res.data.appointmentStatus = "CANCELLED";
            console.log(res);
            appointmentService.updateStatus(res.data).then((response)=>{
                console.log(response);
                props.refreshApi();
            })
        })
            // console.log(response);

    }
    const joinMeeting = () => {
        socket.emit("me");
        createMeeting();
        // navigate('/video', { state: 'I5QpnN6eyMXKMge5AAAt' })
        VideoChatService.joinMeetingID(props.appointmentId)
            .then(res => {
                console.log(res)
                navigate('/video', { state: res.data.meetingId })
            })
            .catch(err => console.log(err))

    }

    useEffect(()=>{
        ProfileDetailsService.doctorProfileAvailableSlots(props.doctorEmail).then((response)=>{
            console.log(response.data);
            setdoctorBasicDetails(response.data);  
        })
    },[])

    return (
        <div className="col-md-6 mb-4">
            <div className="card ">
                <div className="card-body">
                    <div className="row">
                        <div className="col mb-3">
                            <img src={doctorBasicDetails.image ? doctorBasicDetails.image : DoctorAvatar} className="doctors-image" />
                        </div>
                        <div className="col">
                            <div className="row mb-4">
                                {/* <div className="col-3 text-right">
                                    <PersonIcon className="person-icon" />
                                </div> */}
                                <div className="col pt-2 pe-0 ps-0">
                                    {/* <h4>Kamal Anand</h4> */}
                                   <h4>{doctorBasicDetails.doctorName ? doctorBasicDetails.doctorName : 'Dr. Doctor'}</h4> 
                                </div>
                            </div>
                            <div className="text-right">
                                <p>{props.specialization}</p>
                            </div>
                            <div className="text-right mb-4">
                                {/* <h6 className="card-title pe-4">Age: 32</h6> */}
                                <h6 className="card-title pe-4">Exp: {doctorBasicDetails.yearsOfExperience ? doctorBasicDetails.yearsOfExperience : '0'} yrs</h6>

                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="row col">
                            <div className="col-3">
                                <Tooltip
                                    title="Appointment Date"
                                    placement="top">
                                    <CalendarMonthIcon className="calendar-icon"
                                    />
                                </Tooltip>
                            </div>
                            <div className="col-9">
                                <p>

                                    {props.appointmentDate}
                                </p>
                            </div>
                        </div>
                        <div className="row col">
                            <div className="col-3">
                                <Tooltip
                                    title="Appointment Time"
                                    placement="top">
                                    <AccessAlarmIcon className="clock-icon"
                                    />
                                </Tooltip>
                            </div>
                            <div className="col-9 appointment-date">
                                <p>
                                    {props.appointmentStartTime} - {props.appointmentEndTime}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-center" >
                            {
                                props.appointmentStatus !== "CANCELLED" && props.appointmentStatus !== "PAST" &&
                                <Tooltip
                                    title="Cancel Appointment"
                                    placement="top">
                                    <ClearOutlinedIcon className="cancel-icon" onClick={cancelClicked}
                                    />
                                </Tooltip>
                            }
                        </div>
                        <div className="col text-center">
                            {
                                props.appointmentStatus !== "CANCELLED" && props.appointmentStatus !== "PAST" &&
                                <Tooltip
                                    title="Call Doctor"
                                    placement="top">
                                    <AddIcCallIcon className="call-icon" onClick={joinMeeting} />
                                </Tooltip>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardAppointmentVIewForPatients;