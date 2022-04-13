import React, { useState } from "react";

const PatientProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [emailId, setEmailId] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [mobileNo, setMobileNo] = useState("");
  const [inputHeight, setInputHeight] = useState("");
  const [inputWeight, setInputWeight] = useState("");

  const firstNameChangeHandler = (e) => {
    console.log(e.target.value);
    setFirstName(e.target.value);
  };
  const lastNameChangeHandler = (e) => {
    console.log(e.target.value);
    setLastName(e.target.value);
  };
  const genderChangeHandler = (e) => {
    console.log(e.target.value);
    setGender(e.target.value);
  };

  const imageChangeHandler = (e) => {
    console.log(e.target.value);
    setProfileImage(e.target.value);
  };

  const dobChangeHandler = (e) => {
    console.log(e.target.value);
    setDateOfBirth(e.target.value);
  };

  const emailChangeHandler = (e) => {
    console.log(e.target.value);
    setEmailId(e.target.value);
  };

  const bloodGroupChangeHandler = (e) => {
    console.log(e.target.value);
    setBloodGroup(e.target.value);
  };

  const mobileNoChangeHandler = (e) => {
    console.log(e.target.value);
    setMobileNo(e.target.value);
  };

  const inputHeightChangeHandler = (e) => {
    console.log(e.target.value);
    setInputHeight(e.target.value);
  };

  const inputWeightChangeHandler = (e) => {
    console.log(e.target.value);
    setInputWeight(e.target.value);
  };
  return (
    <>
      <form>
        <div className="mb-3">
          <label className="form-label">First Name:</label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            placeholder="Enter Your Full Name"
            value={firstName}
            onChange={firstNameChangeHandler}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Last Name:</label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            placeholder="Enter Your Full Name"
            value={lastName}
            onChange={lastNameChangeHandler}
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
          <label className="form-label">Date Of Birth:</label>
          <input
            type="text"
            className="form-control"
            id="dateOfBirth"
            placeholder="Enter Your Password"
            value={dateOfBirth}
            onChange={dobChangeHandler}
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
          <label className="form-label">Blood Group:</label>
          <input
            type="text"
            className="form-control"
            id="bloodGroup"
            placeholder="Choose Your Blood Group"
            value={bloodGroup}
            onChange={bloodGroupChangeHandler}
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
          <label className="form-label">Height:</label>
          <input
            type="text"
            className="form-control"
            id=" inputHeight"
            placeholder="Choose Your Height"
            value={inputHeight}
            onChange={inputHeightChangeHandler}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Clinic Name:</label>
          <input
            type="text"
            className="form-control"
            id="inputWeight"
            placeholder="Choose Your Weight"
            value={inputWeight}
            onChange={inputWeightChangeHandler}
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

export default PatientProfile;
