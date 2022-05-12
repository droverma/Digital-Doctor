import axios from "axios";

const apiUrl = "https://digitaldoctor.stackroute.io/userservice";
class ProfileDetailsService {
  // get the profile details for doctor
  doctorProfile() {
    let doctorEmail = localStorage.getItem("userEmail");
    return axios.get(`${apiUrl}/api/v1/doctor/` + doctorEmail);
  }
  doctorProfileAvailableSlots(docEmail) {
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
    console.log(patientData[0]);
    console.log(patientData[1]);
    console.log(patientData[0].length);
    console.log(patientData[1].length);
    let patientCity = patientData[0];
    let specialization = patientData[1];
    let apiUrls = `${apiUrl}/api/v1/doctorcity/` + patientCity;
    console.log(apiUrls);
    if (patientData[1].length) {
      apiUrls = `${apiUrl}/api/v1/doctor/${patientCity}/` + specialization;
    }
    console.log(apiUrls);
    return axios.get(apiUrls);
  }
}
export default new ProfileDetailsService();
