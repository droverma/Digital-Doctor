import { Route, Routes } from "react-router-dom";
import "./App.css";
import AppointmentViewForDoctors from "./components/appointmentViewForDoctors/AppointmentViewForDoctors";
import AppointmentViewForPatients from "./components/appointmentViewForPatients/AppointmentViewForPatients";
import AvailableSlotsPatients from "./components/availableSlotsPatients/AvailableSlotsPatients";
import About from "./components/landingPage/about/About";
import Contact from "./components/landingPage/contact/Contact";
import DoctorProfile from "./components/profile/DoctorProfile";
import DoctorsList from "./components/profile/DoctorsList/DoctorsList";
import PatientProfile from "./components/profile/PatientProfile";
import VideoChat from "./components/videoMeeting/VideoChat";
import VideoChatMeeting from "./components/videoMeeting/VideoChatMeeting";
import Header from "./container/header/Header";


function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctorslist" element={<DoctorsList />} />
        <Route path="/updatedoctor" element={<DoctorProfile />} />
        <Route path="/updatepatient" element={<PatientProfile />} />
        <Route path="/availableSlotsPatients" element={<AvailableSlotsPatients />} />
        <Route path="/vid" element={<VideoChatMeeting />} />
        <Route path="/video" element={<VideoChat />} />
        <Route path="/appointmentViewForPatients" element={<AppointmentViewForPatients />} />
        <Route path="/appointmentViewForDoctors" element={<AppointmentViewForDoctors />} />
      </Routes>
    </>
  );
}

export default App;
