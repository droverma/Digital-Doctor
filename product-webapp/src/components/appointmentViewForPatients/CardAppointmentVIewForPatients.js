import React from "react";
import PersonIcon from '@mui/icons-material/Person';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import AppointmentService from "../../services/appointment.service";
import ReactTooltip from "react-tooltip";


function CardAppointmentVIewForPatients(props) {

    let appointmentService = new AppointmentService();

    const cancelClicked = () => {
        console.log(props.appointmentId);
        appointmentService.deleteDataAppointmentViewForPatients(props.appointmentId).then((response) => {
            console.log(response);
        })

    }
    return (
        <div className="col-md-6 mb-4">
            <div className="card ">
                <div className="card-body">
                    <div className="row">
                        <div className="col">
                            <img src={props.doctorImage} className="doctors-image" />
                        </div>
                        <div className="col">
                            <div className="row mb-4">
                                {/* <div className="col-3 text-right">
                                    <PersonIcon className="person-icon" />
                                </div> */}
                                <div className="col pt-2">
                                    <h4>Kamal Anand</h4>
                                </div>
                            </div>
                            <div className="text-right">
                                <p>{props.specialization}</p>
                            </div>
                            <div className="text-right mb-4">
                                <h6 className="card-title pe-4">Age: 32</h6>

                            </div>
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="row col">
                            <div className="col-3">
                                <CalendarMonthIcon className="calendar-icon"
                                data-tip data-for="appointment-date" />
                            </div>
                            <div className="col-9">
                                <p>

                                    {props.appointmentDate}
                                </p>
                            </div>
                        </div>
                        <div className="row col">
                            <div className="col-3">
                                <AccessAlarmIcon className="clock-icon"
                                data-tip data-for="appointment-time" />
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
                                props.appointmentStatus !== "CANCELED" && props.appointmentStatus !== "PAST" &&
                                <ClearOutlinedIcon className="cancel-icon" onClick={cancelClicked}
                                data-tip data-for="cancel" />
                            }
                        </div>
                        <div className="col text-center">
                            {
                                props.appointmentStatus !== "CANCELED" && props.appointmentStatus !== "PAST" &&
                                <AddIcCallIcon className="call-icon" data-tip data-for="call" />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip id="call" place="top" effect="solid" delayShow={400}>
                     Call Doctor
            </ReactTooltip>
            <ReactTooltip id="cancel" place="top" effect="solid" delayShow={400}>
                     Cancel Appointment
            </ReactTooltip>
            <ReactTooltip id="appointment-date" place="top" effect="solid" delayShow={400}>
                     Appointment Date
            </ReactTooltip>
            <ReactTooltip id="appointment-time" place="top" effect="solid" delayShow={400}>
                     Appointment Time
            </ReactTooltip>
        </div>
    )
}
export default CardAppointmentVIewForPatients;