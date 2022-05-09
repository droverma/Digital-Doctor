import axios from "axios";

class ProfileDetailsService {
  // get the profile details for doctor
  doctorProfile(doctorEmail) {
    const emailId = "aashi@gmail.com";
    return axios.get(`http://localhost:3000/doctors?doctorEmail=${emailId}`);
    // return axios.get('http://localhost:8080/api/v1/doctor'+ doctorEmail);
  }
  // update the profile details of Doctor
  addDoctorProfile(data, userId) {
    console.log(userId);
    return axios.post(`http://localhost:3000/doctors/${userId}`, data);
    // return axios.put('http://localhost:8080/api/v1/doctor/'+userId)
  }
  // get the profile details for patients
  patientProfile(patientEmail) {
    // const emailId = "hemant123@gmail.com";
    // return axios.get(`http://localhost:3000/patients?patientEmail=${emailId}`);
    return axios.get('http://localhost:8080/api/v1/patient/'+ patientEmail);
  }
  // update the profile details of patients
  addPatientProfile(data, userId) {
    return axios.put('http://localhost:3000/patients/'+userId, data);
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
