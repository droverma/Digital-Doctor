import { Route, Routes } from 'react-router-dom';
import './App.css';
import AvailableSlotsPatients from './components/availableSlotsPatients/AvailableSlotsPatients';
import About from './components/landingPage/about/About';
import Contact from './components/landingPage/contact/Contact';
import Header from './container/header/Header';

function App() {
  return (
    <>
      <Header />
      <AvailableSlotsPatients />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
