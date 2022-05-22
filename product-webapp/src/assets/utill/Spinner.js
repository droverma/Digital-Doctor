import React from "react";
import "../style/style.css";

import loding from "./Loading_icon.gif";

const Spinner = () => {
  return (
    <React.Fragment>
      <div className="text-center">
        <img className="spinLoading" src={loding} alt="" />
      </div>
    </React.Fragment>
  );
};

export default Spinner;
