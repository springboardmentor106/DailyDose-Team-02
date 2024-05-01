import React from "react";
import "../App.css";
import login_img from ".././assets/images/forget-m3.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email) => {
    // Simple regex for email validation
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
    setIsEmailValid(validateEmail(emailInput));
  };

  const sendResetEmail = async () => {
    setIsSubmitted(true); // Set the submitted state to true
    try {
      const response = await fetch("http://localhost:5000/api/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
      if (data.exists) {
        setMessage("Check your email for resetting your password.");
      } else {
        setMessage(
          "Sorry, your email address does not exist. Please create a new account."
        );
      }
    } catch (error) {
      console.error("Error sending reset email:", error);
      setMessage("An error occurred while trying to send the reset email.");
    }
  };

  const handleReset = () => {
    if (isEmailValid) {
      sendResetEmail();
    }
    else{
      console.warn("invalid email address!");
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleReset}>
          <h3 style={{ textAlign: "left" }}>Reset Password 👼</h3>

          {!isSubmitted ? (
            <>
              <div className="form-wrapper">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <button type="submit" disabled={!isEmailValid}>Send OTP</button>
            </>
          ) : (
            <div>{message}</div>
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
