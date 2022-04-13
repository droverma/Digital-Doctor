import React, { useState } from "react";

const DoctorProfile = () => {
  const [fullName, setFullName] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  // const [gender, setGender] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [image, setImage] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [clinicPhoneNo, setClinicPhoneNo] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [city, setCity] = useState("");

  const nameChangeHandler = (e) => {
    console.log(e.target.value);
    setFullName(e.target.value);
  };
  const mobileNoChangeHandler = (e) => {
    console.log(e.target.value);
    setMobileNo(e.target.value);
  };
  const emailChangeHandler = (e) => {
    console.log(e.target.value);
    setEmailId(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };
  const yearsOfExperienceChangeHandler = (e) => {
    console.log(e.target.value);
    setYearsOfExperience(e.target.value);
  };
  const SpecializationChangeHandler = (e) => {
    console.log(e.target.value);
    setYearsOfExperience(e.target.value);
  };

  const imageChangeHandler = (e) => {
    console.log(e.target.value);
    setImage(e.target.value);
  };
  const clinicNameChangeHandler = (e) => {
    console.log(e.target.value);
    setClinicName(e.target.value);
  };
  const clinicPhoneNoChangeHandler = (e) => {
    console.log(e.target.value);
    setClinicPhoneNo(e.target.value);
  };
  const clinicAddressChangeHandler = (e) => {
    console.log(e.target.value);
    setClinicAddress(e.target.value);
  };
  const cityChangeHandler = (e) => {
    console.log(e.target.value);
    setCity(e.target.value);
  };

  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label">Full Name:</label>
          <input
            type="text"
            className="form-control"
            id="inputName"
            placeholder="Enter Your Full Name"
            value={fullName}
            onChange={nameChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mobile No:</label>
          <input
            type="text"
            className="form-control"
            id="inputMobileNo"
            placeholder="Enter Your Mobile No"
            value={mobileNo}
            onChange={mobileNoChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email Address:</label>
          <input
            type="email"
            className="form-control"
            id="inputEmail"
            placeholder="Enter Your Email Id"
            value={emailId}
            onChange={emailChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={passwordChangeHandler}
          />
        </div>
        {/* <div>
          <form.Group className="mb-3 row">
            <label className="form-label">Gender:</label>
            <div className="col-md-3">
              {" "}
              <form.Check inline label="Male" name="gender" type={"radio"} />
            </div>
            <div className="col-md-3">
              <form.Check inline label="Female" name="gender" type={"radio"} />
            </div>
          </form.Group>
        </div> */}
        <div className="mb-3">
          <label className="form-label">Year's Of Experience:</label>
          <input
            type="text"
            className="form-control"
            id="yearsOfExperience"
            placeholder="Enter Your yearsOfExperience"
            value={yearsOfExperience}
            onChange={yearsOfExperienceChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Specialization:</label>
          <input
            type="text"
            className="form-control"
            id="specialization"
            placeholder="Select Your Specialization"
            value={specialization}
            onChange={SpecializationChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Upload Your Picture:</label>
          <input
            type="file"
            className="form-control"
            id="inagedata"
            accept="image/*"
            onChange={imageChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Clinic Name:</label>
          <input
            type="text"
            className="form-control"
            id="clinicName"
            placeholder="Enter Your Clinic Name"
            value={clinicName}
            onChange={clinicNameChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Clinic Phone No:</label>
          <input
            type="text"
            className="form-control"
            id="clinicPhoneNo"
            placeholder="Enter Your Clinic Phone No"
            value={clinicPhoneNo}
            onChange={clinicPhoneNoChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Clinic Address:</label>
          <input
            type="text"
            className="form-control"
            id="clinicAddress"
            placeholder="Select Your Clinic Address"
            value={clinicAddress}
            onChange={clinicAddressChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">City:</label>
          <input
            type="text"
            className="form-control"
            id="city"
            placeholder="Enter Your City"
            value={city}
            onChange={cityChangeHandler}
          />
        </div>
        {/* <div style={{ justifyContent: "space-between", display: "flex" }}>
          <button type="submit" className="btn btn-primary">
            Sugn-Up
          </button>
          <button type="reset" className="btn btn-danger">
            Cancel
          </button>
        </div> */}
      </form>
    </>
  );
};

export default DoctorProfile;

// "": "aashi@gmail.com",
// "": 9877654210,
// "": "Aashi Bansal",

// "specialization": "Phyisican",
// "yearsOfExperience": 2,

// "gender": "F",
// "password": "123456",
// "city": "Noida",
// "doctorImage": "https://thumbs.dreamstime.com/b/smiling-female-doctor-holding-medical-records-lab-coat-her-office-clipboard-looking-camera-56673035.jpg",
// "dob": "1998-09-12",
// "clinicName": "",
// "clinicNumber": 90909090,
// "clinicAddress": "Noida"
