import React from 'react';
import '../App.css';
import register_img from '.././assets/images/register-m2.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const [firstName,setFirstName]=useState("")
  const [lastName,setLastName]=useState("")
  const [email, setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [age,setAge]=useState("")
  const [confirmPassword,setConfirmPassword]=useState("")
  const navigate=useNavigate();

  async function signUp(){
    let item={firstName,lastName,email,password,confirmPassword,age}
    console.log(item)

    let result= await fetch("http://localhost:3000/api/users/register",{
      method:'GET',
      body:JSON.stringify(item),
      headers:{
            "Contact-Type":'application/json',
            "Accept":'application/json'
        }
    })

    result=await result.json()
    localStorage.setTime("user-info",JSON.stringify(result))
    navigate.push("/add")
  }
  return (
    <div className="wrapper">
      
      <div className="inner">
        <form >
          <h3>Register Now!</h3>
          <div className="form-group">
            <input type="text" value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder="First Name" className="form-control" />
            <input type="text" value={lastName} onChange={(e)=> setLastName(e.target.value)} placeholder="Last Name" className="form-control" />
          </div>
          <div className="form-wrapper">
            <input
              type="email"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}
              placeholder="Email Address"
              className="form-control" />
            <i className="zmdi zmdi-email"></i>
          </div>
          <div className="form-wrapper">
            <select name="" id=""  className="form-control">
              <option disabled selected>Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <i className="zmdi zmdi-caret-down" style={{fontSize: "17px"}}></i>
          </div>
          <div className="form-wrapper">
            <input type="number" placeholder="Age" value={age} onChange={(e)=> setAge(e.target.value)} className="form-control" />
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
              placeholder="Password"
              className="form-control" />
            <i className="zmdi zmdi-lock"></i>
          </div>
          <div className="form-wrapper">
            <input
              type="password"
              value={confirmPassword}
              onChange={(e)=> setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="form-control" />
            <i className="zmdi zmdi-lock"></i>
          </div>

          <button onClick={signUp}>
            Sign Up
            <i className="zmdi zmdi-arrow-right"></i>
          </button>

          <div id="hr">OR</div>

          <div id="login-btns">
            <a href="">
              <div
                style={{ width: "32px", height: "32px", borderRadius: "50%" }}>
                <img
                  className="google-icon"
                  src="https://i.ibb.co/ydLySMx/google.png"
                  width={"100%"}
                  height={"100%"}
                />
              </div>
            </a>

            <br />

            <a href="">
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

          <div id='sign-in'>
              <span>
                Already have an account?
                <Link to="/"> Login</Link>
              </span>
            </div>
        </form>
        <div className="image-holder">
          <div id="mini-box">
            <p style={{padding: "1vw"}}>
Just one step<br />
away from your<br />
caretaker
            </p>
            <img src={register_img} alt="illustration" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register