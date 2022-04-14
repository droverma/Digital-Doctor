import axios from "axios";

class AuthService {
    login() {
        // return axios.post('http://localhost:3001/registerData',data)
  
    }
    register(data){
        return axios.post('http://localhost:3001/registerData',data)
    }
}
export default new AuthService();