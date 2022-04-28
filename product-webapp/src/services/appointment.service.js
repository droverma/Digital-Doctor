import axios from "axios";

class AppointmentService {
    getSlots() {
        return axios.get('http://localhost:3000/availableSlots');

    }
    getBookedAppointment() {
        return axios.post('api/v1/patient/appointmentSlots', {});
    }
    getDataAppointmentViewForPatients(){
        return axios.get('http://localhost:3000/appointmentsViewForPatients')
    }
    getDataAppointmentViewForDoctors(){
        return axios.get('http://localhost:3000/appointmentsViewForDoctors')
    }
    deleteDataAppointmentViewForPatients(id){
        return axios.delete('http://localhost:3000/appointmentsViewForPatients:'+id)
    }


}
export default AppointmentService;