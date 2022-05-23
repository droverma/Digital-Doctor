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
import PatientAvatar from '../../assets/images/patient_img.png';
import moment from "moment";



function CardAppointmentVIewForDoctors(props) {
    const { socket, me, createMeeting } = useContext(SocketContext);
    const [patientBasicDetails, setpatientBasicDetails] = useState({});

    let navigate = useNavigate();

    const cancelClicked = () => {
        
        AppointmentService.appointmentDetails(props.appointmentId).then((res) => {
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
    const startMeeting = () => {
        socket.emit("me");
        createMeeting();
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
            setpatientBasicDetails(response.data);  
        })
    },[props])

    return (
        <div className="col-md-6 mb-4">
            <div className="card ">
                <div className="card-body">
                    <div className="row">
                        <div className="col mb-3">
                            <img src={patientBasicDetails.patientImage ? patientBasicDetails.patientImage : PatientAvatar} className="doctors-image" />
                        </div>
                        <div className="col">
                            <div className="row">
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
                            <div className="text-right">
                                <h6 className="card-title">M: {patientBasicDetails.patientMobileNumber ? patientBasicDetails.patientMobileNumber : 'NA'}</h6>

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

                                    {moment(props.appointmentDate).format('YYYY-MM-DD') }
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