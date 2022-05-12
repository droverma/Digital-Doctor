import axios from "axios";

const apiUrl = 'https://digitaldoctor.stackroute.io/appointmentservice';
class AppointmentService {
    getSlots(email) {
        // return axios.get('http://localhost:3000/availableSlots');
        return axios.get(`${apiUrl}/api/v1/doctor/slotDetails/`+email);
    }
    

    addSlots(data){
        // return axios.post('http://localhost:3000/availableSlots',data);
        return axios.post(`${apiUrl}/api/v1/doctor/slot`,data);
    }
    
    getBookedAppointment(data) {
        // return axios.post('http://localhost:3000/appointmentsViewForPatients', data);
        return axios.post(`${apiUrl}/api/v1/patient/appointmentSlots`,data);
    }
    bookAppointment(){
        
    }

    getDataAppointmentViewForPatients(email){
        // return axios.get('http://localhost:3001/appointmentsViewForPatients')
        return axios.get(`${apiUrl}/api/v1/appointmentSlot/patient/`+email)
    }

    getDataAppointmentViewForDoctors(docEmail){
        // return axios.get('http://localhost:3000/appointmentsViewForDoctors')
        return axios.get(`${apiUrl}/api/v1/appointmentSlot/`+docEmail)
    }

    deleteDataAppointmentViewForPatients(id){
        // return axios.patch('http://localhost:3000/appointmentsViewForPatients/'+id,{"appointmentStatus": "CANCELED"})
        return axios.delete(`${apiUrl}/api/v1/user/appointment/`+id)
    }
    deleteDataAppointmentViewForDoctors(id){
        // return axios.patch('http://localhost:3000/appointmentsViewForDoctors/'+id,{"appointmentStatus": "CANCELED"})
        return axios.delete(`${apiUrl}/api/v1/user/appointment/`+id)
    }

    updateStatus(data) {
        return axios.put(`${apiUrl}/api/v1/user/appointmentStatus`, data)
    }

    getAppointmentDetails(appointmentId) {
        return axios.get(`${apiUrl}/api/v1/appointmentDetails/`+appointmentId)
    }
    getAppointmentUsingDate(appointmentDate){
        return axios.get(`${apiUrl}/api/v1/appointmentDetails/patient/`+appointmentDate)
    }
    getSlotsUsingDate(slotDate){
        return axios.get(`${apiUrl}/api/v1/slotDetails/doctor/`+slotDate)
    }
    updateSlotStatus(slotObject){
        return axios.put(`${apiUrl}/api/v1/doctor/slot/status`, slotObject)
    }   
    getSlotDetails(slotId){
        return axios.get(`${apiUrl}/api/v1/doctor/slot/`+slotId);
    }


}
export default AppointmentService;