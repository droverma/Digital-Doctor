import axios from "axios";

// const apiUrl = "http://localhost:8080/video-chat-service/api/v1/";

const apiUrl = "https://digitaldoctor.stackroute.io"

class VideoChat {
  StartMeetingID(data) {
    return axios.post(`${apiUrl}meeting`, data);
  }
  joinMeetingID(Id) {
    return axios.get(`${apiUrl}meetings/${Id}`);
  }
  chatMeeting(data) {
    return axios.post(`${apiUrl}chat`,data)
  }
  chatMeetingDetails(Id) {
    return axios.get(`${apiUrl}chats/${Id}`)
  }
}

export default new VideoChat();
