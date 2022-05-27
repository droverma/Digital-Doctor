import axios from "axios";
import environment from "../environment";

// const apiUrl1 = "http://localhost:8080/slot-service";
// const apiUrl2 = "http://localhost:8080/appointment-service";
// const apiUrl = environment.apiUrl;
const apiUrl1 = "https://digitaldoctor.stackroute.io/slot-service";
const apiUrl2 = "https://digitaldoctor.stackroute.io/appointment-service";

class AppointmentService {
  getSlots(email) {
    return axios.get(`${apiUrl1}/doctor/slotDetails/${email}`);
  }
  addSlots(data) {
    return axios.post(`${apiUrl1}/doctor/slot`, data);
  }
  bookAppointment(data) {
    return axios.post(`${apiUrl2}/api/v1/appointments/add`, data);
  }
  cancelApmtsForPatient(id) {
    return axios.delete(`${apiUrl2}/api/v1/user/appointment/${id}`);
  }
  cancelApmtsForDoctor(id) {
    return axios.delete(`${apiUrl1}/doctor/slot/${id}`);
  }
  updateStatusForApmt(data) {
    return axios.put(`${apiUrl2}/api/v1/appointments/status`, data);
  }
  appointmentByFilter(filter) {
    return axios.get(
      `${apiUrl2}/api/v1/appointmentFilter?${filter}`
    );
  }
  getSlotsUsingDate(slotDate, email) {
    return axios.get(
      `${apiUrl1}/slotDetails/doctor/${slotDate}/${email}`
    );
  }
  updateSlotStatus(slotObject) {
    return axios.put(`${apiUrl1}/doctor/slot/status`, slotObject);
  }
  getSlotDetails(slotId) {
    return axios.get(`${apiUrl1}/doctor/slot/${slotId}`);
  }
}
export default new AppointmentService();
