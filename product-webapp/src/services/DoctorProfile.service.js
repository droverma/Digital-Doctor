import axios from "axios";

class DoctorProfileService {
  doctorProfile() {
    return axios.get(
      "http://localhost:3000/doctors?doctorMobileNumber=8687632876"
    );
  }
  addDoctorProfile(data) {
    return axios.post("http://localhost:3000/doctors", data);
  }
}
export default new DoctorProfileService();
