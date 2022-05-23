import React, { useEffect, useState } from "react";
import moment from "moment";
import { Calendar } from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import AppointmentService from "../../services/appointment.service";
import CreateSlotChips from "./CreateSlotChips";
import './CreateSlotsViewDoctor.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import profileDetailsService from "../../services/profileDetails.service";

function CreateSlotViewDoctor() {

    const [result, setresult] = useState([]);
    const [validate, setValidate] = useState(true);
    const [value] = useState(new Date());
    const [date, setDate] = useState('');
    const [fields, setfields] = useState({ slotDate: '', slotStartTime: '', slotEndTime: '' });

    function changeDate(value, event) {
        let doctorEmail = localStorage.getItem("userEmail");
        let momentDate = moment(value).format('YYYY-MM-DD');
        AppointmentService.getSlotsUsingDate(momentDate, doctorEmail).then((response) => {
            setresult(response.data);
        })
        setDate(momentDate);

    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        switch (name) {
            case "slotDate":
                if (moment(new Date()).format('yyyy-MM-DD') <= value)
                    setValidate(false)
                else {
                    setValidate(true)
                    toast.warning('Slot date must be greater than and equal to today.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                break;
            case "slotEndTime":
                if (value > fields.slotStartTime)
                    setValidate(false)
                else {
                    setValidate(true)
                    toast.warning('Slot end time must be greater than slot start time.', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
                break;
            case "slotStartTime":
                if (fields.slotEndTime !== '')
                    if (value < fields.slotEndTime)
                        setValidate(false)
                    else {
                        console.log(fields.slotEndTime);
                        setValidate(true)
                        toast.warning('Slot Start time must be less than slot end time.', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                break;
            default: console.log('default')
                break;
        }
        setfields({ ...fields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let doctorEmail = localStorage.getItem("userEmail");
        profileDetailsService.doctorProfile(doctorEmail).then((res) => {
            console.log(res)
            let slotDate = moment(fields.slotDate).format('YYYY-MM-DD');
            let slotStartTime = fields.slotStartTime;
            let slotEndTime = fields.slotEndTime;
            let slotStatus = "AVAILABLE";
            let data = {
                doctorEmail: doctorEmail,
                specialization: res.data.specialization,
                slotDate: slotDate,
                slotStartTime: slotStartTime,
                slotEndTime: slotEndTime,
                slotStatus: slotStatus
            }

            AppointmentService.addSlots(data).then((response) => {
                if (response) {

                    toast.success('Slot Created Successfully!', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    getSlots();
                    setfields({ slotDate: '', slotStartTime: '', slotEndTime: '' })

                } else {
                    console.log('No data found');
                }
            })
        })
    }

    useEffect(() => {
        getSlots();
    }, []);

    const getSlots = () => {
        let email = localStorage.getItem("userEmail");
        // setpatientEmail(email);
        AppointmentService.getSlots(email).then((response) => {
            let data = response.data;
            setresult(data);
        })
    }
    const refreshApi = () => {
        let email = localStorage.getItem("userEmail");
        // setpatientEmail(email);
        AppointmentService.getSlots(email).then((response) => {
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
                                    result.filter(x => moment(x.slotDate).format('YYYY-MM-DD') === date).length === 0 &&
                                    <div className="no-slots">
                                        <p>No Slots Available</p>
                                    </div>
                                }
                            </div>
                            {
                                result.map((response) => {

                                    if (moment(response.slotDate).format('YYYY-MM-DD') === date) {
                                        return (
                                            <CreateSlotChips
                                                slotStartTime={response.slotStartTime}
                                                slotEndTime={response.slotEndTime}
                                                slotStatus={response.slotStatus}
                                                id={response.id}
                                                slotId={response.slotId}
                                                refreshApi={refreshApi}
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
                                            className="create-slot-input-fields"
                                            min={moment(new Date()).format('yyyy-MM-DD')} />
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
                                    <button type="submit" className="btn btn-primary" disabled={validate || !fields.slotDate || !fields.slotEndTime}>Create Slot</button>
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
                                <ToastContainer />
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default CreateSlotViewDoctor;