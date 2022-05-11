import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
import { Col, Form, Row } from "react-bootstrap";
import ProfileDetailsService from "../../services/profileDetails.service";
import "../../assets/style/style.css";
import { useNavigate } from "react-router-dom";

const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const nameExpresion = RegExp(/^[a-zA-Z_ .]+$/);
const cityExpression = RegExp(/^[a-zA-Z -]+$/);

const PatientProfile = (props) => {
  let navigate = useNavigate();
  const [validated, setValidated] = useState({});
  let patientEmailId = localStorage.getItem("userEmail");

  const [updatePatientData, setUpdatePatientData] = useState({
    emailId: patientEmailId,
    patientName: "",
    patientMobileNumber: "",
    city: "",
    patientImage: "",
  });

  const clearPatientData = () => {
    setUpdatePatientData({
      patientName: "",
      patientImage: "",
      emailId: "",
      patientMobileNumber: "",
      city: "",
    });
  };

  const imageChangeHandler = (e) => {
    const files = e.target.files;
    const file = files[0];
    getBase64(file);
  };

  const getBase64 = (file) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      onLoad(reader.result);
    };
  };

  const onLoad = (fileString) => {
    // console.log(fileString);
    setUpdatePatientData({ ...updatePatientData, patientImage: fileString });
    // console.log(updatePatientData);
  };

  const patientChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdatePatientData({ ...updatePatientData, [name]: value });

    switch (name) {
      case "patientName":
        if (!value) {
          setValidated({ patientName: "First Name Cann't Be Empty!" });
        }
        if (typeof value !== "undefined") {
          if (!nameExpresion.test(value)) {
            setValidated({
              patientName: "First Name Contains Only Alphabates!",
            });
          } else if (value.length < 4) {
            setValidated({
              patientName: "First Name Should Be Atleast Four Letters",
            });
          } else {
            delete validated.patientName;
          }
        }
        break;
      case "city":
        if (!value) {
          setValidated({ city: "City Name Cann't Be Empty!" });
        }
        if (typeof value !== "undefined") {
          if (!cityExpression.test(value)) {
            setValidated({
              city: "City Name Contains Only Alphabates!",
            });
          } else if (value.length < 4) {
            setValidated({
              city: "City Name Should Be Atleast Four Letters",
            });
          } else {
            delete validated.city;
          }
        }
        break;

      case "emailId":
        if (!emailExpresion.test(value))
          setValidated({ emailId: "Email is invalid" });
        else {
          delete validated.emailId;
        }
        break;

      case "patientMobileNumber":
        if (!value) {
          setValidated({
            patientMobileNumber: "Mobile Number Cann't Be Empty!",
          });
        }
        if (typeof value !== "undefined") {
          var mobileNoExpresion = RegExp(/^[0-9\b]+$/);
          if (!mobileNoExpresion.test(value)) {
            setValidated({
              patientMobileNumber: "Mobile Number Contains Only Digits",
            });
          } else if (value.length !== 10) {
            setValidated({
              patientMobileNumber: "Mobile Number Should Be Digits",
            });
          } else {
            delete validated.patientMobileNumber;
          }
        }
        break;
      default:
        break;
    }
  };
  const submitPatientData = (e) => {
    setTimeout(() => {
      console.log(updatePatientData);
      ProfileDetailsService.addPatientProfile(updatePatientData)
        .then((res) => {
          console.log();
        })
        .catch((err) => console.log(err));
      alert("Patient's Profile Update Submitted");
      navigate("/doctorslist");
    }, 1000);
  };

  const getPatientData = () => {
    ProfileDetailsService.patientProfile()
      .then((res) => {
        // console.log(res.data);
        const da = res.data;
        // console.log(da.password);
        setUpdatePatientData({
          emailId: da.emailId,
          patientName: da.patientName,
          patientMobileNumber: da.patientMobileNumber,
          password: da.password,
          city: da.city,
          patientImage: da.patientImage,
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    props.setisAuthenticated(true);
    getPatientData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <Form onSubmit={submitHandler}>
          <Row className="outerRow">
            <Col md={4} className=" mb-3 ms-1 imgshow">
              {" "}
              <div className="ms-1 imgdiv">
                <img
                  style={{ borderRadius: "20px" }}
                  className="docImgSize"
                  src="https://media2.giphy.com/media/A9MftKr3J3lra/giphy.gif"
                  alt="doctor"
                />
              </div>
            </Col>
            <Col md={8} className="contentshow">
              <Form.Group>
                <Row className="rowMbt">
                  <Col md={3} className="areaHei contWidth">
                    <Form.Label className="fSize">First Name:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei colWidth">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="patientName"
                      name="patientName"
                      placeholder="Enter Your  Name"
                      isInvalid={validated.patientName}
                      value={updatePatientData.patientName}
                      onChange={patientChangeHandler}
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the valid First Name.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row className="rowMbt">
                  <Col md={3} className="areaHei contWidth">
                    <Form.Label className="fSize">Email Id :</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei colWidth">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="emailId"
                      name="emailId"
                      placeholder="Enter Your Email Id"
                      value={updatePatientData.emailId}
                      onChange={patientChangeHandler}
                      readOnly
                      isInvalid={validated.emailId}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Email Address.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group onChange={patientChangeHandler} required>
                <Row className="rowMbt">
                  <Col md={3} className="areaHei contWidth">
                    <Form.Label className=" fSize">City:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei colWidth">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="city"
                      name="city"
                      placeholder="Enter Your City"
                      value={updatePatientData.city}
                      onChange={patientChangeHandler}
                      required
                      isInvalid={validated.city}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please enter the valid City Name.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group>
                <Row className="rowMbt">
                  <Col md={3} className="areaHei contWidth">
                    <Form.Label className="fSize">
                      Upload Your Picture:
                    </Form.Label>
                  </Col>
                  <Col md={9} className="areaHei colWidth">
                    <Form.Control
                      className="fSize"
                      type="file"
                      id="patientImage"
                      name="patientImage"
                      accept="image/*"
                      // value={updatePatientData.patientImage}
                      onChange={imageChangeHandler}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group>
                <Row className="rowMbt">
                  <Col md={3} className="areaHei contWidth">
                    <Form.Label className="fSize">Mobile No:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei colWidth">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="patientMobileNumber"
                      name="patientMobileNumber"
                      placeholder="Enter Your Mobile No"
                      value={updatePatientData.patientMobileNumber}
                      onChange={patientChangeHandler}
                      required
                      isInvalid={validated.patientMobileNumber}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Mobile Number.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <div style={{ justifyContent: "end", display: "flex" }}>
            <button
              disabled={Object.keys(validated).length !== 0}
              style={{
                marginRight: "10px",
                height: "50px",
                width: "120px",
                borderRadius: "10px",
              }}
              type="submit"
              className="btn btn-outline-primary fSize "
              onClick={submitPatientData}
            >
              Save
            </button>
            <button
              style={{ width: "120px", borderRadius: "10px" }}
              type="reset"
              className="btn btn-outline-danger fSize btnSave"
              onClick={clearPatientData}
            >
              Cancel
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PatientProfile;
