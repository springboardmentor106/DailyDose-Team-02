import React from "react";
import "../App.css";
import login_img from ".././assets/images/login.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="wrapper">
      <div className="inner">
        <form>
          <h3 style={{ marginBottom: "0px", textAlign: "left" }}>
            Welcome Back 🖐
          </h3>
          <p style={{ marginTop: "0px", marginBottom: "2vw" }}>
            Experience the power of seamless caregiving at your fingertips! Log
            in today and discover how our platform can revolutionize your
            approach to senior care.
          </p>

          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
            />
            <i className="zmdi zmdi-email"></i>
          </div>

          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
            />
            <i className="zmdi zmdi-lock"></i>
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label for="remember"> Remember me</label>
            </div>
            <div className="forgot">
              <Link to="/reset">Forgot password?</Link>
            </div>
          </div>

          <button>
            Sign in
            <i className="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="hr">OR</div>

          <div id="login-btns">
            <a href="">
              <div
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  className="google-icon"
                  src="https://i.ibb.co/ydLySMx/google.png"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>

            <br />

            <a href="">
              <div
                className="logo"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  src="https://i.ibb.co/pnpDRC6/facebook.png"
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>
          </div>

          <div id="sign-in">
            <span>
              Don't have an account?
              <Link to="/register"> Sign up</Link>
            </span>
          </div>
        </form>
        <div className="image-holder">
          <div id="mini-box">
            <img src={login_img} alt="illustration" />
            <p style={{ padding: "1vw" }}>
              Log in now to discover <br />
              personalized features <br />
              tailored to your
              <br />
              loved one's <br />
              needs!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
