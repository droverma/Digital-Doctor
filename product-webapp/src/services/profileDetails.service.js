import axios from "axios";

const apiUrl = "http://localhost:8080/userservice";
class ProfileDetailsService {
  // get the profile details for doctor
  doctorProfile() {
    let doctorEmail = localStorage.getItem("userEmail");
    return axios.get(`${apiUrl}/api/v1/doctor/` + doctorEmail);
  }
  doctorProfileDetails(docEmail) {
    return axios.get(`${apiUrl}/api/v1/doctor/` + docEmail);
  }
  // update the profile details of Doctor
  addDoctorProfile(data) {
    let userId = localStorage.getItem("userEmail");
    return axios.put(`${apiUrl}/api/v1/doctor/profile/` + userId, data);
  }
  // get the profile details for patients
  patientProfile() {
    let patientEmailId = localStorage.getItem("userEmail");
    return axios.get(`${apiUrl}/api/v1/patient/` + patientEmailId);
  }
  patientProfileForDoctorView(patientEmailId) {
    return axios.get(`${apiUrl}/api/v1/patient/` + patientEmailId);
  }
  // update the profile details of patients
  addPatientProfile(data) {
    let userId = localStorage.getItem("userEmail");
    return axios.put(`${apiUrl}/api/v1/patient/details/${userId}`, data);
  }

  doctorsList(...patientData) {
   let patientCity = patientData[0];
    let specialization = patientData[1];
    let apiUrls = `${apiUrl}/api/v1/doctorcity/` + patientCity;
    if (patientData[1].length) {
      apiUrls = `${apiUrl}/api/v1/doctor/${patientCity}/` + specialization;
    }
    return axios.get(apiUrls);
  }
}
export default new ProfileDetailsService();
