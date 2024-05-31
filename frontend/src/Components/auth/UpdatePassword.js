import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Auth.css";
import register_img from "../../assets/images/register-m2.png";
import { toast } from "react-toastify";
import Constants from "../../constants"

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email, role } = location.state
    ? location.state
    : { email: null, role: null };

  const handlePasswordChange = async () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must contain at least one digit.");
      return;
    }

    if (!/[a-zA-Z]/.test(password)) {
      setError("Password must contain at least one letter.");
      return;
    }

    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    try {
      const payload = {
        email,
        role,
        password,
      };
      const response = await fetch(
        Constants.BASE_URL + "/api/user/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        toast.success("Password updated successfully.");
        // Redirect to the login page
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1500);
      } else {
        toast.error("Something went wrong, please try again.");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <div className="form">
          <h3>Update Password 🤯</h3>

          <div className="form-wrapper">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="form-control2"
              name="password"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="form-control2"
            />
          </div>

          <button type="submit" onClick={() => handlePasswordChange()}>
            Change Password
          </button>
          {error && (
            <p className="error">
              {error}
            </p>
          )}
        </div>

        <div className="image-holder">
          <div id="mini-box">
            <p style={{ padding: "1vw" }}>
              Change is the
              <br />
              way of
              <br />
              LIFE
            </p>
            <img src={register_img} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatePassword;
