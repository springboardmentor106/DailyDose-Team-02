import React from "react";
import "../App.css";
import login_img from ".././assets/images/forget-m3.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Reset = () => {
  
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [emailExist, setEmailExist] = useState(false);
  const [otp, setOtp] = useState(new Array(6).fill(""));

  
  
  
  
  // Function to check if email exists in the database
  const checkEmailExistence = async (email) => {
    try {
      const response = await fetch("/api/checkEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error("Error checking email existence:", error);
      return false;
    }
  };
  
  // Event handler to handle email validation and existence check
  const handleEmailChange = async (e) => {
    setEmail(e.target.value);
    setEmailValid(/^\S+@\S+\.\S+$/.test(e.target.value));
    if (emailValid) {
      const exists = await checkEmailExistence(e.target.value);
      setEmailExist(exists);
    } else {
      setEmailExist(false);
    }
  };
  
  // Event handler to update OTP on input change
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return false; // Only numbers are allowed
    let newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    console.log(e);
    
  };
  
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    
  };

  // Function to handle OTP paste event
  const handleOtpPaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").slice(0, 6).split("");
    if (data.length === 6 && data.every((num) => !isNaN(num))) {
      setOtp(data);
      e.target.blur();
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "left" }}>Reset Password 👼</h3>

          {emailExist ? (
            <>
              <div class="otp-field">
                {otp.map((data, index) => {
                  return (
                    <input
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleOtpChange(e, index)}
                      onPaste={handleOtpPaste}
                    />
                  );
                })}
              </div>
              <button type="submit">Verify</button>
            </>
          ) : (
            <>
              <div className="form-wrapper">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="form-control"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>

              {emailValid ? (
                <button type="submit">Send OTP</button>
              ) : (
                <p style={{ color: "red" }}>Invalid email address</p>
              )}
            </>
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
