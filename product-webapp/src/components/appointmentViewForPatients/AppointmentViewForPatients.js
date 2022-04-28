import React, { useEffect, useState } from "react";
import '../../component.css';
import CardAppointmentVIewForPatients from "./CardAppointmentVIewForPatients";
import AppointmentService from "../../services/appointment.service";
import moment from "moment";
import Pagination from "../pagination/Pagination";
import Posts from "../pagination/Posts";
import ReactTooltip from "react-tooltip";


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


    const [filters, setFilters] = useState({ specialization: '', date: moment().format('YYYY-MM-DD') });

    useEffect(() => {
        appointmentService.getDataAppointmentViewForPatients().then((response) => {
            let data = response.data;
            // setresult(data);
            setDefaultData(data);

        })
    }, []);

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

        filters.date = moment(filters.date).format('YYYY-MM-DD');
        let date = moment(filters.date).format('DD/MM/YYYY');
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

    const filterPaginate = (arr) => {

        if(arr.length > postsPerPage){

            console.log(arr);
            const indexOfLastPost = currentPage * postsPerPage;
            const indexOfFirstPost = indexOfLastPost - postsPerPage;
            const currentPosts = arr.slice(indexOfFirstPost, indexOfLastPost);
            setresult(currentPosts);
        }else{
            setresult(arr);
        }
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-5 col-md-5 filter-container-box">
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
                                    <button type="button" className="btn btn-secondary" onClick={resetData}
                                    data-tip data-for="reset-filter" >Reset</button>
                                    <button type="submit" className="btn btn-secondary ms-4"
                                    data-tip data-for="filter" >Filter</button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
                <div className="col-7 col-md-7 column m-2">
                    <div className="text-end">
                    <Posts posts={currentPosts} loading={loading} />
                    <Pagination
                        postsPerPage={postsPerPage}
                        totalPosts={totalPosts}
                        paginate={paginate}
                        />
                    </div>
                    <div className="col mb-4">
                        <nav>
                            <div className="nav nav-tabs row" id="nav-tab" role="tablist">
                                <button className={`nav-link ${activetab === "UPCOMING" ? 'active' : ''} col`} id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"
                                    onClick={() => setactivetab("UPCOMING")}>Upcoming Appointments</button>
                                <button className={`nav-link ${activetab === "PAST" ? 'active' : ''} col`} id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"
                                    onClick={() => setactivetab("PAST")}>Past Appointments</button>
                                <button className={`nav-link ${activetab === "CANCELED" ? 'active' : ''} col`} id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false"
                                    onClick={() => setactivetab("CANCELED")}>Cancelled Appointments</button>
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
                                            doctorImage = {response.doctorImage}
                                        />
                                    )
                                })

                            }

                        </div>
                    </div>
                </div>
            </div>
            <ReactTooltip id="reset-filter" place="top" effect="solid" delayShow={400}>
                     Reset Applied Filters
            </ReactTooltip>
            <ReactTooltip id="filter" place="top" effect="solid" delayShow={400}>
                     Filter Results
            </ReactTooltip>
        </div>
    )

}

export default AppointmentViewForPatients;