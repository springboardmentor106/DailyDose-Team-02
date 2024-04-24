import React, { useState } from "react";
import "../App.css";
import register_img from ".././assets/images/register-m2.png";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

 

  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
  });

  // This is Regex pattern for email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // we are using Regex pattern for password validation
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  // handling the change event of the form fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear validation message when user starts typing
    setValidationMessages({ ...validationMessages, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newValidationMessages = {};

    // this is to Validate each field
    if (!formData.firstName) {
      newValidationMessages.firstName = "*";
    }
    if (!formData.lastName) {
      newValidationMessages.lastName = "*";
    }
    if (!formData.email) {
      newValidationMessages.email = "Please enter your email address.";
    } else if (!emailRegex.test(formData.email)) {
      newValidationMessages.email = "Please enter a valid email address.";
    }
    if (!formData.password) {
      newValidationMessages.password = "Please enter your password.";
    } else if (!passwordRegex.test(formData.password)) {
      newValidationMessages.password =
        "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.";
    }
    if (!formData.gender) {
      newValidationMessages.gender = "Please select your gender.";
    }

    // for Updation of validation messages
    setValidationMessages(newValidationMessages);

    // If there are validation errors, it will stop form submission
    if (Object.keys(newValidationMessages).length !== 0) {
      return;
    }

    // If all validations pass,  then it will proceed with form submission
    console.log("Signing up with data:", formData);
    // for Clear form data
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    });
    // for Clear validation messages
    setValidationMessages({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      gender: "",
    });

    // for Sending form data to the server
    
    console.log(formData);
    const response = await fetch("http://localhost:3000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    console.log(response);

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3>Register Now!</h3>
          <div className="form-group">
            <input
              type="text"
              placeholder="First Name"
              className="form-control"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            {validationMessages.firstName && (
              <p className="validation-message">
                {validationMessages.firstName}
              </p>
            )}
            <input
              type="text"
              placeholder="Last Name"
              className="form-control"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            {validationMessages.lastName && (
              <p className="validation-message">
                {validationMessages.lastName}
              </p>
            )}
          </div>
          <div className="form-wrapper">
            <input
              type="text"
              placeholder="Email Address"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {validationMessages.email && (
              <p className="validation-message">{validationMessages.email}</p>
            )}
          </div>
          <div className="form-wrapper">
            <select
              name="gender"
              className="form-control"
              value={formData.gender}
              onChange={handleChange}>
              <option value="" disabled selected>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {validationMessages.gender && (
              <p className="validation-message">{validationMessages.gender}</p>
            )}
          </div>
          <div className="form-wrapper">
            <input type="number" placeholder="Age" className="form-control" min={"12"} max={"80"}/>
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            {validationMessages.password && (
              <p className="validation-message">
                {validationMessages.password}
              </p>
            )}
          </div>

          <button type="submit">Sign Up</button>

          <div id="hr">OR</div>

          <div id="login-btns">
            <a href="g">
              <div
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  className="google-icon"
                  src="https://i.ibb.co/ydLySMx/google.png"
                  width={"100%"}
                  height={"100%"}
                  alt="Google"
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
                  alt=""
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>
          </div>

          <div id="sign-in">
            <span>
              Already have an account?
              <Link to="/"> Login</Link>
            </span>
          </div>
        </form>
        <div className="image-holder">
          <div id="mini-box">
            <p style={{ padding: "1vw" }}>
              Just one step
              <br />
              away from your
              <br />
              caretaker
            </p>
            <img src={register_img} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
