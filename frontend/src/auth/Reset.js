import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import reset_img from "../assets/images/reset.png";
import bg_img from "../assets/images/login-bg.png";

const Reset = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="login_box">
          <div className="login-header">
            <span>Reset</span>
          </div>
          <div className="login-items">
          <div className="input_box">
            <input type="email" id="email" className="input-field" required />
            <label for="email" className="label">
              Email
            </label>
            <i className="bx bc-lock-alt icon"></i>
          </div>

          

          

          <div className="input_box">
            <input type="submit" value="Send OTP" className="input-submit" />
          </div>

          

          <div className="register">
            <span>
              Remember your password?
              <Link to="/"> Login</Link>
            </span>
          </div>
          </div>
        </form>
      </div>
      <div className="img-wrapper">
        <div className="img-box">
          <img src={reset_img} alt="login main" style={{objectFit: "contain"}}/>
          <img src={bg_img} alt="login background" />
        </div>
      </div>
    </div>
  )
}

export default Reset