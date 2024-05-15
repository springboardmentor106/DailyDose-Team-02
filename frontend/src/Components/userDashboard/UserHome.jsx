import React from "react";
import UserNav from "./UserNav";
import "./userHome.css";
import welcome from "../../assets/images/User.png";
import profilePic from "../../assets/images/profilepic.png";
import { IoLocationSharp } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { profileinfo } from "../Dashboard/User/StaticDataUser";
import { reminders } from "../Dashboard/User/StaticDataUser";
import Chart from "../Dashboard/dashComponents/Chart";
import CircularProgressBar from "../Dashboard/dashComponents/ProgressBar";

const UserHome = () => {
  return (
    <>
      <div className="user__body">
        <UserNav />
        <div className="main__content">
          <div id="user__welcome">
            <div className="boxes" id="welcome">
              <div className="welcome__text">
                <h3>Welcome Back...</h3>
                <p>Have a nice day and don't forget take your pills...</p>
              </div>
              <div className="welcome__img__container">
                <img src={welcome} alt="" />
              </div>
            </div>
            <div className="boxes" id="profile">
              {profileinfo.map((profile, index) => (
                <div className="card-user" key={index}>
                  <div className="card-profile">
                    <img src={profilePic} />
                  </div>
                  <div className="card-body">
                    <h6>
                      <strong>{profile.name}</strong>
                    </h6>
                    <p>Age: {profile.age}</p>
                    <p>
                      <IoLocationSharp /> {profile.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div id="right-pane">
            <div className="boxes" id="calender">
              Calender
            </div>
            <div className="boxes" id="tasks">
              Tasks
            </div>
          </div>
          <div className="boxes" id="chart">
            Chart
          </div>
          <div id="bottom-pane">
            <div className="boxes" id="progress">
              <div id="circularProgressBar">
                <CircularProgressBar value={55} />{" "}
              </div>
              <div className="progress-details-container">
                <div className="progress-detail">
                  <div className="cirlce-pro-one"></div>
                  <div className="progress-detail-text">
                    <p>55%</p>
                    <p>Completed</p>
                  </div>
                </div>
                <div className="progress-detail">
                  <div className="cirlce-pro-two"></div>
                  <div className="progress-detail-text">
                    <p>25%</p>
                    <p>In process</p>
                  </div>
                </div>
                <div className="progress-detail">
                  <div className="cirlce-pro-three"></div>
                  <div className="progress-detail-text">
                    <p>10%</p>
                    <p>In process</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="boxes" id="about__user">
              <h3>About User</h3>
              <div className="disease__info">
                <div className="user-disease">
                  <h6>Disease</h6>
                  <p>Blood pressure</p>
                  <p>Cholestrol</p>
                </div>
                <div className="user-disease">
                  <h6>Allergy</h6>
                  <p>Dairy products</p>
                  <p>Dust mites</p>
                </div>
              </div>
              <div className="disease__info">
                <div className="user-disease">
                  <h6>Disease</h6>
                  <p>Blood pressure</p>
                  <p>Cholestrol</p>
                </div>
                <div className="user-disease">
                  <h6>Allergy</h6>
                  <p>Dairy products</p>
                  <p>Dust mites</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
