import React from "react";
import UserNav from "./UserNav";
import "./userHome.css";

const Nav = () => {
  return (
    <>
      <div className="user__body">
        <UserNav />
        <div className="main__content">
          <div className="boxes"  id="welcome">Welcome back</div>
          <div className="boxes"  id="profile">Profile </div>
          <div className="boxes"  id="calender">calender</div>
          <div className="boxes"  id="chart">chart</div>
          <div className="boxes"  id="progress">progress</div>
        </div>
      </div>
    </>
  );
};

export default Nav;
