import React from "react";
import "../App.css";
import login_img from ".././assets/images/forget-m3.png";
import { Link } from "react-router-dom";

const Reset = () => {
  return (
    <div className="wrapper">
      <div className="inner">
        <form>
          <h3 style={{ textAlign: "left" }}>Reset Password 👼</h3>

          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
            />
            <i className="zmdi zmdi-email"></i>
          </div>

          <button>
            Send OTP
            <i className="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="sign-in" style={{ marginTop: "5vh" }}>
            <span>
              Remember you password?
              <Link to="/"> Login</Link>
            </span>
          </div>
        </form>
        <div className="image-holder">
          <div id="mini-box">
            <p style={{ padding: "20px" }}>
              Forget <br />
              Password? <br />
            </p>
            <img src={login_img} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reset;
