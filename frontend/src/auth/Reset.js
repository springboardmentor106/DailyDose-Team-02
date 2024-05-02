import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";
import login_img from ".././assets/images/forget-m3.png";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [accountType, setAccountType] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const fetchUrl = "http://localhost:5000/api/user/validate-otp";

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
        "http://localhost:5000/api/user/reset-password-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, accountType }),
        }
      );

      if (response.ok) {
        navigate("/verify-otp", { state: { email, fetchUrl, flow: 'reset', role: accountType } });
      } else {
        setError("Failed to send reset password request.");
      }
    } catch (error) {
      setError("There was an error sending the reset password request.");
      console.error(
        "There was an error sending the reset password request:",
        error
      );
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
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-wrapper">
            <select
              required
              name="role"
              onChange={(e) => setAccountType(e.target.value)}
              defaultValue={accountType}
              className="form-control">
              <option value="" disabled>
                Register as
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
