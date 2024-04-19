import React from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import login from "../assets/images/login.png";
import bg_img from "../assets/images/login-bg.png";
const Login = () => {
  return (
    <div className="container">
      <div className="form-wrapper">
        <form className="login_box">
          <div className="login-header">
            <span>Login</span>
          </div>
          <div className="login-items">
          <div className="input_box">
            <input type="text" id="user" className="input-field" required />
            <label for="user" className="label">
              Username
            </label>
            <i className="bx bc-lock-alt icon"></i>
          </div>
{/* this is a sample comment */}
          <div className="input_box">
            <input type="password" id="pass" className="input-field" required />
            <label for="pass" className="label">
              Password
            </label>
            <i className="bx bxs-lock-alt icon"></i>
          </div>

          <div className="remember-forgot">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label for="remember"> Remember me</label>
            </div>
            <div className="forgot">
              <Link to="/reset">Forgot password?</Link>
            </div>
          </div>

          <div className="input_box">
            <input type="submit" value="Login" className="input-submit" />
          </div>

          <button className="btn">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z"
                fill="#EA4335"
              />
              <path
                d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z"
                fill="#34A853"
              />
              <path
                d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z"
                fill="#4A90E2"
              />
              <path
                d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z"
                fill="#FBBC05"
              />
            </svg>
            Sign in with Google
          </button>

          <div className="register">
            <span>
              Don't have an account?
              <Link to="/register"> Register</Link>
            </span>
          </div>
          </div>
        </form>
      </div>
      <div className="img-wrapper">
        <div className="img-box">
          <img src={login} alt="login main" />
          <img src={bg_img} alt="login background" />
        </div>
      </div>
    </div>
  );
};

export default Login;
