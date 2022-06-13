import axios from "axios";

class AppointmentService {
    getSlots() {
        return axios.get('http://localhost:3000/availableSlots');

    }
    getBookedAppointment() {
        return axios.post('api/v1/patient/appointmentSlots', {});
    }


}
export default AppointmentService;