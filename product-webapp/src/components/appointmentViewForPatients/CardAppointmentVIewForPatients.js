import { Tooltip } from "@material-ui/core";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ChatIcon from '@mui/icons-material/Chat';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorAvatar from '../../assets/images/doctor_avatar.jpg';
import { SocketContext } from '../../context/Context';
import AppointmentService from "../../services/appointment.service";
import ProfileDetailsService from "../../services/profileDetails.service";
import VideoChatService from "../../services/VideoChat.service";


function CardAppointmentVIewForPatients(props) {
    const { socket, createMeeting } = useContext(SocketContext);
    const [doctorBasicDetails, setdoctorBasicDetails] = useState({});

    let navigate = useNavigate();

    const cancelClicked = () => {
        const filter = `appointmentId=${props.appointmentId}&patientEmail=${localStorage.getItem('userEmail')}`
        AppointmentService.appointmentByFilter(filter).then(res => {
            let data = {
                appointmentDate: res.data[0].appointmentDate,
                appointmentEndTime: res.data[0].appointmentEndTime,
                appointmentId: res.data[0].appointmentId,
                appointmentStartTime: res.data[0].appointmentStartTime,
                appointmentStatus: "CANCELLED",
                bookedOn: res.data[0].bookedOn,
                patientEmail: res.data[0].patientEmail,
                doctorEmail: res.data[0].doctorEmail,
                slotId: res.data[0].slotId,
                specialization: res.data[0].specialization,
                __v: res.data[0].__v,
                _id: res.data[0]._id
            }
            AppointmentService.updateStatusForApmt(data).then((res) => {
                props.refreshApi();
            })
        })
    }

    const joinMeeting = () => {
        socket.emit("me");
        createMeeting();
        VideoChatService.joinMeetingID(props.appointmentId)
            .then(res => {
                navigate('/video', { state: { id: res.data.meetingId, appointmentId: props.appointmentId } })
            })
            .catch(err => console.log(err))

    }
    const showChat = () => {
        navigate('/chat', { state: props.appointmentId })
    }
    useEffect(() => {
        ProfileDetailsService.doctorProfileAvailableSlots(props.doctorEmail).then((response) => {
            setdoctorBasicDetails(response.data);
        })
    }, [props])

    return (
        <div className="col-md-6 mb-4">
            <div className="card ">
                <div className="card-body">
                    <div className="row">
                        <div className="col mb-3">
                            <img src={doctorBasicDetails.image ? doctorBasicDetails.image : DoctorAvatar} alt="doctor" className="doctors-image" />
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col pt-2 pe-0 ps-0">
                                    <h5 className="fw-bold"><span>Dr. </span>{doctorBasicDetails.doctorName ? doctorBasicDetails.doctorName : 'Doctor'}</h5>
                                </div>
                            </div>
                            <div className="text-right">
                                <p>{props.specialization}</p>
                            </div>
                            <div className="text-right">
                               <h6 className="card-title pe-4">Exp: {doctorBasicDetails.yearsOfExperience ? doctorBasicDetails.yearsOfExperience : '0'} yrs</h6>

                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row col pe-0 ps-0">
                            <div className="col-3 pe-0 ps-0">
                                <Tooltip
                                    title="Appointment Date"
                                    placement="top">
                                    <CalendarMonthIcon className="calendar-icon"
                                    />
                                </Tooltip>
                            </div>
                            <div className="col-9 pe-0 ps-0">
                                <p>
                                    {moment(props.appointmentDate).format('YYYY-MM-DD')}
                                </p>
                            </div>
                        </div>
                        <div className="row col pe-0 ps-0">
                            <div className="col-3 pe-0 ps-0">
                                <Tooltip
                                    title="Appointment Time"
                                    placement="top">
                                    <AccessAlarmIcon className="clock-icon"
                                    />
                                </Tooltip>
                            </div>
                            <div className="col-9 pe-0 ps-0 appointment-date">
                                <p>
                                    {props.appointmentStartTime} - {props.appointmentEndTime}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                    {
                            props.appointmentStatus !== "CANCELLED" && props.appointmentStatus !== "PAST" &&
                            <div className="col text-center" >
                                <Tooltip
                                    title="Cancel Appointment"
                                    placement="top">
                                    <ClearOutlinedIcon className="cancel-icon" onClick={cancelClicked}
                                    />
                                </Tooltip>
                            </div>
                        }
                        {
                            props.appointmentStatus !== "CANCELLED" && props.appointmentStatus !== "PAST" &&

                            <div className="col text-center"> <Tooltip
                                title="Call Patient"
                                placement="top">
                                <AddIcCallIcon className="call-icon" onClick={joinMeeting} />
                            </Tooltip>
                            </div>
                        }
                        {
                            props.appointmentStatus !== "CANCELLED" && <div className="col text-center">

                                <Tooltip
                                    title="Chats"
                                    placement="top">
                                    <ChatIcon className="call-icon" onClick={showChat} />
                                </Tooltip>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardAppointmentVIewForPatients;