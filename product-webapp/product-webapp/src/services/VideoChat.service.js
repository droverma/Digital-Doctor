import axios from "axios";

const apiUrl = 'http://localhost:8080/appointmentservice';

class VideoChat {
  
   StartMeetingID(data) {
    console.log(data);
    // return axios.post(`http://localhost:3000/doctors/`, data);
    return axios.post(`${apiUrl}/api/v1/meeting`,data);
  }
  joinMeetingID() {
    // return axios.get(`http://localhost:3000/doctors/`, id);
  }
}
export default new VideoChat();
