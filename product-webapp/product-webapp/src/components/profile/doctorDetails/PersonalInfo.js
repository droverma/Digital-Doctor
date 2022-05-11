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
  // console.log(updateDoctorData);
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
    setUpdateDoctorData({ ...updateDoctorData, image: fileString });
    // console.log(updateDoctorData);
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
      <Row className="outerRow ">
        <Col
          md={4}
          className=" mb-3 ms-1 imgshow"
          // style={{ border: "1px solid red" }}
        >
          {" "}
          <div className="ms-1 imgdiv">
            <img
              style={{ borderRadius: "20px" }}
              className="imgDoc"
              src="https://media2.giphy.com/media/aGDK7Pck40dZN7w1NG/giphy.gif"
              alt="doctor"
            />
          </div>
        </Col>{" "}
        <Col md={8} className="contentshow">
          <Form.Group>
            <Row className="rowMbt">
              <Col md={3} className="areaHei  contWidth">
                <Form.Label className="fSize">Full Name:</Form.Label>
              </Col>
              <Col md={9} className="areaHei colWidth">
                <Form.Control
                  type="text"
                  className=" fSize"
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
                  className=" fSize"
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
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="rowMbt">
              <Col md={3} className="areaHei contWidth">
                <Form.Label className="fSize">City :</Form.Label>
              </Col>
              <Col md={9} className="areaHei colWidth">
                <Form.Control
                  type="text"
                  className=" fSize"
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
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="rowMbt">
              <Col md={3} className="areaHei contWidth">
                <Form.Label className="fSize">Upload Your Picture :</Form.Label>
              </Col>
              <Col md={9} className="areaHei colWidth">
                <Form.Control
                  className=" fSize"
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={imageChangeHandler}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="rowMbt">
              <Col md={3} className="areaHei contWidth">
                <Form.Label className="fSize">Year's Of Experience:</Form.Label>
              </Col>
              <Col md={9} className="areaHei colWidth">
                <Form.Control
                  type="text"
                  className=" fSize"
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
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="rowMB">
              <Col md={3} className="areaHei contWidth">
                <Form.Label className="fSize">Specialization :</Form.Label>
              </Col>
              <Col md={9} className="areaHei colWidth">
                <Form.Select
                  className=" fSize"
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
              </Col>
            </Row>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default PersonalInfo;
