import React, { useEffect, useState } from "react";
import ProfileDetailsService from "../../../services/profileDetails.service";
import { Form, Row, Col } from "react-bootstrap";
import "../../../assets/style/style.css";
import Spinner from "../../../assets/utill/Spinner";
import Card from "./Card";

const specializationList = [
  { spV: "", spN: "Select specialization" },
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
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([]);
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
    ProfileDetailsService.patientProfile()
      .then((res) => {
        console.log(res.data);
        const patientCity = res.data.city;
        // console.log(da.password);
        console.log("details", patientCity);
        setFilterData({ ...filterData, city: patientCity });
        getDoctorsList(patientCity);
      })
      .catch((err) => console.log(err));

    console.log(filterData);
  };
  useEffect(() => {
    // console.log("useEffect");
    getPatientCity();
  }, []);

  const getDoctorsList = (patientCity) => {
    setLoading(true);
    // console.log(filterData);
    // console.log(filterData.specialization);
    ProfileDetailsService.doctorsList(patientCity, filterData.specialization)

      .then((res) => {
        // console.log(res);
        const detailsList = res.data;
        console.log("detailsList", detailsList);
        setList(detailsList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <React.Fragment>
      <Row className="mt-4 mb-4">
        <Col md={12}>
          <Form className="d-flex">
            <Form.Control
              className="areaHei fSize me-2 ms-5 hvr"
              aria-label="Search"
              type="search"
              id="city"
              name="city"
              placeholder="Search City"
              value={filterData.city}
              onChange={listChangeHandler}
              required
            />
            <Form.Select
              className="areaHei fSize me-5 ms-5 hvr"
              id="specialization"
              name="specialization"
              title="Select Your specialization"
              value={filterData.specialization}
              onChange={listChangeHandler}
              required
            >
              {specializationList.map((e) => {
                return (
                  <option key={e.spV} value={e.spV}>
                    {e.spN}
                  </option>
                );
              })}
            </Form.Select>
            <button
              className="btn btn-outline-primary areaHei fSize ms-3 me-5 hvr"
              type="button"
              onClick={searchHandler}
            >
              <i className="fas fa-search"> Search </i>
            </button>
          </Form>
        </Col>
        {/* <hr /> */}
      </Row>

      <Row style={{ margin: "0 ", justifyContent: "center" }}>
        {loading && <Spinner />}
        {!loading &&
          list.map((e, index) => {
            return (
              <Col key={index} style={{ width: "auto " }} md={3}>
                <Card
                  doctorName={e.doctorName}
                  doctorEmail={e.emailId}
                  image={e.image ? e.image : ""}
                  doctorMobileNumber={
                    e.doctorMobileNumber ? e.doctorMobileNumber : "NA"
                  }
                  specialization={e.specialization ? e.specialization : "NA"}
                  yearsOfExperience={
                    e.yearsOfExperience ? e.yearsOfExperience : "NA"
                  }
                  city={e.city ? e.city : "NA"}
                />
              </Col>
            );
          })}
      </Row>
    </React.Fragment>
  );
};
export default DoctorsList;
