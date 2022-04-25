import React, { useState, useEffect } from "react";
import ProfileDetailsService from "../../services/profileDetails.service";
import { Form, Button, Row, Col } from "react-bootstrap";
import PersonalInfo from "./doctorDetails/PersonalInfo";
// import ClinicInfo from "./doctorDetails/ClinicInfo";
import "../../assets/style/style.css";

const DoctorProfile = () => {
  const saveChangeHandler = (e) => {
    ProfileDetailsService.addDoctorProfile(updateDoctorData, userId)
      .then((res) => console.log())
      .catch((err) => console.log(err));
    alert("FORM SUBMITTED");
    console.log(updateDoctorData);
  };
  const [userId, setUserId] = useState("");
  const [validated, setValidated] = useState({});
  // const [page, setPage] = useState(0);
  const [updateDoctorData, setUpdateDoctorData] = useState({
    doctorName: "",
    doctorMobileNumber: "",
    yearsOfExperience: "",
    specialization: "",
    doctorImage: "",
    city: "",
  });

  const getDoctorData = () => {
    ProfileDetailsService.doctorProfile()
      .then((res) => {
        console.log();
        // console.log(res);
        const da = res.data[0];
        // console.log("da", da);
        setUpdateDoctorData({
          doctorName: da.doctorName,
          doctorMobileNumber: da.doctorMobileNumber,
          yearsOfExperience: da.yearsOfExperience,
          specialization: da.specialization,
          city: da.city,
        });
        setUserId(da.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getDoctorData();
  }, []);

  const FormTitles = "Personal Info";
  const PageDisplay = () => {
    return (
      <PersonalInfo
        updateDoctorData={updateDoctorData}
        setUpdateDoctorData={setUpdateDoctorData}
        validated={validated}
        setValidated={setValidated}
      />
    );
  };

  return (
    <div className="container-fluid">
      <Form>
        <div className="form-container">
          <Row className="Title-Bar areaHei">
            <Col
              md={12}
              style={{
                border: "1px solid lightgray",
                backgroundColor: "lightblue",
                textAlign: "center",
              }}
            >
              <h1 className="fSize">{FormTitles}</h1>
            </Col>
            <hr />
          </Row>
          <Row>{PageDisplay()}</Row>

          <div
            className="mt-md-5"
            style={{ justifyContent: "end", display: "flex" }}
          >
            <Button
              style={{
                marginRight: "5px",
                height: "50px",
                width: "120px",
                borderRadius: "10px",
              }}
              disabled={Object.keys(validated).length !== 0}
              onClick={saveChangeHandler}
              className="btn btn-primary fSize"
            >
              Save
            </Button>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default DoctorProfile;
