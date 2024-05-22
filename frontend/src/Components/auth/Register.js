import React, { useState } from "react";
import "./Auth.css";
import register_img from "../../assets/images/register-m2.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Constants from "../../constants";
const validateEmail = (email) => {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email.toLowerCase());
};
const validatePassword = (password) => {
  // at least one number, one lowercase and one uppercase letter
  // and at least 8 or more characters
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return re.test(password);
};

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
    role: "",
    age: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validation checks
    let tempErrors = {};
    // if (!formData.firstName) tempErrors.firstName = "First name is required";
    // if (!formData.lastName) tempErrors.lastName = "Last name is required";
    // if (!validateEmail(formData.email))
    //   tempErrors.email = "Invalid email address";
    // if (!formData.gender) tempErrors.gender = "Gender is required";
    // if (isNaN(formData.age) || formData.age < 18 || formData.age > 100)
    //   tempErrors.age = "Must lie between 18 and 100";
    // if (!validatePassword(formData.password))
    //   tempErrors.password = "Password does not meet criteria";
    if (formData.password !== formData.confirmPassword) {
      tempErrors.confirmPassword = "Passwords do not match";
      toast.error("Passwords do not match");
    }
    const fetchUrl = Constants.BASE_URL + "/api/user/register";
    setErrors(tempErrors);
    console.log(JSON.stringify({ email: formData.email, role: formData.role }))
    if (Object.keys(tempErrors).length === 0) {
      // making API call to send the OTP
      fetch(Constants.BASE_URL + "/api/user/new-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: formData.email }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            toast.info("Please Verify your account");
            // Redirect to OTP verification route with state
            setTimeout(() => {
              navigate("/verify-otp", {
                state: { formData, fetchUrl, flow: "register" },
              });
            }, 1500);
          } else {
            // Handle errors, e.g., display a message to the user
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={handleSubmit}>
          <h3>Register Now!</h3>
          <div className="form-group">
            <input
              type="text"
              name="firstname"
              // value={firstname}
              onChange={handleChange}
              placeholder="First Name"
              className="form-control2"
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
            <input
              type="text"
              name="lastname"
              // value={lastname}
              onChange={handleChange}
              placeholder="Last Name"
              className="form-control2"
              required
            />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div className="form-wrapper">
            <input
              type="email"
              name="email"
              // value={email}
              onChange={handleChange}
              placeholder="Email Address"
              className="form-control2"
              required
            />
          </div>
          <div className="form-wrapper">
            <select
              required
              name="gender"
              onChange={handleChange}
              defaultValue={formData.gender}
              className="form-control2">
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-wrapper">
            <select
              required
              name="role"
              onChange={handleChange}
              defaultValue={formData.role}
              className="form-control2">
              <option value="" disabled>
                Register as
              </option>
              <option value="user">User</option>
              <option value="caretaker">Caretaker</option>
            </select>
          </div>
          <div className="form-wrapper">
            <input
              required
              type="number"
              name="age"
              // value={age}
              onChange={handleChange}
              placeholder="Age"
              className="form-control2"
              min={18}
              max={100}
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              name="password"
              // value={password}
              onChange={handleChange}
              placeholder="Password"
              className="form-control2"
              required
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              name="confirmPassword"
              // value={password_confirm}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="form-control2"
              required
            />
          </div>

          <button type="submit">Sign Up</button>

          {/* <div id="hr">OR</div>

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
          </div> */}

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
