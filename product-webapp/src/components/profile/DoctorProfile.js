import React, { useState, useEffect } from "react";
import ProfileDetailsService from "../../services/profileDetails.service";
import { Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PersonalInfo from "./doctorDetails/PersonalInfo";
import "../../assets/style/style.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DoctorProfile = (props) => {
  let navigate = useNavigate();

  const saveChangeHandler = (e) => {
    e.preventDefault();
    localStorage.setItem('username',updateDoctorData.doctorName)
    ProfileDetailsService.addDoctorProfile(updateDoctorData)
      .then((res) => {
        if (res) {
          toast.success("Doctors Profile Updated Submitted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            navigate("/createSlotViewDoctor");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.warn("Error updating Profile", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  const [validated, setValidated] = useState({});

  let doctorEmail = localStorage.getItem("userEmail");
  const [updateDoctorData, setUpdateDoctorData] = useState({
    emailId: doctorEmail,
    specialization: "",
    yearsOfExperience: "",
    doctorName: "",
    city: "",
    doctorMobileNumber: "",
  });

  const getDoctorData = () => {
    ProfileDetailsService.doctorProfile()
      .then((res) => {
        const da = res.data;
        setUpdateDoctorData({
          emailId: da.emailId,
          specialization: da.specialization,
          yearsOfExperience: da.yearsOfExperience,
          doctorName: da.doctorName,
          password: da.password,
          city: da.city,
          image: da.image,

          doctorMobileNumber: da.doctorMobileNumber,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.setisAuthenticated(true);
    getDoctorData();
  }, [props]);

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
    <div className="container-fluid p-0">
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
            className="mt-md-3"
            style={{ justifyContent: "end", display: "flex" }}
          >
            <button
              style={{
                marginRight: "5px",
                height: "50px",
                width: "120px",
                borderRadius: "10px",
              }}
              disabled={Object.keys(validated).length !== 0}
              onClick={saveChangeHandler}
              className="btn btn-outline-primary fSize btnSave"
            >
              Save
            </button>
          </div>
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default DoctorProfile;
