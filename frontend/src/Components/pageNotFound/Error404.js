import React from "react";
import "./Error404.css";
import error404 from "../../assets/images/error404.png";
import error from "../../assets/images/error.png";
import { useNavigate } from "react-router-dom";
const Error404 = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        navigate("/");
    };
  return (
    <div className="error-container">
      <div className="error-main">
        <div className="error-pic">
          <img src={error} alt="404" />
        </div>
        <div className="error-msg">
          <h1>We are Sorry...</h1>
          <p>
            We apologize for the inconvenience. The page you are trying to
            access is currently unavailable. We are working to resolve this
            issue as quickly as possible.
          </p>
          <button onClick={goToHome}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default Error404;