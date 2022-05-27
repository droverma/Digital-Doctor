import axios from "axios";
import environment from "../environment";

// const apiUrl = 'http://localhost:8080';
// const apiUrl = "http://localhost:8080/user-service";
// const apiUrl = environment.apiUrl;
const apiUrl = "https://digitaldoctor.stackroute.io/user-service"
class AuthService {
  loginDoctor(data) {
      return axios.post(`${apiUrl}/api/v1/doctor/login`, data);
  }
  loginPatient(data) {
   return axios.post(`${apiUrl}/api/v1/patient/login`, data);
  }

  registerDoctor(data) {
    return axios.post(`${apiUrl}/api/v1/doctor`, data);
  }
  registerPatient(data) {
    return axios.post(`${apiUrl}/api/v1/patient`, data);
  }
}
export default new AuthService();
