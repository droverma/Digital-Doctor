import axios from "axios";

// const apiUrl = "http://localhost:8080/slot-service";
// const apiUrl = "http://localhost:8080/appointment-service";
const apiUrl = "https://digitaldoctor.stackroute.io"

class AppointmentService {
  getSlots(email) {
   return axios.get(`${apiUrl}/doctor/slotDetails/${email}`);
  }

  addSlots(data) {
    return axios.post(`${apiUrl}/doctor/slot`, data);
  }

  bookAppointment(data) {
    return axios.post(`${apiUrl}/api/v1/appointments/add`, data);
}


  cancelApmtsForPatient(id) {
    return axios.delete(`${apiUrl}/api/v1/user/appointment/${id}`);
  }
  cancelApmtsForDoctor(id) {
    return axios.delete(`${apiUrl}/doctor/slot/${id}`);
  }

  updateStatusForApmt(data) {
    return axios.put(`${apiUrl}/api/v1/appointments/status`, data);
  }

  appointmentByFilter(filter) {
    return axios.get(
      `${apiUrl}/api/v1/appointmentFilter?${filter}`
    );
  }
  getSlotsUsingDate(slotDate, email) {
    return axios.get(
      `${apiUrl}/slotDetails/doctor/${slotDate}/${email}`
    );
  }
  updateSlotStatus(slotObject) {
    return axios.put(`${apiUrl}/doctor/slot/status`, slotObject);
  }
  getSlotDetails(slotId) {
    return axios.get(`${apiUrl}/doctor/slot/${slotId}`);
  }
}
export default new AppointmentService();
