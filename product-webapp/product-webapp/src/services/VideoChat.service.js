import axios from "axios";

class VideoChat {
   StartMeetingID(id) {
    console.log(id);
    // return axios.post(`http://localhost:3000/doctors/`, id);
  }
  joinMeetingID() {
    // return axios.get(`http://localhost:3000/doctors/`, id);
  }
}
export default new VideoChat();
