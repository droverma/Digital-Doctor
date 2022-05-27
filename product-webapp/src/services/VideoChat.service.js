import axios from "axios";
import environment from "../environment";


// const apiUrl = "http://localhost:8080/video-chat-service/api/v1/";
  // const apiUrl = environment.apiUrl;
  const apiUrl = "https://digitaldoctor.stackroute.io/video-chat-service/api/v1/"

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
