import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
import { Button, Col, Form, Row } from "react-bootstrap";
import ProfileDetailsService from "../../services/profileDetails.service";
import "../../assets/style/style.css";
import { useNavigate } from "react-router-dom";

const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const nameExpresion = RegExp(/^[a-zA-Z_ .]+$/);
const cityExpression = RegExp(/^[a-zA-Z -]+$/);

const PatientProfile = () => {
  let navigate = useNavigate();
  const [validated, setValidated] = useState({});
  const [userId, setUserId] = useState("");
  const [updatePatientData, setUpdatePatientData] = useState({
    patientName: "",
    patientImage: null,
    patientEmail: "",
    patientMobileNo: "",
    city: "",
  });
  const clearPatientData = () => {
    setUpdatePatientData({
      patientName: "",
      patientImage: null,
      patientEmail: "",
      patientMobileNo: "",
      city: "",
    });
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

      case "patientEmail":
        if (!emailExpresion.test(value))
          setValidated({ patientEmail: "Email is invalid" });
        else {
          delete validated.patientEmail;
        }
        break;

      case "patientMobileNo":
        if (!value) {
          setValidated({
            patientMobileNo: "Mobile Number Cann't Be Empty!",
          });
        }
        if (typeof value !== "undefined") {
          var mobileNoExpresion = RegExp(/^[0-9\b]+$/);
          if (!mobileNoExpresion.test(value)) {
            setValidated({
              patientMobileNo: "Mobile Number Contains Only Digits",
            });
          } else if (value.length !== 10) {
            setValidated({
              patientMobileNo: "Mobile Number Should Be Digits",
            });
          } else {
            delete validated.patientMobileNo;
          }
        }
        break;
      default:
        break;
    }
  };
  const submitPatientData = (e) => {
    ProfileDetailsService.addPatientProfile(updatePatientData, userId)
      .then((res) => {
        console.log();
      })
      .catch((err) => console.log(err));
    navigate("/doctorslist");
  };

  const getPatientData = () => {
    ProfileDetailsService.patientProfile()
      .then((res) => {
        // console.log(res.data);
        const da = res.data[0];
        // console.log(da.patientImage);
        setUpdatePatientData({
          patientName: da.patientName,
          // patientImage: da.patientImage,
          patientEmail: da.patientEmail,
          patientMobileNo: da.patientMobileNo,
          city: da.city,
        });
        setUserId(da.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPatientData();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="container-fluid">
        <Form onSubmit={submitHandler}>
          <Row className=" mt-md-3 mb-md-5">
            <Col md={6}>
              <Form.Group>
                <Row className="mt-3">
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">First Name:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei ">
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
            </Col>

            <Col md={6}>
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Email Id :</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="patientEmail"
                      name="patientEmail"
                      placeholder="Enter Your Email Id"
                      value={updatePatientData.patientEmail}
                      onChange={patientChangeHandler}
                      readOnly
                      isInvalid={validated.patientEmail}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Email Address.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Row className=" mt-md-5 mb-md-5">
            <Col md={6}>
              <Form.Group onChange={patientChangeHandler} required>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className=" fSize">City:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
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
            </Col>
            <Col md={6}>
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">
                      Upload Your Picture:
                    </Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Control
                      className="fSize"
                      type="file"
                      id="patientImage"
                      name="patientImage"
                      accept="image/*"
                      // value={updatePatientData.patientImage}
                      onChange={patientChangeHandler}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <Row className=" mt-md-5 mb-md-5">
            <Col md={6}>
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Mobile No:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="patientMobileNo"
                      name="patientMobileNo"
                      placeholder="Enter Your Mobile No"
                      value={updatePatientData.patientMobileNo}
                      onChange={patientChangeHandler}
                      required
                      isInvalid={validated.patientMobileNo}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Mobile Number.
                    </Form.Control.Feedback>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
          </Row>

          <div
            className="mt-md-5"
            style={{ justifyContent: "end", display: "flex" }}
          >
            <Button
              disabled={Object.keys(validated).length !== 0}
              style={{
                marginRight: "10px",
                height: "50px",
                width: "120px",
                borderRadius: "10px",
              }}
              type="submit"
              className="btn btn-primary fSize"
              onClick={submitPatientData}
            >
              Save
            </Button>
            <Button
              style={{ width: "120px", borderRadius: "10px" }}
              type="reset"
              className="btn btn-danger fSize"
              onClick={clearPatientData}
            >
              Cancel
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default PatientProfile;
