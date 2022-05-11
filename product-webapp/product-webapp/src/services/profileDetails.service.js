import axios from "axios";

const apiUrl = 'http://localhost:8080/userservice';
class ProfileDetailsService {
  // get the profile details for doctor
  doctorProfile(doctorEmail) {
    // const emailId = "aashi@gmail.com";
    // return axios.get(`http://localhost:3000/doctors?doctorEmail=${emailId}`);
    return axios.get(`${apiUrl}/api/v1/doctor/` + doctorEmail);
  }
  // update the profile details of Doctor
  addDoctorProfile(data, userId) {
    // console.log(userId);
    // return axios.put(`http://localhost:3000/doctors/${userId}`, data);
    return axios.put(`${apiUrl}/api/v1/doctor/profile/` +userId, data);
  }
  // get the profile details for patients
  patientProfile(patientEmail) {
    // const emailId = "hemant123@gmail.com";
    // return axios.get(`http://localhost:3000/patients?patientEmail=${emailId}`);
    return axios.get(`${apiUrl}/api/v1/patient/` + patientEmail);
  }
  // update the profile details of patients
  addPatientProfile(userId, data) {
    return axios.put(`${apiUrl}/api/v1/patient/details/` + userId, data);
  }

  doctorsList(...patientData) {
    console.log(patientData[0].length);
    console.log(patientData[1].length);
    let patientCity = patientData[0];
    let specialization = patientData[1];
    let apiUrl = `${apiUrl}/api/v1/doctorcity/`+patientCity

    if (patientData[1].length) {
      apiUrl = apiUrl.concat("/"+specialization);
    }
    console.log(apiUrl);
    return axios.get(apiUrl);
  }
}
export default new ProfileDetailsService();
