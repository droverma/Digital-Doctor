import React, { useState, useEffect } from "react";
// import { Form } from "react-bootstrap";
import { Button, Col, Form, Row } from "react-bootstrap";
import PatientProfileService from "../../services/PatientProfile.service";
import "../../assets/style/style.css";
const bGrpData = [
  { bGrpKey: 1, bGrp: "None", bGrpValue: `` },
  { bGrpKey: 2, bGrp: "A+", bGrpValue: `a+` },
  { bGrpKey: 3, bGrp: "A-", bGrpValue: `a-` },
  { bGrpKey: 4, bGrp: "B+", bGrpValue: `b+` },
  { bGrpKey: 5, bGrp: "B-", bGrpValue: `b-` },
  { bGrpKey: 6, bGrp: "AB+", bGrpValue: `ab+` },
  { bGrpKey: 7, bGrp: "AB-", bGrpValue: `ab-` },
  { bGrpKey: 8, bGrp: "O+", bGrpValue: `o+` },
  { bGrpKey: 9, bGrp: "O-", bGrpValue: `o-` },
];

const emailExpresion = RegExp(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/);

const nameExpresion = RegExp(/^[a-zA-Z]+$/);
const nameExpresion2 = RegExp(/^[a-zA-Z_. ]+$/);

const heightRange = [];
let objHeight = {};
for (let hRange = 50; hRange <= 200; hRange++) {
  hRange === 50
    ? (objHeight = { hKey: hRange, hName: `None`, hvalue: 0 })
    : (objHeight = {
        hKey: hRange,
        hName: `${hRange} Cm`,
        hvalue: hRange,
      });
  heightRange.push(objHeight);
}
const weightRange = [];
let objWeight = {};
for (let wRange = 50; wRange <= 200; wRange++) {
  wRange === 50
    ? (objWeight = { wKey: wRange, wName: `None`, wValue: 0 })
    : (objWeight = {
        wKey: wRange,
        wName: `${wRange} Kg`,
        wValue: `${wRange}`,
      });
  weightRange.push(objWeight);
}

