import React, { useState, useEffect } from "react";
import DoctorProfileService from "../../services/DoctorProfile.service";
import { Form, Button, Row, Col } from "react-bootstrap";
import PersonalInfo from "./doctorDetails/PersonalInfo";
import ClinicInfo from "./doctorDetails/ClinicInfo";
import "../../assets/style/style.css";

const DoctorProfile = () => {
  const saveChangeHandler = (e) => {
    if (page === FormTitles.length - 1) {
      DoctorProfileService.addDoctorProfile(updateDoctorData)
        .then((res) => console.log())
        .catch((err) => console.log(err));
      alert("FORM SUBMITTED");
      console.log(updateDoctorData);
    } else {
      setPage((currPage) => currPage + 1);
    }
  };

  const [page, setPage] = useState(0);
  const [updateDoctorData, setUpdateDoctorData] = useState({
    doctorName: "",
    doctorMobileNumber: "",
    gender: "",
    yearsOfExperience: "",
    specialization: "",
    doctorImage: "",
    clinicName: "",
    clinicPhoneNo: "",
    clinicAddress: "",
    city: "",
  });

  const getDoctorData = () => {
    DoctorProfileService.doctorProfile()
      .then((res) => {
        console.log();
        const da = res.data[0];
        // console.log("da", da);
        setUpdateDoctorData({
          doctorName: da.doctorName,
          doctorMobileNumber: da.doctorMobileNumber,
          gender: da.gender,
          yearsOfExperience: da.yearsOfExperience,
          specialization: da.specialization,
          // doctorImage: da.doctorImage,
          clinicName: da.clinicName,
          clinicPhoneNo: da.clinicPhoneNo,
          clinicAddress: da.clinicAddress,
          city: da.city,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const FormTitles = ["Personal Info", "Clinic Info"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <PersonalInfo
          updateDoctorData={updateDoctorData}
          setUpdateDoctorData={setUpdateDoctorData}
        />
      );
    } else {
      return (
        <ClinicInfo
          updateDoctorData={updateDoctorData}
          setUpdateDoctorData={setUpdateDoctorData}
        />
      );
    }
  };

  return (
    <div className="container-fluid">
      <Form>
        <div className="form-container">
          <Row className="Title-Bar areaHei">
            <Col
              md={6}
              style={{
                border: `${page === 0 ? "1px solid lightgray" : ""}`,
                backgroundColor: `${page === 0 ? "lightblue" : ""}`,
                textAlign: "center",
              }}
            >
              <h1 className="fSize">{FormTitles[0]}</h1>
            </Col>
            <Col
              md={6}
              style={{
                border: `${page === 1 ? "1px solid lightgray" : ""}`,
                backgroundColor: `${page === 1 ? "lightblue" : ""}`,
                textAlign: "center",
              }}
            >
              <h1 className="fSize">{FormTitles[1]}</h1>
            </Col>
            <hr />
          </Row>
          <div>{PageDisplay()}</div>

          <div
            className="mt-md-5"
            style={{ justifyContent: "end", display: "flex" }}
          >
            <Button
              style={{
                marginRight: "15px",
                width: "120px",
                borderRadius: "10px",
              }}
              className={`btn btn-primary fSize ${
                page === 0 ? "btn btn-secondary fSize" : ""
              }`}
              disabled={page === 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </Button>
            <Button
              style={{
                marginRight: "5px",
                height: "50px",
                width: "120px",
                borderRadius: "10px",
              }}
              onClick={saveChangeHandler}
              className="btn btn-primary fSize"
            >
              {page === FormTitles.length - 1 ? "Save" : "Next"}
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DoctorProfile;
