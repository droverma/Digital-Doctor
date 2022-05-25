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
import ChatMeeting from "./components/videoChatMeeting/ChatMeeting";
import VideoChat from "./components/videoChatMeeting/VideoChatMeeting";
import Header from "./container/header/Header";
import ResponsiveDrawer from "./container/sideNav/SideNav";
// import ResponsiveDrawer from "./container/sideNav/Sidebar";
import { ContextProvider } from './context/Context';
import ProtectedRoute from "./ProtectedRoute";
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
                            <Route path="/doctorslist" element={<ProtectedRoute><DoctorsList /></ProtectedRoute>} />
                            <Route path="/updatedoctor" element={<ProtectedRoute> <DoctorProfile setisAuthenticated={(token) => setisAuthenticated(token)} /></ProtectedRoute>} />
                            <Route path="/updatepatient" element={<ProtectedRoute><PatientProfile setisAuthenticated={(token) => setisAuthenticated(token)} /></ProtectedRoute>} />
                            <Route path="/availableSlotsPatients" element={<ProtectedRoute><AvailableSlotsPatients /></ProtectedRoute>} />
                            <Route path="/video" element={<ContextProvider><ProtectedRoute><VideoChat /></ProtectedRoute></ContextProvider>} />
                            <Route path="/appointmentViewForPatients" element={<ContextProvider><ProtectedRoute><AppointmentViewForPatients /></ProtectedRoute></ContextProvider>} />
                            <Route path="/appointmentViewForDoctors" element={<ContextProvider><ProtectedRoute><AppointmentViewForDoctors /></ProtectedRoute></ContextProvider>} />
                            <Route path="/createSlotViewDoctor" element={<ProtectedRoute><CreateSlotViewDoctor /></ProtectedRoute>} />
                            <Route path="/createSlotViewDoctor" element={<ProtectedRoute><CreateSlotViewDoctor /></ProtectedRoute>} />
                            <Route path="/chat" element={<ProtectedRoute><ChatMeeting /></ProtectedRoute>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}
export default App;