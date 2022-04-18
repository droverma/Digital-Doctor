import React, { useState, useEffect } from "react";
import DoctorProfileService from "../../services/DoctorProfile.service";
// import DoctorsForm from "../DoctorProfile";
import { Form, Modal, Col, Row, Button } from "react-bootstrap";

const SpecializationList = [
  { spV: "", spN: "None" },
  { spV: "physician", spN: "Physician" },
  {
    spV: "gynecologist",
    spN: "Gynecologist",
  },
  {
    spV: "pediatrician",
    spN: "Pediatrician",
  },
  {
    spV: "orthopedician",
    spN: "Orthopedician",
  },
  {
    spV: "eye Specialist",
    spN: "Eye Specialist",
  },
  {
    spV: "psychotherapist",
    spN: "Psychotherapist",
  },
  {
    spV: "dentist",
    spN: "Dentist",
  },
  {
    spV: "neurosurgeon",
    spN: "Neurosurgeon",
  },
  {
    spV: "general Surgeon",
    spN: "General Surgeon",
  },
];

const nameExpression = RegExp(/^[a-zA-Z_ .]+$/);
const mobileNoExpression = RegExp(/^[0-9\b]+$/);
const experienceExpression = RegExp(/^[0-9\b]+$/);
const cityExpression = RegExp(/^[a-zA-Z]+$/);
const DoctorProfile = (props) => {
  const [validated, setValidated] = useState({});
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
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const doctorChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateDoctorData({ ...updateDoctorData, [name]: value });
    switch (name) {
      case "doctorName":
        if (!value) {
          setValidated({ doctorName: "Name Cann't Be Empty!" });
        }
        if (typeof value !== "undefined") {
          if (!nameExpression.test(value)) {
            setValidated({
              doctorName: "Name Contains Only Alphabates!",
            });
          } else if (value.length < 4) {
            setValidated({
              doctorName: "Name Should Be Atleast Four Letters",
            });
          } else {
            delete validated.doctorName;
          }
        }

        // if (!nameExpression.test(value))
        //   setValidated({ doctorName: "Name  is invalid" });
        // else {
        //   delete validated.doctorName;
        // }
        break;

      case "doctorMobileNumber":
        if (!mobileNoExpression.test(value))
          setValidated({ doctorMobileNumber: "Mobile No  is invalid" });
        else {
          delete validated.doctorMobileNumber;
        }
        break;

      case "yearsOfExperience":
        if (!experienceExpression.test(value))
          setValidated({ yearsOfExperience: "Mobile No  is invalid" });
        else {
          delete validated.yearsOfExperience;
        }
        break;

      case "city":
        if (!cityExpression.test(value))
          setValidated({ city: "City Name must be of Four Letters." });
        else {
          delete validated.city;
        }
        break;

      default:
        break;
    }

    // console.log(updateDoctorData);
  };

  const saveChangeHandler = (e) => {
    DoctorProfileService.addDoctorProfile(updateDoctorData)
      .then((res) => console.log())
      .catch((err) => console.log(err));
  };
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

  const clearFormHandler = () => {
    setUpdateDoctorData({
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
  };

  return (
    <>
      <div className="container-fluid">
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Full Name:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="doctorName"
                  name="doctorName"
                  placeholder="Enter Your Full Name"
                  value={updateDoctorData.doctorName}
                  onChange={doctorChangeHandler}
                  required
                  isInvalid={validated.doctorName}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter the valid Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Mobile No:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="doctorMobileNumber"
                  name="doctorMobileNumber"
                  placeholder="Enter Your Mobile No"
                  value={updateDoctorData.doctorMobileNumber}
                  onChange={doctorChangeHandler}
                  required
                  isInvalid={validated.doctorMobileNumber}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter the valid Mobile Number.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Row className="mb-3 " onChange={doctorChangeHandler}>
                  <Form.Label>Gender:</Form.Label>
                  <Col md={3}>
                    <Form.Check
                      inline
                      label="Male"
                      name="gender"
                      style={{ marginRight: "6px" }}
                      type={"radio"}
                      value={"male"}
                      required
                      checked={updateDoctorData.gender === "male"}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      inline
                      label="Female"
                      name="gender"
                      type={"radio"}
                      value={"female"}
                      required
                      checked={updateDoctorData.gender === "female"}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>

            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Upload Your Picture:</Form.Label>
                <Form.Control
                  type="file"
                  className="form-control"
                  id="doctorImage"
                  name="doctorImage"
                  accept="image/*"
                  onChange={doctorChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="col-md-6 mb-3">
              <Form.Label className="form-label">
                Year's Of Experience:
              </Form.Label>
              <Form.Control
                type="text"
                className="form-control"
                name="yearsOfExperience"
                id="yearsOfExperience"
                placeholder="Enter Your Year's Of Experience"
                value={updateDoctorData.yearsOfExperience}
                onChange={doctorChangeHandler}
                required
                isInvalid={validated.yearsOfExperience}
              />

              <Form.Control.Feedback type="invalid">
                Please enter the valid Years Of Experience.
              </Form.Control.Feedback>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label>Specialization:</Form.Label>
                <Form.Select
                  className="form-control slct"
                  id="specialization"
                  name="specialization"
                  title="Select Your Specialization"
                  value={updateDoctorData.specialization}
                  onChange={doctorChangeHandler}
                  required
                >
                  {SpecializationList.map((e) => {
                    return (
                      <option key={e.spV} value={e.spV}>
                        {e.spN}
                      </option>
                    );
                  })}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Clinic Name:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="clinicName"
                  name="clinicName"
                  placeholder="Enter Your Clinic Name"
                  value={updateDoctorData.clinicName}
                  onChange={doctorChangeHandler}
                />
              </Form.Group>
            </Col>
            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Clinic Phone No:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="clinicPhoneNo"
                  name="clinicPhoneNo"
                  placeholder="Enter Your Clinic Phone No"
                  value={updateDoctorData.clinicPhoneNo}
                  onChange={doctorChangeHandler}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>Clinic Address:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="clinicAddress"
                  name="clinicAddress"
                  placeholder="Select Your Clinic Address"
                  value={updateDoctorData.clinicAddress}
                  onChange={doctorChangeHandler}
                />
              </Form.Group>
            </Col>

            <Col md={6} className=" mb-3">
              <Form.Group>
                <Form.Label>City:</Form.Label>
                <Form.Control
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Enter Your City"
                  value={updateDoctorData.city}
                  onChange={doctorChangeHandler}
                  required
                  isInvalid={validated.city}
                />

                <Form.Control.Feedback type="invalid">
                  Please enter the Name Of Your City.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <div style={{ justifyContent: "space-between", display: "flex" }}>
            <Button
              type="reset"
              className="btn btn-danger"
              onClick={clearFormHandler}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="btn btn-primary"
              onClick={saveChangeHandler}
            >
              Save
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default DoctorProfile;
