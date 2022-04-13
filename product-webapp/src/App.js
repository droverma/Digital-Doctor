import './App.css';
import AvailableSlotsPatients from './components/availableSlotsPatients/AvailableSlotsPatients';
import Header from './container/header/Header';

function App() {
  return (
    <div className="App">
      <header className="main-content" />
      <Header />
      <AvailableSlotsPatients />
    </div>
  );
}

export default App;
