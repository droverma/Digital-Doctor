import axios from "axios";

class AuthService {
    //actual end-points
    // login(data) {
    //     return axios.post('http://localhost:8095/api/v1/user/login',data)
    // }
    // registerDoctor(data){
    //     return axios.post('http://localhost:8080/api/v1/doctor',data)
    // }
    // registerPatient(data){
    //     return axios.post('http://localhost:8080/api/v1/patient',data)
    // }

    //authentication-service end-points
    
    registerDoctor(data) {
        return axios.post('http://localhost:8095/api/v1/user/register',data)
    }
    login(data) {
        return axios.post('http://localhost:8095/api/v1/user/login',data)
    }

}
export default new AuthService();