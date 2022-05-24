import axios from "axios";

const apiUrl = "http://localhost:8083/video-chat-service/api/v1/";
class VideoChat {
  StartMeetingID(data) {
    return axios.post(`${apiUrl}meeting`, data);
  }
  joinMeetingID(Id) {
    return axios.get(`${apiUrl}meetings/${Id}`);
  }
}

export default new VideoChat();
