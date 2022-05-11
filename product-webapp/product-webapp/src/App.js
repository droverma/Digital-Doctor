import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppointmentViewForDoctors from "./components/appointmentViewForDoctors/AppointmentViewForDoctors";
import AppointmentViewForPatients from "./components/appointmentViewForPatients/AppointmentViewForPatients";
import AvailableSlotsPatients from "./components/availableSlotsPatients/AvailableSlotsPatients";
import CreateSlotViewDoctor from "./components/createSlotsViewDoctor/CreateSlotsViewDoctor";
import About from "./components/landingPage/about/About";
import Contact from "./components/landingPage/contact/Contact";
import LandingPage from "./components/landingPage/LandingPage/LandingPage";
import DoctorProfile from "./components/profile/DoctorProfile";
import DoctorsList from "./components/profile/DoctorsList/DoctorsList";
import PatientProfile from "./components/profile/PatientProfile";
import VideoChat from "./components/videoMeeting/VideoChat";
import Header from "./container/header/Header";
import ResponsiveDrawer from "./container/sideNav/SideNav";
// import ResponsiveDrawer from "./container/sideNav/Sidebar";
import { ContextProvider } from './context/Context';
function App() {
    const [isAuthenticated, setisAuthenticated] = useState(false);
    useEffect(() => {
        let authToken = localStorage.getItem('jwt-token');
        if (authToken) {
            setisAuthenticated(authToken);
        }
    }, [])

    return (
        <React.Fragment>
            <div className={isAuthenticated ? 'app-container app-margin' : ''}>
                <div className="app-side-bar">
                    <ResponsiveDrawer />
                </div>
                <div className={isAuthenticated ? 'app-content' : ''}>
                    <div className="">
                        <Header setisAuthenticated={(token) => setisAuthenticated(token)} />
                    </div>
                    <div className="">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/doctorslist" element={<DoctorsList />} />
                            <Route path="/updatedoctor" element={<DoctorProfile setisAuthenticated={(token) => setisAuthenticated(token)} />} />
                            <Route path="/updatepatient" element={<PatientProfile setisAuthenticated={(token) => setisAuthenticated(token)} />} />
                            <Route path="/availableSlotsPatients" element={<AvailableSlotsPatients />} />
                            <Route path="/video" element={<ContextProvider><VideoChat /></ContextProvider>} />
                            <Route path="/appointmentViewForPatients" element={<ContextProvider><AppointmentViewForPatients /></ContextProvider>} />
                            <Route path="/appointmentViewForDoctors" element={<ContextProvider><AppointmentViewForDoctors /></ContextProvider>} />
                            <Route path="/createSlotViewDoctor" element={<CreateSlotViewDoctor />} />
                        </Routes>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;