import axios from "axios";

class ProfileDetailsService {
  // get the profile details for doctor
  doctorProfile() {
    const emailId = "aashi@gmail.com";
    return axios.get(`http://localhost:3000/doctors?doctorEmail=${emailId}`);
  }
  // update the profile details of Doctor
  addDoctorProfile(data, userId) {
    console.log(userId);
    return axios.post(`http://localhost:3000/doctors/${userId}`, data);
  }
  // get the profile details for patients
  patientProfile() {
    const emailId = "hemant123@gmail.com";
    return axios.get(`http://localhost:3000/patients?patientEmail=${emailId}`);
  }
  // update the profile details of patients
  addPatientProfile(data, userId) {
    return axios.put(`http://localhost:3000/patients/${userId}`, data);
  }

  patientCity() {
    const emailId = "hemant123@gmail.com";
    return axios.get(`http://localhost:3000/patients?patientEmail=${emailId}`);
  }

  doctorsList(...patientData) {
    // const city = "";

    console.log(patientData[0].length);
    console.log(patientData[1].length);
    let apiUrl = `http://localhost:3000/doctors?city=${patientData[0]}`;

    if (patientData[1].length) {
      apiUrl = apiUrl.concat(`&specialization=${patientData[1]}`);
    }

    console.log(apiUrl);

    return axios.get(apiUrl);
  }
}
export default new ProfileDetailsService();
