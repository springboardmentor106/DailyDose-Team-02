import React from "react";
import "./Error404.css";
import error404 from "../assets/images/error404.png";
const Error404 = () => {
  return (
    <div className="error-container">
      <div className="error-main">
        <div className="error-pic">
          {/* <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="404"
        /> */}
          <img src={error404} alt="404" />
        </div>
        <div className="error-msg">
          <h1>We are Sorry...</h1>
          <p>
            We apologize for the inconvenience. The page you are trying to
            access is currently unavailable. We are working to resolve this
            issue as quickly as possible.
          </p>
          <button>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
