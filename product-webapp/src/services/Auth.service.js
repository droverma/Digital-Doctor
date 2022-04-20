import axios from "axios";

class AuthService {
    login(data) {
        return axios.post('http://localhost:8095/api/v1/user/login',data)
  
    }
    // register(data){
    //     return axios.post('http://localhost:3001/registerData',data)
    // }
    registerDoctor(data){
        return axios.post('http://localhost:8080/api/v1/doctor',data)
    }
    registerPatient(data){
        return axios.post('http://localhost:8080/api/v1/patient',data)
    }
}
export default new AuthService();