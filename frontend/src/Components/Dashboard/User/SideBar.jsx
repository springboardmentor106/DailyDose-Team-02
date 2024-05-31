import React from "react";
import "../../userDashboard/userNav.css";
import logo from  "../../../assets/images/logo.png"
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img alt="user avatar" src={logo} />
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/dashboard"  className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link  to="/add" className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Add</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/target" className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>Target</span>
          </Link>
        </li>
      </ul>
      <div className="user__profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </nav>
  );
};
export default SideBar;