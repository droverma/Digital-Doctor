import axios from "axios";

const apiUrl = 'https://digitaldoctor.stackroute.io';
class AuthService {

    // const apiUrl = 'http://localhost:8080';
    //actual end-points
    login(data) {
        return axios.post(`${apiUrl}/authentication/api/v1/user/login`,data)
    }
    registerDoctor(data){
        return axios.post(`${apiUrl}/userservice/api/v1/doctor`,data)
    }
    registerPatient(data){
        return axios.post(`${apiUrl}/userservice/api/v1/patient`,data)
    }

    //authentication-service end-points
    
    // registerDoctor(data) {
    //     return axios.post('http://localhost:8095/api/v1/user/register',data)
    // }
    // login(data) {
    //     return axios.post('http://localhost:8095/api/v1/user/login',data)
    // }

}
export default new AuthService();