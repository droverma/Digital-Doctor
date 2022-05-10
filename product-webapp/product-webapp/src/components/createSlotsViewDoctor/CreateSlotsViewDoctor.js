import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import AppointmentService from "../../services/appointment.service";
import CreateSlotChips from "./CreateSlotChips";
import './CreateSlotsViewDoctor.css'

function CreateSlotViewDoctor() {

    const [result, setresult] = useState([]);
    const [value] = useState(new Date());
    const [date, setDate] = useState('');
    const [fields, setfields] = useState({ slotDate: '', slotStartTime: '', slotEndTime: '' });
    const [patientEmail, setpatientEmail] = useState('');

    function changeDate(value, event) {
        let momentDate = moment(value).format('DD/MM/YYYY');
        console.log(momentDate);
        setDate(momentDate);

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        console.log(name, value);
        setfields({ ...fields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(fields);
        let slotDate = moment(fields.slotDate).format('DD/MM/YYYY');
        let slotStartTime = fields.slotStartTime;
        let slotEndTime = fields.slotEndTime;
        let slotStatus = "AVAILABLE";
        let data = {
            slotId: '',
            doctorEmail: '',
            specialization: '',
            slotDate: slotDate,
            slotStartTime: slotStartTime,
            slotEndTime: slotEndTime,
            slotStatus: slotStatus

        }
        appointmentService.addSlots(data).then((response) => {
            if (response) {
                getSlots();
            } else {
                console.log('No data found');
            }
        })

    }

    let appointmentService = new AppointmentService();

    useEffect(() => {
        getSlots();
    }, []);

    const getSlots = () => {
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        appointmentService.getSlots(patientEmail).then((response) => {
            let data = response.data;
            setresult(data);
        })
    }

    return (
        <div className="container-fluid">
            <nav>
                <div className="nav nav-tabs row" id="nav-tab" role="tablist">
                    <button className="nav-link active col" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-my-calendar" type="button" role="tab" aria-controls="nav-home" aria-selected="true">My Calendar</button>
                    <button className="nav-link col" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-create-slots" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Create Slots</button>
                </div>
            </nav>
            <div className="tab-content mt-4" id="nav-tabContent">
                <div className="tab-pane fade show active row" id="nav-my-calendar" role="tabpanel" aria-labelledby="nav-home-tab">
                    <div className="col-md-6">
                        <Calendar onChange={changeDate} value={value} className="calendar-create-slots" />
                    </div>
                    <div className="col-md-6 column button-container create-slot-button-container">

                        <div className="slots-container">
                            <div>
                                {
                                    result.filter(x => x.slotDate === date).length === 0 && 
                                        <div className="no-slots">
                                            <p>No Slots Available</p>
                                        </div>
                                }
                            </div>
                            {
                                result.map((response) => {

                                    if (response.slotDate === date) {
                                        return (
                                            <CreateSlotChips
                                                slotStartTime={response.slotStartTime}
                                                slotEndTime={response.slotEndTime}
                                                slotStatus={response.slotStatus}
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
                        <div className="column bookedAvailableButton">
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


                    </div>
                </div>
                <div className="tab-pane fade" id="nav-create-slots" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <div className="row create-slots-container">
                        <form onSubmit={handleSubmit}>
                            <div className="column slot-fields-box">
                                <div className="mb-4 mt-4 column col">
                                    <div className="col text-start mb-2">
                                        <label className="fw-bold"> Slot Date:</label>

                                    </div>
                                    <div className="col">
                                        <input type="date" placeholder="Select Slot Date"
                                            name="slotDate" value={fields.slotDate} onChange={handleChange}
                                            className="create-slot-input-fields" />
                                    </div>

                                </div>
                                <div className="mb-4 column col">
                                    <div className="col text-start mb-2">
                                        <label className="fw-bold"> Slot Start Time:</label>

                                    </div>
                                    <div className="col">
                                        <input type="time" placeholder="Slot Start Time"
                                            name="slotStartTime" value={fields.slotStartTime} onChange={handleChange}
                                            className="create-slot-input-fields" />
                                    </div>

                                </div>
                                <div className="mb-4 column col">
                                    <div className="col text-start mb-2">
                                        <label className="fw-bold"> Slot End Time:</label>

                                    </div>
                                    <div className="col">
                                        <input type="time" placeholder="Slot End Time"
                                            name="slotEndTime" value={fields.slotEndTime} onChange={handleChange}
                                            className="create-slot-input-fields" />
                                    </div>

                                </div>
                                <div className="mb-2 column col">
                                    <button type="submit" className="btn btn-primary">Create Slot</button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateSlotViewDoctor;