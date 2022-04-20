import axios from "axios";

class PatientProfileService {
  patientProfile() {
    return axios.get(
      "http://localhost:3000/patients?patientEmail=hemant123@gmail.com"
    );
  }
  addPatientProfile(data) {
    return axios.post("http://localhost:3000/patients", data);
  }
}
export default new PatientProfileService();
