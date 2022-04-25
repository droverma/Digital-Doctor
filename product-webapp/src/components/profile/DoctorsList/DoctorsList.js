import React, { useEffect, useState } from "react";
import ProfileDetailsService from "../../../services/profileDetails.service";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../../../assets/style/style.css";
import Card from "./Card";

const SpecializationList = [
  { spV: "", spN: "Select Specialization" },
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
const DoctorsList = () => {
  const [filterData, setFilterData] = useState({
    specialization: "",
    city: "",
  });

  const listChangeHandler = (e) => {
    const { name, value } = e.target;
    setFilterData({ ...filterData, [name]: value });
  };
  const searchHandler = (e) => {
    getDoctorsList(filterData.city, filterData.specialization);
  };
  const getPatientCity = () => {
    ProfileDetailsService.patientCity()
      .then((res) => {
        // console.log(res);
        const patientCity = res.data[0];
        console.log("details", patientCity);
        setFilterData({ ...filterData, city: patientCity.city });
        getDoctorsList(patientCity.city);
      })
      .catch((err) => console.log(err));
    console.log(filterData);
  };
  useEffect(() => {
    getPatientCity();
  }, []);

  const getDoctorsList = (patientsCityName) => {
    ProfileDetailsService.doctorsList(
      patientsCityName,
      filterData.specialization
    )
      .then((res) => {
        // console.log(res);
        const detailsList = res.data;
        console.log("detailsList", detailsList);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Row>
        <Col md={12}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Control
                  type="search"
                  className="areaHei fSize"
                  id="city"
                  name="city"
                  placeholder="Search City"
                  value={filterData.city}
                  onChange={listChangeHandler}
                  required
                  isInvalid=""
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the valid Name.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group>
                <Form.Select
                  className="areaHei fSize"
                  id="specialization"
                  name="specialization"
                  title="Select Your Specialization"
                  value={filterData.specialization}
                  onChange={listChangeHandler}
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
            <Col md={1}>
              <Form.Group>
                <Button
                  type="button"
                  className="areaHei fSize btn btn-primary"
                  onClick={searchHandler}
                >
                  <i className="fas fa-search"> Search </i>
                </Button>
              </Form.Group>
            </Col>
          </Row>
        </Col>
        <hr />
      </Row>

      <Row>
        {/* {list.forEach((e) => {
     return console.log(e.doctorName);
   })} */}
        <Card />
      </Row>
    </React.Fragment>
  );
};
export default DoctorsList;
