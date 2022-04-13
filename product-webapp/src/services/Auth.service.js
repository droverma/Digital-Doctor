import axios from "axios";

class AuthService {
    login() {

    }
    register(data){
        return axios.post('http://localhost:3001/patients',data)
    }
}
export default new AuthService();