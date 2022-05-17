import React, { useContext, useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AppointmentService from "../../services/appointment.service";
import { Tooltip } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { SocketContext } from '../../context/Context';
import VideoChatService from "../../services/VideoChat.service";
import ProfileDetailsService from "../../services/profileDetails.service";
import PatientAvatar from '../../assets/images/patient_avatar.jpg';



function CardAppointmentVIewForDoctors(props) {
    console.log(props);
    const { socket, me, createMeeting } = useContext(SocketContext);
    const [patientBasicDetails, setpatientBasicDetails] = useState({});

    let navigate = useNavigate();

    let appointmentService = new AppointmentService();

    const cancelClicked = () => {
        console.log(props);
        
        appointmentService.getAppointmentDetails(props.appointmentId).then((response) => {
            console.log(response);
            response.data.appointmentStatus = "CANCELLED";
            appointmentService.updateStatus(response.data).then((res) => {
                console.log(res);
                props.refreshApi();
            })
        })

    }
    const startMeeting = () => {
        socket.emit("me");
        createMeeting();
        console.log(me)
        let meetingObject = {
            appointmentId: props.appointmentId,
            meetingId: me
        }
        if (me) {
            // navigate('/video')
            VideoChatService.StartMeetingID(meetingObject)
                .then(res => navigate('/video'))
                .catch(err => console.log(err))
        }
    }

    useEffect(()=>{
        ProfileDetailsService.patientProfileForDoctorView(props.patientEmail).then((response)=>{
            console.log(response.data);
            setpatientBasicDetails(response.data);  
        })
    },[])

    return (
        <div className="col-md-6 mb-4">
            <div className="card ">
                <div className="card-body">
                    <div className="row">
                        <div className="col mb-3">
                            <img src={patientBasicDetails.patientImage ? patientBasicDetails.patientImage : PatientAvatar} className="doctors-image" />
                        </div>
                        <div className="col">
                            <div className="row mb-4">
                                {/* <div className="col-3 text-right">
                                    <PersonIcon className="person-icon" />
                                </div> */}
                                <div className="col pe-0 ps-0">
                                    {/* <h4>Kamal Anand</h4> */}
                                    <h4>{patientBasicDetails.patientName ? patientBasicDetails.patientName : 'Patient'}</h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <p>{patientBasicDetails.city}</p>
                            </div>
                            <div className="text-right mb-4">
                                <h6 className="card-title pe-4">M: {patientBasicDetails.patientMobileNumber ? patientBasicDetails.patientMobileNumber : 'NA'}</h6>

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
                                    <AddIcCallIcon className="call-icon" onClick={startMeeting} />
                                </Tooltip>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CardAppointmentVIewForDoctors;