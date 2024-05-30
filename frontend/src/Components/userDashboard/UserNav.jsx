import React, { useEffect, useState } from "react";
import "./userNav.css";
import logo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoNotifications } from "react-icons/io5";
const UserNav = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login",{replace:true});
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img alt="user avatar" src={logo} />
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link
            to={role === "user" ? "/user-dash" : "/care-dashboard"}
            className="navbar__link nav-link_active">
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
          <Link
            to={role === "user" ? "/add" : "/care-add"}
            className="navbar__link">
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
          <Link
            to={role === "user" ? "/target" : "/care-analytics"}
            className="navbar__link">
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
      <div id="user__profile">
        <button
          type="button"
          class="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            color="white"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-user">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default UserNav;
