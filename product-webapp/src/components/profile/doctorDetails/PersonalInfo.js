import React from "react";
import { Form, Col, Row } from "react-bootstrap";
import "../../../assets/style/style.css";

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
const cityExpression = RegExp(/^[a-zA-Z -]+$/);
function PersonalInfo({
  updateDoctorData,
  setUpdateDoctorData,
  validated,
  setValidated,
}) {
  // const [validated, setValidated] = useState({});

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
        break;

      case "doctorMobileNumber":
        if (!value) {
          setValidated({
            doctorMobileNumber: "Mobile Number Cann't Be Empty!",
          });
        }
        if (typeof value !== "undefined") {
          if (!mobileNoExpression.test(value)) {
            setValidated({
              doctorMobileNumber: "Mobile Number Contains Only Digits",
            });
          } else if (value.length !== 10) {
            setValidated({
              doctorMobileNumber: "Mobile Number Should Be 10 Digits",
            });
          } else {
            delete validated.doctorMobileNumber;
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

      case "yearsOfExperience":
        if (!value) {
          setValidated({
            yearsOfExperience: "Years Of Experience  Cann't Be Empty!",
          });
        }
        if (typeof value !== "undefined") {
          if (!experienceExpression.test(value)) {
            setValidated({
              yearsOfExperience: "Years Of Experience Contains Only Digits",
            });
          } else if (
            value.length > 2 ||
            value.length <= 0 ||
            value === "0" ||
            value === "00"
          ) {
            setValidated({
              yearsOfExperience: "Years Of Experiencer Should Be 2 Digits",
            });
          } else {
            delete validated.yearsOfExperience;
          }
        }
        break;

      default:
        break;
    }

    // console.log(updateDoctorData);
  };
  return (
    <div className="Personal-Info-container">
      <Row className=" mt-md-5 mb-md-5">
        <Col md={6} className=" mb-3">
          <Form.Group>
            <Form.Label className="areaHei fSize">Full Name:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
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
            <Form.Label className="areaHei fSize">Mobile No:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
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

      <Row className=" mt-md-5 mb-md-5">
        <Col md={6} className=" mb-3">
          <Form.Group>
            <Form.Label className="areaHei fSize">City:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
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
        <Col md={6} className=" mb-3">
          <Form.Group>
            <Form.Label className="areaHei fSize">
              Upload Your Picture:
            </Form.Label>
            <Form.Control
              className="areaHei fSize"
              type="file"
              id="doctorImage"
              name="doctorImage"
              accept="image/*"
              onChange={doctorChangeHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className=" mt-md-5 mb-md-5">
        <Col md={6} className="col-md-6 mb-3">
          <Form.Label className="areaHei fSize">
            Year's Of Experience:
          </Form.Label>
          <Form.Control
            type="text"
            className="areaHei fSize"
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
            <Form.Label className="areaHei fSize">Specialization:</Form.Label>
            <Form.Select
              className="areaHei fSize"
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
    </div>
  );
}

export default PersonalInfo;
