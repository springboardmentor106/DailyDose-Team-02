import React, { useEffect } from "react";
import "./Auth.css";
import login_img from "../../assets/images/login.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Constants from "../../constants"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate()
  const signIn = async (e) => {
    e.preventDefault();
    let item = { email, password, role };

    let result = await fetch(Constants.BASE_URL + "/api/user/login", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    result = await result.json();
    console.log(result);
    if (result.status === "success") {
      toast.success("Login Successful");
      localStorage.setItem("user-info", JSON.stringify(result));
      localStorage.setItem("token", result.token)
      localStorage.setItem("role", role)
      setTimeout(() => {
        if (role === "user") {
          navigate("/user-dash", { replace: true })
        } else {
          navigate("/care-dashboard", { replace: true })
        }
      }, 1500);
    } else {
      toast.error("Invalid Credentials");
      setEmail("");
      setPassword("");
      setRole("");
    }
  };
  // reset the state values when the component is unmounted
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      const role = localStorage.getItem("role")
      role === "user" ? navigate("/user-dash") : navigate("/care-dashboard")
    }
    return () => {
      setEmail("");
      setPassword("");
      setRole("");
    };
  }, []);

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={(e) => signIn(e)}>
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
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="form-control2"
              required
            />
          </div>

          <div className="form-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control2"
              required
            />
          </div>

          <div className="form-wrapper">
            <select
              required
              name="role"
              onChange={(e) => setRole(e.target.value)}
              value={role}
              className="form-control2">
              <option value="" disabled>
                Login as
              </option>
              <option value="user">User</option>
              <option value="caretaker">Caretaker</option>
            </select>
          </div>

          <div className="forgot-remember-container">
            <div className="remember-me-container">
              <input type="checkbox" id="remember-me-checkbox" />
              <div id="remember-me-text">Remember me</div>
            </div>
            <div className="forgot">
              <Link to="/reset">Forgot password?</Link>
            </div>
          </div>

          <button type="submit">Sign in</button>
          {/* 
          <div id="hr">OR</div>

          <div id="login-btns">
            <a href="g">
              <div
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  className="google-icon"
                  src="https://i.ibb.co/ydLySMx/google.png"
                  alt="Google"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>

            <br />

            <a href="f">
              <div
                className="logo"
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  src="https://i.ibb.co/pnpDRC6/facebook.png"
                  alt="Facebook"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>
          </div> */}

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
