import axios from "axios";

class AuthService {
    login() {
        // return axios.post('http://localhost:3001/registerData',data)
  
    }
    // register(data){
    //     return axios.post('http://localhost:3001/registerData',data)
    // }

    register(data){
        return axios.post('http://localhost:8080/api/v1/doctor', data);
    }
}
export default new AuthService();