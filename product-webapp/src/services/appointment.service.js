import axios from "axios";

const apiUrl = 'http://localhost:8080/appointmentservice';
class AppointmentService {
    getSlots(email) {
        // return axios.get('http://localhost:3000/availableSlots');
        return axios.get("http://localhost:8080/doctor/slotDetails/" + email);
    }


    addSlots(data) {
        return axios.post('http://localhost:8080/doctor/slot', data);
        // return axios.post(`${apiUrl}/api/v1/doctor/slot`,data);
    }

    getBookedAppointment(data) {
        return axios.post('http://localhost:8081/api/v1/appointments/add', data);
        // return axios.post(`${apiUrl}/api/v1/patient/appointmentSlots`, data);
    }

    appointmentsForPatient(email) {
        return axios.get(`http://localhost:8081/api/v1/appointments/patients/${email}`)
        // return axios.get(`${apiUrl}/api/v1/appointmentSlot/patient/` + email)
    }

    appointmentsForDoctor(email) {
        return axios.get(`http://localhost:8081/api/v1/appointments/${email}`)
        // return axios.get(`${apiUrl}/api/v1/appointmentSlot/` + docEmail)
    }

    cancelApmtsForPatient(id) {
        // return axios.patch('http://localhost:3000/appointmentsViewForPatients/'+id,{"appointmentStatus": "CANCELED"})
        return axios.delete(`${apiUrl}/api/v1/user/appointment/` + id)
    }
    cancelApmtsForDoctor(id) {
        // return axios.patch('http://localhost:3000/appointmentsViewForDoctors/'+id,{"appointmentStatus": "CANCELED"})
        return axios.delete("http://localhost:8080/doctor/slot/" + id)
    }

    updateStatusForApmt(data) {
        // return axios.put(`${apiUrl}/api/v1/user/appointmentStatus`, data)
        return axios.put(`http://localhost:8081/api/v1/appointments/status`, data)
    }

    appointmentDetails(appointmentId) {
        // return axios.get(`${apiUrl}/api/v1/appointmentDetails/` + appointmentId)
        return axios.get(`http://localhost:8081/api/v1/appointmentDetails/${appointmentId}`)
    }
    appointmentBySpec(spec, activeTab) {
        // return axios.get(`${apiUrl}/api/v1/appointmentDetails/patient/` + appointmentDate)
        return axios.get(`http://localhost:8081/api/v1/appointmentBySpec/${spec}/${activeTab}`);
    }
    appointmentByDate(appointmentDate, activeTab) {
        // return axios.get(`${apiUrl}/api/v1/appointmentDetails/patient/` + appointmentDate)
        return axios.get(`http://localhost:8081/api/v1/appointmentByDate/${appointmentDate}/${activeTab}`);
    }
    appointmentByFilter(filter) {
        // return axios.get(`${apiUrl}/api/v1/appointmentDetails/patient/` + appointmentDate)
        return axios.get(`http://localhost:8081/api/v1/appointmentFilter?${filter}`);
    }
    getSlotsUsingDate(slotDate, email) {
        return axios.get("http://localhost:8080/slotDetails/doctor/" + slotDate + "/" + email)
    }
    updateSlotStatus(slotObject) {
        return axios.put("http://localhost:8080/doctor/slot/status", slotObject)
    }
    getSlotDetails(slotId) {
        return axios.get("http://localhost:8080/doctor/slot/" + slotId);
    }
}
export default new AppointmentService();