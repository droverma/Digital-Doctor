import React, { useEffect, useMemo, useState } from "react";
import '../../component.css';
import CardAppointmentVIewForPatients from "./CardAppointmentVIewForPatients";
import AppointmentService from "../../services/appointment.service";
import moment from "moment";
import Pagination from "../pagination/Pagination";
import Posts from "../pagination/Posts";
import { Tooltip } from "@material-ui/core";
import '../pagination/Pagination.scss'
import ReactPaginate from "react-paginate";
import ProfileDetailsService from "../../services/profileDetails.service";
import {useLocation} from 'react-router-dom'


function AppointmentViewForPatients() {

    let appointmentService = new AppointmentService();

    const [result, setresult] = useState([]);
    const [defaultData, setDefaultData] = useState([]);
    const [activetab, setactivetab] = useState("UPCOMING");
    const [postsPerPage, setpostsPerPage] = useState(4);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPosts, settotalPosts] = useState();
    const [loading, setLoading] = useState(false);
    const [currentPosts, setcurrentPosts] = useState([]);
    const [paginateData, setpaginateData] = useState([]);
    const [activeTabData, setactiveTabData] = useState([]);
    const [patientEmail, setpatientEmail] = useState('');
    const { state } = useLocation();


    const [filters, setFilters] = useState({ specialization: '', date: moment().format('YYYY-MM-DD') });

    useEffect(() => {
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        appointmentService.getDataAppointmentViewForPatients(email).then((response) => {
            let data = response.data;
            // setresult(data);
            setDefaultData(data);
            console.log(data[0].doctorEmail);
            // data.map((res) => {
                
            // })
           

        })
    }, []);

    const refreshApi = () => {
        let email = localStorage.getItem("userEmail");
        setpatientEmail(email);
        appointmentService.getDataAppointmentViewForPatients(email).then((response) => {
            let data = response.data;

            setDefaultData(data);
        })
    }

    useEffect(() => {
        setresult(defaultData);
        filterData(defaultData);
    }, [activetab])

    useEffect(() => {
        filterData(defaultData);
    }, [defaultData])

    useEffect(() => {
        settotalPosts(activeTabData.length);
        // setpaginateData(activeTabData);
        // filterPaginate(activeTabData);
    }, [activeTabData])

    useEffect(() => {
        filterPaginate(paginateData)
    }, [currentPage, paginateData])


    const filterData = (arr) => {
        console.log(activetab);
        console.log(arr);
        let filter = arr.filter((res) => res.appointmentStatus === activetab)
        setresult(filter);
        settotalPosts(filter.length);
        setpaginateData(filter);
        setactiveTabData(filter)
        console.log(filter);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        filterResult();
    }

    const filterResult = () => {

        setCurrentPage(1);

        filters.date = moment(filters.date).format('YYYY-MM-DD');
        let date = moment(filters.date).format('YYYY-MM-DD');
        let filteredData;
        if (filters.specialization === "" && date !== "Invalid date") {
            filteredData = activeTabData.filter((response) => { return response.appointmentDate === date });
        } else if (filters.specialization !== "" && date === "Invalid date") {
            filteredData = activeTabData.filter((response) => { return response.specialization === filters.specialization });
        } else if (filters.specialization !== "" && date !== "Invalid date") {
            filteredData = activeTabData.filter((response) => {
                return response.specialization === filters.specialization &&
                    response.appointmentDate === date
            });
        }

        console.log(filters.date);
        setresult(filteredData);
        settotalPosts(filteredData.length);
        setpaginateData(filteredData);
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

    // const filterPaginate = (arr) => {

    //     if (arr.length > postsPerPage) {

    //         console.log(arr);
    //         const indexOfLastPost = currentPage * postsPerPage;
    //         const indexOfFirstPost = indexOfLastPost - postsPerPage;
    //         const currentPosts = arr.slice(indexOfFirstPost, indexOfLastPost);
    //         setresult(currentPosts);
    //     } else {
    //         setresult(arr);
    //     }
    // }

    const paginate = pageNumber => setCurrentPage(pageNumber);

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
        if (arr.length > postsPerPage) {
            const firstPageIndex = (currentPage - 1) * postsPerPage;
            const lastPageIndex = firstPageIndex + postsPerPage;
            const currentPosts = arr.slice(firstPageIndex, lastPageIndex);
            setresult(currentPosts);
        } else {
            setresult(arr);
        }

    }

    return (
        <div className="container-fluid row">
            <div className="col-lg-4 col-sm-12 filter-container-box">
                <div class="card card-with-image">
                    <div>
                        <img src="https://media2.giphy.com/media/EAkvNkimgOxvIryUzE/giphy.gif" class="card-img-top" alt="..." />
                    </div>
                    <div class="card-body search-fields">
                        <h5 class="card-title mb-4">Search Fields</h5>
                        <form onSubmit={handleSubmit}>
                            <input type="search" className="form-control mb-4" placeholder="Search by Specialization"
                                name="specialization" value={filters.specialization} onChange={handleChange}
                                autoComplete="off   " />
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
                    {/* <Posts posts={currentPosts} loading={loading} /> */}
                    {/* <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={totalPosts}
                        paginate={paginate}
                    /> */}
                    <Pagination
                        className="pagination-bar"
                        currentPage={currentPage}
                        totalCount={totalPosts ? totalPosts : 4}
                        pageSize={postsPerPage}
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
                        {
                            result.map((response) => {
                                return (
                                    <CardAppointmentVIewForPatients
                                        doctorEmail={response.doctorEmail}
                                        specialization={response.specialization}
                                        appointmentDate={response.appointmentDate}
                                        appointmentStartTime={response.appointmentStartTime}
                                        appointmentEndTime={response.appointmentEndTime}
                                        appointmentStatus={response.appointmentStatus}
                                        appointmentId={response.appointmentId}
                
                                        id={response.id}
                                        refreshApi={refreshApi}

                                    />
                                )
                            })

                        }

                    </div>
                </div>
            </div>
        </div>
    )

}

export default AppointmentViewForPatients;