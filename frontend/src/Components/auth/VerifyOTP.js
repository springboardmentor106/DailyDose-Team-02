import React, { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import login_img from "../../assets/images/login.png";
import { toast } from "react-toastify";

const VerifyOTP = () => {
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  // Retrieve the user data passed via state
  const { formData, fetchUrl, email, flow, role } = location.state;
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join(""); // Join the OTP array into a single string
    // Combine user data and OTP into a single object
    let payload;
    if (flow === "register") {
      console.log(formData)
      payload = {
        age: formData.age,
        email: formData.email,
        firstname: formData.firstname,
        gender: formData.gender,
        lastname: formData.lastname,
        password: formData.password,
        role: formData.role,
        enteredOtp: otpValue
      };
    } else {
      payload = {
        otp: otpValue, email
      };
    }

    // Call the API to verify OTP and register the user
    fetch(fetchUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          if (flow === "register") {
            toast.success("Registered successfully!!");
            console.log("api successful", data);
            localStorage.setItem("token", data.token)
            localStorage.setItem("role", formData.role ||role)
          } else {
            toast.info("OTP verified successfully.  Update your password.");
          }
          setTimeout(() => {
            if (flow === "register") {
              navigate(formData.role  === "user" ? "/user-dash" : "/care-dashboard", { replace: true });
            } else {
              console.log(role)
              navigate("/update-password", { state: { email: email, role: formData && formData.role ? formData.role : role} });
            }
          }, 1500);
          // OTP is correct and user is registered
          // Redirect to a success page or perform other actions
        } else {
          toast.error(data.message);
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
