import axios from "axios";

// const apiUrl = 'http://localhost:8080';
const apiUrl = "http://localhost:8888";
class AuthService {
  // const apiUrl = 'http://localhost:8080';
  //actual end-points
  loginDoctor(data) {
    console.log(data);

    return axios.post(`${apiUrl}/api/v1/doctor/login`, data);
  }
  loginPatient(data) {
    console.log(data);
    return axios.post(`${apiUrl}/api/v1/patient/login`, data);
  }
  //login(data) {
  // return axios.post(`${apiUrl}/authentication/api/v1/user/login`, data);
  // }
  registerDoctor(data) {
    return axios.post(`${apiUrl}/api/v1/doctor`, data);
  }
  registerPatient(data) {
    return axios.post(`${apiUrl}/api/v1/patient`, data);
  }

  //   registerDoctor(data) {
  //     return axios.post(`${apiUrl}/userservice/api/v1/doctor`, data);
  //   }
  //   registerPatient(data) {
  //     return axios.post(`${apiUrl}/userservice/api/v1/patient`, data);
  //   }

  //authentication-service end-points

  // registerDoctor(data) {
  //     return axios.post('http://localhost:8095/api/v1/user/register',data)
  // }
  // login(data) {
  //     return axios.post('http://localhost:8095/api/v1/user/login',data)
  // }
}
export default new AuthService();
