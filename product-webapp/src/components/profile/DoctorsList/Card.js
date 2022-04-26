import React from "react";
import { Col } from "react-bootstrap";
const Card = (props) => {
  // var myObjData = [];
  // let { title, description, imageUrl, newsUrl, author, date } = props;

  return (
    <>
      <Col md={4}>
        <div
          className="card border-dark mb-3"
          style={{ maxWidth: "18rem", borderRadius: "20px" }}
        >
          <div className="card-body text-dark">
            <h5 className="card-title">Info card title</h5>
            <hr />
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </Col>
    </>
  );
};
export default Card;
