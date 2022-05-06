import axios from "axios";

class AppointmentService {
    getSlots(email) {
        return axios.get('http://localhost:3000/availableSlots');
        // return axios.get('http://localhost:8060/api/v1/slot/'+email);
    }
    addSlots(data){
        return axios.post('http://localhost:3000/availableSlots',data);
    }
    getBookedAppointment(data) {
        return axios.post('api/v1/patient/appointmentSlots', {});
        // return axios.post('http://localhost:8060/api/v1/patient/appointmentSlots',data);
    }
    getDataAppointmentViewForPatients(email){
        return axios.get('http://localhost:3000/appointmentsViewForPatients')
        // return axios.get('http://localhost:8060/api/v1/appointmentSlot/'+email)
    }
    getDataAppointmentViewForDoctors(){
        return axios.get('http://localhost:3000/appointmentsViewForDoctors')
    }
    deleteDataAppointmentViewForPatients(id){
        return axios.delete('http://localhost:3000/appointmentsViewForPatients:'+id)
    }


}
export default AppointmentService;