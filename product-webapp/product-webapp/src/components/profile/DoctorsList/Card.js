import React from "react";
import "../../../assets/style/style.css";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  const navigate = useNavigate();
  const bookAppointmentHandler = (e) => {
    e.preventDefault();
    console.log(props.doctorEmail);
    // navigate(`/availableSlots/${props.doctorEmail}`);
  };
  return (
    <React.Fragment>
      <div
        className="card border-dark mt-3 mb-3  me-3"
        style={{ maxWidth: "23rem", borderRadius: "20px" }}
      >
        <div className="card-body ">
          <div className="text-center">
            <p className=" chrSize">
              <img
                src={props.doctorImage}
                className="card-img-top imgView"
                alt={props.doctorName}
              />
            </p>
          </div>
          <hr />
          <div
            className="mb-1"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div style={{ display: "flex" }}>
              <p className="chrSize fw-bold ms-4">Name: </p>
              <pre className="chrSize ms-2  ">
                {props.doctorName.length <= 5
                  ? `${props.doctorName
                      .replace(/^\s+|\s+$/gm, "")
                      .split(" ")[0]
                      .concat("     ")}`
                  : props.doctorName.replace(/^s+|s+$/gm, "").split(" ")[0]}
              </pre>
            </div>
            <div style={{ display: "flex" }}>
              <p className="chrSize fw-bold">City: </p>
              <p className="chrSize ms-2 me-4">{props.city}</p>
            </div>
          </div>
          <div
            className="mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p className="chrSize fw-bold">Specialization: </p>
            <p className="chrSize ms-2">{props.specialization}</p>
          </div>
          <div
            className="mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <p className="chrSize fw-bold">Year's Of Experience : </p>
            <p className="chrSize ms-2">{props.yearsOfExperience} Yr's</p>
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline-primary chrSize"
              type="button"
              onClick={bookAppointmentHandler}
            >
              Schedule appointment
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Card;