const PatientProfile = () => {
  const [validated, setValidated] = useState({});
  const [updatePatientData, setUpdatePatientData] = useState({
    patientFirstName: "",
    patientLastName: "",
    patientGender: "",
    patientImage: null,
    patientDOB: "",
    patientEmail: "",
    patientBloodGroup: "",
    patientMobileNo: "",
    patientHeight: "",
    patientWeight: "",
  });
  const clearPatientData = () => {
    setUpdatePatientData({
      patientFirstName: "",
      patientLastName: "",
      patientGender: "",
      patientImage: null,
      patientDOB: "",
      patientEmail: "",
      patientBloodGroup: "",
      patientMobileNo: "",
      patientHeight: "",
      patientWeight: "",
    });
  };

  const patientChangeHandler = (e) => {
    const { name, value } = e.target;

    setUpdatePatientData({ ...updatePatientData, [name]: value });

    switch (name) {
      case "patientFirstName":
        if (!value) {
          setValidated({ patientFirstName: "First Name Cann't Be Empty!" });
        }
        if (typeof value !== "undefined") {
          if (!nameExpresion.test(value)) {
            setValidated({
              patientFirstName: "First Name Contains Only Alphabates!",
            });
          } else if (value.length < 4) {
            setValidated({
              patientFirstName: "First Name Should Be Atleast Four Letters",
            });
          } else {
            delete validated.patientFirstName;
          }
        }
        break;

      case "patientLastName":
        if (typeof value !== "undefined") {
          if (!nameExpresion2.test(value) && value !== "") {
            setValidated({
              patientLastName:
                "Last Name Contains  Alphabates, UnderScore And Dot Only!",
            });
          } else {
            delete validated.patientLastName;
          }
        } else {
          delete validated.patientLastName;
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

      case "patientDOB":
        if (!value) {
          setValidated({ patientDOB: "Date Of Birth Cann't Be Empty!" });
        } else {
          delete validated.patientDOB;
        }
        break;
      default:
        break;
    }
  };
  const submitPatientData = (e) => {
    PatientProfileService.addPatientProfile(updatePatientData)
      .then((res) => {
        console.log();
      })
      .catch((err) => console.log(err));
  };

  const getPatientData = () => {
    PatientProfileService.patientProfile()
      .then((res) => {
        // console.log(res.data);
        const da = res.data[0];
        // console.log(da.patientImage);
        setUpdatePatientData({
          patientFirstName: da.patientFirstName,
          patientLastName: da.patientLastName,
          patientGender: da.patientGender,
          // patientImage: da.patientImage,
          patientDOB: da.patientDOB,
          patientEmail: da.patientEmail,
          patientBloodGroup: da.patientBloodGroup,
          patientMobileNo: da.patientMobileNo,
          patientHeight: da.patientHeight,
          patientWeight: da.patientWeight,
        });
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
                      id="patientLastName"
                      name="patientFirstName"
                      placeholder="Enter Your First Name"
                      isInvalid={validated.patientFirstName}
                      value={updatePatientData.patientFirstName}
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
                <Row className="mt-3">
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Last Name:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Control
                      type="text"
                      className="fSize"
                      id="patientLastName"
                      name="patientLastName"
                      placeholder="Enter Your Last Name"
                      isInvalid={validated.patientLastName}
                      value={updatePatientData.patientLastName}
                      onChange={patientChangeHandler}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Last Name.
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
                    <Form.Label className="fSize">Gender:</Form.Label>
                  </Col>
                  <Col md={3} className="areaHei">
                    <Form.Check
                      className="fSize"
                      inline
                      label="Male"
                      name="patientGender"
                      style={{ marginRight: "6px" }}
                      type={"radio"}
                      value={"male"}
                      required
                      checked={updatePatientData?.patientGender === "male"}
                    />
                  </Col>
                  <Col md={3} className="areaHei">
                    <Form.Check
                      className="fSize"
                      inline
                      label="Female"
                      name="patientGender"
                      type={"radio"}
                      value={"female"}
                      required
                      checked={updatePatientData.patientGender === "female"}
                    />
                  </Col>

                  <Col md={3} className="areaHei">
                    <Form.Check
                      className="fSize"
                      inline
                      label="Other"
                      name="patientGender"
                      type={"radio"}
                      value={"other"}
                      required
                      checked={updatePatientData.patientGender === "other"}
                    />
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
                    <Form.Label className="fSize">Date Of Birth</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Control
                      className="fSize"
                      type="date"
                      name="patientDOB"
                      placeholder="DD-MM-YYYY"
                      value={updatePatientData.patientDOB}
                      onChange={patientChangeHandler}
                      required
                      isInvalid={validated.patientDOB}
                    />

                    <Form.Control.Feedback type="invalid">
                      Please enter the valid Date Of Birth.
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
                      required
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
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Blood Group</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Select
                      className="form-control slct fSize"
                      name="patientBloodGroup"
                      id="patientBloodGroup"
                      value={updatePatientData.patientBloodGroup}
                      onChange={patientChangeHandler}
                    >
                      {bGrpData.map((e) => {
                        return (
                          <option key={e.bGrpKey} value={e.bGrpValue}>
                            {e.bGrp}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
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

          <Row className=" mt-md-5 mb-md-5">
            <Col md={6}>
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Height</Form.Label>
                  </Col>

                  <Col md={9} className="areaHei">
                    <Form.Select
                      className="form-control fSize slct"
                      id="patientHeight"
                      name="patientHeight"
                      value={updatePatientData.patientHeight}
                      onChange={patientChangeHandler}
                    >
                      {heightRange.map((e) => {
                        return (
                          <option key={e.hKey} value={e.hvalue}>
                            {e.hName}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Row>
                  <Col md={3} className="areaHei">
                    <Form.Label className="fSize">Weight:</Form.Label>
                  </Col>
                  <Col md={9} className="areaHei">
                    <Form.Select
                      className="form-control fSize slct"
                      id="patientWeight"
                      name="patientWeight"
                      value={updatePatientData.patientWeight}
                      onChange={patientChangeHandler}
                    >
                      {weightRange.map((e) => {
                        return (
                          <option key={e.wKey} value={e.wValue}>
                            {e.wName}
                          </option>
                        );
                      })}
                    </Form.Select>
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
