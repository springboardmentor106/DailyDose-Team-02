import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import register_img from ".././assets/images/register-m2.png";

const UpdatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  

  const handlePasswordChange = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    try {
      // Replace with your API endpoint
      const response = await fetch(
        "http://localhost:5000/api/update-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );

      const data = await response.json();

      if (data.success) {
        // Redirect to the login page
        navigate.push("/login");
      } else {
        setError("Something went wrong, please try again.");
      }
    } catch (error) {
      setError("Something went wrong, please try again.");
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handlePasswordChange}>
          <h3>Update Password 🤯</h3>

          <div className="form-wrapper">
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="form-control"
              name="password"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password"
              className="form-control"
            />
          </div>

          <button type="submit">Change Password</button>
          {error && <p>{error}</p>}
        </form>
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
