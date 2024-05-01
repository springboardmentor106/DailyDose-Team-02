import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import login_img from "../assets/images/login.png";

const VerifyOTP = () => {
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const userData = location.state; // Retrieve the user data passed via state
  console.log(userData);

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // Join the OTP array into a single string
    // Combine user data and OTP into a single object
    const payload = {
      ...userData,
      enteredOTP: otpValue,
    };

    // Call the API to verify OTP and register the user
    fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // OTP is correct and user is registered
          // Redirect to a success page or perform other actions
          console.log("Registration successful");
        } else {
          alert("Incorrect OTP or registration failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Event handler to update OTP on input change
  const handleOtpChange = (e, index) => {
    if (isNaN(e.target.value)) return false; // Only numbers are allowed
    let newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    console.log(e);
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

  // Function to switch focus between OTP input fields
  const switchFocus = (e) => {
    const input = e.target;
    if (e.key === "Backspace" && input.previousElementSibling) {
      input.previousElementSibling.focus();
    } else if (e.key !== "Backspace" && input.nextElementSibling) {
      input.nextElementSibling.focus();
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3 style={{ textAlign: "center" }}>Verify OTP 👼</h3>
          <div className="otp-field">
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
                  onKeyUp={switchFocus}
                />
              );
            })}
          </div>
          <button type="submit">Verify</button>
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

export default VerifyOTP;
