import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import login_img from "../../assets/images/forget-m3.png";
import { toast } from "react-toastify";
import Constants from "../../constants"

const Reset = () => {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchUrl = Constants.BASE_URL + "/api/user/validate-otp";

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any existing errors
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(
        Constants.BASE_URL + "/api/user/reset-password-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, role }),
        }
      );
      const result = await response.json()
      if (response.ok) {
        toast.info("Reset password request sent successfully. Please verify OTP.");
        // Redirect to the OTP verification page
        setTimeout(() => {
          navigate("/verify-otp", { state: { email, fetchUrl, flow: 'reset', role: role } });
        }, 1500);
      } else {
        toast.error(result.message || "Failed to send reset password request.",);
      }
    } catch (error) {
      setError("There was an error sending the reset password request.");
      console.error(
        "There was an error sending the reset password request:",
        error
      );
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "left" }}>Reset Password 👼</h3>

          <div className="form-wrapper">
            <input
              type="email"
              placeholder="Email Address"
              className="form-control2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-wrapper">
            <select
              required
              name="role"
              onChange={(e) => setRole(e.target.value)}
              defaultValue={role}
              className="form-control2">
              <option value="" disabled>
                Role?
              </option>
              <option value="user">User</option>
              <option value="caretaker">Caretaker</option>
            </select>
          </div>
          <button type="submit">Send OTP</button>

          {error && (
            <div
              style={{ color: "red", textAlign: "center", marginTop: "1vh" }}>
              {error}
            </div>
          )}

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
