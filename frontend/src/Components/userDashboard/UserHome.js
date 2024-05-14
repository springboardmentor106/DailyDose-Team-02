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
          <div   id="right-pane">
            <div className="boxes" id="calender">Calender</div>
            <div className="boxes" id="tasks">Tasks</div>
          </div>
          <div className="boxes"  id="chart">chart</div>
          <div   id="bottom-pane">
            <div className="boxes" id="progress">Progress</div>
            <div className="boxes" id="about__user">Analytics</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
