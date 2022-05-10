import axios from "axios";

class AppointmentService {
    getSlots(email) {
        // return axios.get('http://localhost:3000/availableSlots');
        return axios.get('http://localhost:8080/api/v1/slot/'+email);
    }
    deleteSlots(id){
        // return axios.delete('http://localhost:3000/availableSlots/'+id);
        return axios.get('http://localhost:8080/api/v1/slot/'+id);
    }
    addSlots(data){
        // return axios.post('http://localhost:3000/availableSlots',data);
        return axios.post('http://localhost:8080/api/v1/doctor/slot',data);
    }
    getBookedAppointment(data) {
        // return axios.post('http://localhost:3000/appointmentsViewForPatients', data);
        return axios.post('http://localhost:8080/api/v1/patient/appointmentSlots',data);
    }
    bookAppointment(){
        
    }
    getDataAppointmentViewForPatients(email){
        // return axios.get('http://localhost:3000/appointmentsViewForPatients')
        return axios.get('http://localhost:8080/api/v1/appointmentSlot/'+email)
    }
    getDataAppointmentViewForDoctors(docEmail){
        // return axios.get('http://localhost:3000/appointmentsViewForDoctors')
        return axios.get('http://localhost:8080/appointmentSlot/'+docEmail)
    }
    deleteDataAppointmentViewForPatients(id){
        // return axios.patch('http://localhost:3000/appointmentsViewForPatients/'+id,{"appointmentStatus": "CANCELED"})
        return axios.patch('http://localhost:8080/appointmentSlot/patient/'+id,{"appointmentStatus": "CANCELED"})
    }
    deleteDataAppointmentViewForDoctors(id){
        // return axios.patch('http://localhost:3000/appointmentsViewForDoctors/'+id,{"appointmentStatus": "CANCELED"})
        return axios.patch('http://localhost:3000/appointmentsViewForDoctors/'+id,{"appointmentStatus": "CANCELED"})
    }


}
export default AppointmentService;