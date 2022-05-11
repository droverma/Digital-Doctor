import React from "react";
import "../../../assets/style/style.css";
import { useNavigate } from "react-router-dom";
const Card = (props) => {
  // const [hover, setHover] = useState(false);

  const navigate = useNavigate();
  const bookAppointmentHandler = (e, doctorEmail) => {
    e.preventDefault();
    console.log(doctorEmail);
    // navigate(`/availableSlotsPatients/${doctorEmail}`);
    navigate("/availableSlotsPatients", { state: doctorEmail });
  };
  return (
    <React.Fragment>
      <div
        className="card border-dark mt-3 mb-3  me-3"
        style={{ width: "21rem ", borderRadius: "20px" }}
      >
        <div
          className="card-body "
          style={{
            borderRadius: "20px",
            background:
              // "linear-gradient(to bottom, #004526 0%,#004526 30%, white 30%, white 100%)",

              "linear-gradient(to bottom, rgb(42, 210, 217) 0%,rgb(42, 210, 217) 30%, white 30%, white 100%)",
            // #fa8492 0 %, #fa8492 25 %, white 25%, white 50%)",
          }}
        >
          <div className="text-center mt-3">
            <p className=" chrSize">
              <img
                src={props.image}
                className="card-img-top imgView"
                alt={props.doctorName}
              />
            </p>
          </div>
          {/* <hr /> */}
          <div
            className="mb-1 mt-3"
            style={{ display: "flex", justifyContent: "center" }}
          >
            <p className="chrSize fw-bold ">Dr. {props.doctorName}</p>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span
              style={{
                display: "flex",
              }}
              className="bi bi-geo-alt-fill chrSize ms-1 me-4"
              title="City"
              aria-hidden="true"
            >
              <div className="ms-2">{props.city} </div>
            </span>
          </div>
          <div
            className="mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "flex",
              }}
              className="bi bi-plus-square-fill chrSize ms-1 me-4"
              title="Specialization"
              aria-hidden="true"
            >
              <div className="ms-2"> {props.specialization}</div>
            </span>
          </div>
          <div
            className="mb-1"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                display: "flex",
              }}
              className="bi bi-clock-history chrSize ms-1 me-4"
              title="Year's Of Experience"
              aria-hidden="true"
            >
              <div className="ms-2"> {props.yearsOfExperience} Year's</div>
            </span>
            {/* <p className="chrSize fw-bold">Year's Of Experience : </p>
            <p className="chrSize ms-2">{props.yearsOfExperience} Yr's</p> */}
          </div>
          <div className="text-center">
            <button
              className="btn btn-outline-primary chrSize"
              type="button"
              onClick={(e) => bookAppointmentHandler(e, props.doctorEmail)}
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
