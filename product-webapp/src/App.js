import { Route, Routes } from "react-router-dom";
import "./App.css";
import AvailableSlotsPatients from "./components/availableSlotsPatients/AvailableSlotsPatients";
import About from "./components/landingPage/about/About";
import Contact from "./components/landingPage/contact/Contact";
import Header from "./container/header/Header";
import DoctorProfile from "./components/update/DoctorProfile";
import PatientProfile from "./components/update/PatientProfile";

function App() {
  return (
    <>
      <Header />
      <AvailableSlotsPatients />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/updatedoctor" element={<DoctorProfile />} />
        <Route path="/updatepatient" element={<PatientProfile />} />
      </Routes>
    </>
  );
}

export default App;
