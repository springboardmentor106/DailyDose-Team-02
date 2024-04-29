import React from "react";
import "../App.css";
import register_img from ".././assets/images/register-m2.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Register = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password_confirm, setpassword_confirm] = useState("");

  const signUp = async (e) => {
    e.preventDefault();
    const phoneNumber = 987654321;
    const address = "abc";
    const country = "country";
    const pincode = 254163;
    const item = {
      firstname,
      lastname,
      email,
      gender,
      age,
      password,
      phoneNumber,
      address,
      country,
      pincode,
    };
    console.log(item);

    const result = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await result.json();
    console.log(data);
    //localStorage.setItem("user-info",JSON.stringify(item))
  };
  return (
    <div className="wrapper">
      <div className="inner">
        <form onSubmit={(e) => signUp(e)}>
          <h3>Register Now!</h3>
          <div className="form-group">
            <input
              type="text"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
              placeholder="First Name"
              className="form-control"
            />
            <input
              type="text"
              value={lastname}
              onChange={(e) => setlastname(e.target.value)}
              placeholder="Last Name"
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="form-control"
              name="email"
            />
          </div>
          <div className="form-wrapper">
            <select
              name=""
              onChange={(e) => setGender(e.target.value)}
              defaultValue={gender}
              className="form-control">
              <option value="" disabled>
                Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-wrapper">
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Age"
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="form-control"
              name="password"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={password_confirm}
              onChange={(e) => setpassword_confirm(e.target.value)}
              placeholder="Confirm Password"
              className="form-control"
            />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={password_confirm}
              onChange={(e) => setpassword_confirm(e.target.value)}
              placeholder="Confirm Password"
              className="form-control"
            />
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
