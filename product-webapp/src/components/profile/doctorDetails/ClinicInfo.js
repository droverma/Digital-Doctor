import React, { useState } from "react";
import { Form, Col, Row } from "react-bootstrap";
import "../../../assets/style/style.css";

const cityExpression = RegExp(/^[a-zA-Z -]+$/);
function ClinicInfo({ updateDoctorData, setUpdateDoctorData }) {
  const [validated, setValidated] = useState({});

  const doctorChangeHandler = (e) => {
    const { name, value } = e.target;
    setUpdateDoctorData({ ...updateDoctorData, [name]: value });
    switch (name) {
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

      default:
        break;
    }

    // console.log(updateDoctorData);
  };

  return (
    <div className="Clinic-info-container">
      <Row className=" mt-md-5 mb-md-5">
        <Col md={6} className=" mb-3">
          <Form.Group>
            <Form.Label className="areaHei fSize">Clinic Name:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
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
            <Form.Label className="areaHei fSize">Clinic Phone No:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
              id="clinicPhoneNo"
              name="clinicPhoneNo"
              placeholder="Enter Your Clinic Phone No"
              value={updateDoctorData.clinicPhoneNo}
              onChange={doctorChangeHandler}
            />
          </Form.Group>
        </Col>
      </Row>
      <Row className=" mt-md-5 mb-md-5">
        <Col md={6} className=" mb-3">
          <Form.Group>
            <Form.Label className="areaHei fSize">Clinic Address:</Form.Label>
            <Form.Control
              type="text"
              className="areaHei fSize"
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
      </Row>
    </div>
  );
}

export default ClinicInfo;
