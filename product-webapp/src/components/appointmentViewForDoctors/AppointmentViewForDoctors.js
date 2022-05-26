import { Tooltip } from "@material-ui/core";
import moment from "moment";
import React, { useEffect, useState } from "react";
import '../../component.css';
import AppointmentService from "../../services/appointment.service";
import Pagination from "../pagination/Pagination";
import CardAppointmentVIewForDoctors from "./CardAppointmentVIewForDoctors";


function AppointmentViewForDoctors() {

    const [result, setresult] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [activetab, setactivetab] = useState("UPCOMING");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, settotalPosts] = useState();
    const [paginateData, setpaginateData] = useState([]);
    const [activeTabData, setactiveTabData] = useState([]);
    const [doctorEmail, setdoctorEmail] = useState('');


    const [filters, setFilters] = useState({ specialization: '', date: "" });

    useEffect(() => {
        appoinmentList();
    }, []);

    const refreshApi = () => {
        appoinmentList();
    }

    const appoinmentList = () => {
        let email = localStorage.getItem("userEmail");
        setdoctorEmail(email);
        const filter = `doctorEmail=${email}`
        AppointmentService.appointmentByFilter(filter).then(res => {
            let data = res.data;
            setDefaultData(data);
            setresult(data);
        })
    }

    useEffect(() => {
        setresult(defaultData);
        filterData(defaultData);
        //eslint-disable-next-line
    }, [activetab])

    useEffect(() => {
        filterData(defaultData);
        //eslint-disable-next-line
    }, [defaultData])

    useEffect(() => {
        settotalPosts(activeTabData.length);
        // filterPaginate(activeTabData);
    }, [activeTabData])

    useEffect(() => {
        filterPaginate(paginateData)
        //eslint-disable-next-line
    }, [currentPage, paginateData])


    const filterData = (arr) => {
        let filter = arr.filter((res) => res.appointmentStatus === activetab)
        setresult(filter);
        settotalPosts(filter.length);
        setpaginateData(filter);
        setactiveTabData(filter)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        filterResult();
    }

    const filterResult = () => {

        setCurrentPage(1);
        let date = moment(filters.date).format('YYYY-MM-DD');
        const filter = `appointmentDate=${date}&appointmentStatus=${activetab}&doctorEmail=${doctorEmail}`
        AppointmentService.appointmentByFilter(filter).then(res => {
            setresult(res.data);
        })
        settotalPosts(result.length);
        setpaginateData(result);
    }

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFilters({ ...filters, [name]: value });
    }
    const resetData = () => {
        setresult(defaultData);
        filterData(defaultData);
        filters.specialization = "";
        filters.date = "";
    }

    const setPastTab = () => {
        setactivetab("PAST");
        setCurrentPage(1);
    }
    const setUpcomingTab = () => {
        setactivetab("UPCOMING");
        setCurrentPage(1);
    }
    const setCancelledTab = () => {
        setactivetab("CANCELLED");
        setCurrentPage(1);
    }

    const filterPaginate = (arr) => {
        if (arr.length > 4) {
            const firstPageIndex = (currentPage - 1) * 4;
            const lastPageIndex = firstPageIndex + 4;
            const currentPosts = arr.slice(firstPageIndex, lastPageIndex);
            setresult(currentPosts);
        } else {
            setresult(arr);
        }

    }

    return (
        <div className="container-fluid row">
            <div className="col-lg-4 col-sm-12 filter-container-box">
                <div className="card card-with-image">
                    <div>
                        <img src="https://cdn.dribbble.com/users/2025439/screenshots/4062776/ml_gif4.gif" className="card-img-top" alt="..." />
                    </div>
                    <div className="card-body search-fields-Doctor-view">
                        <h5 className="card-title mb-4">Search Fields</h5>
                        <form onSubmit={handleSubmit}>
                            {/* <input type="search" className="form-control mb-4" placeholder="Search by Specialization"
                                name="specialization" value={filters.specialization} onChange={handleChange}
                                autoComplete="off   " /> */}
                            <input type="date" className="form-control mb-4"
                                name="date" value={filters.date} onChange={handleChange} />
                            <div className="text-end">
                                <Tooltip
                                    title="Reset Filters"
                                    placement="top">
                                    <button type="button" className="btn btn-secondary buttons"
                                        onClick={resetData}>Reset</button></Tooltip>
                                <Tooltip
                                    title="Filter Results"
                                    placement="top">
                                    <button type="submit" className="btn btn-secondary buttons ms-4"
                                    >Filter</button>
                                </Tooltip>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
            <div className="col-lg-8 column m-2 appointments">
                <div className="text-end mb-4">
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={totalPosts ? totalPosts : 4}
                        pageSize={4}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
                <div className="col mb-4">
                    <nav>
                        <div className="nav nav-tabs row" id="nav-tab" role="tablist">
                            <button className={`nav-link ${activetab === "UPCOMING" ? 'active' : ''} col`} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"
                                onClick={setUpcomingTab}>Upcoming Appointments</button>
                            <button className={`nav-link ${activetab === "PAST" ? 'active' : ''} col`} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"
                                onClick={setPastTab}>Past Appointments</button>
                            <button className={`nav-link ${activetab === "CANCELLED" ? 'active' : ''} col`} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"
                                onClick={setCancelledTab}>Cancelled Appointments</button>
                        </div>
                    </nav>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active row" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                        {result.map((response,i) =>
                            <CardAppointmentVIewForDoctors
                                patientEmail={response.patientEmail}
                                appointmentDate={response.appointmentDate}
                                appointmentStartTime={response.appointmentStartTime}
                                appointmentEndTime={response.appointmentEndTime}
                                appointmentStatus={response.appointmentStatus}
                                appointmentId={response.appointmentId}
                                doctorImage={response.doctorImage}
                                id={response.id}
                                refreshApi={refreshApi}
                                key={i}
                            />
                        )}

                    </div>
                </div>
            </div>
        </div>
    )

}

export default AppointmentViewForDoctors;