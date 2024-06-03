import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Constants from "../../constants";
import UserNav from "./UserNav";
import "./userHome.css";
import welcome from "../../assets/images/UserCrop.png";
import profilePic from "../../assets/images/profilepic.png";
import { IoLocationSharp } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import Chart from "../Dashboard/dashComponents/Chart";
import CircularProgressBar from "../Dashboard/dashComponents/ProgressBar";
import ReactCalendar from "../Dashboard/dashComponents/Calendar";
import { IoIosArrowDropdown } from "react-icons/io";
import { user, habitsList } from "../Dashboard/User/StaticDataUser";
import noProgressCropped from "../../assets/images/noProgressCropped.png";
import noUserDetailsCropped from "../../assets/images/noUserDetailsCropped.png";
import noRemindersImage from "../../assets/images/noReminders.png";
import ReminderList from "../Dashboard/User/ReminderList";
import HabitReminderList from "../Dashboard/User/HabitReminderList";
import GoalReminderList from "../Dashboard/User/GoalReminderList";
import UserProfile from '../Dashboard/dashComponents/UserProfile';
import { RiFontSize } from "react-icons/ri";

const UserHome = () => {
  const [selectedBox, setSelectedBox] = useState(1);
  const [reminders, setReminders] = useState(null);
  const [goals, setGoals] = useState(null);
  const [habits, setHabits] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [goalProgress, setGoalProgress] = useState(null);
  const [chartData, setChartData] = useState(null)
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate();

  const handleLinkClick = (boxNumber) => {
    setSelectedBox(boxNumber);
  };
  const getUserReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/reminders/get-reminders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        data.reminders ? setReminders(data.reminders) : setReminders(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUserGoals = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(
        Constants.BASE_URL + "/api/goals/getTodayGoals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ caretakerId: caretakerId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      console.log(data);
      if (data.status === "success") {
        data.goals ? setGoals(data.goals) : setGoals(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUserHabits = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerid = localStorage.getItem("caretakerId");

      // const body = role === "user" ? null : { seniorCitizenId: selectedUser }
      const response = await fetch(Constants.BASE_URL + "/api/habits/get-habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        // body: JSON.stringify(body)
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        data.habits ? setHabits(data.habits) : setHabits(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getGoalProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(
        Constants.BASE_URL + "/api/goals/daily-stats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ caretakerId: caretakerId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        const completePercent = parseFloat(data.completePercent);
        const toStartPercent = parseFloat(data.toStartPercent);
        setGoalProgress({
          completed: isNaN(completePercent) ? 0 : completePercent,
          toStart: isNaN(toStartPercent) ? 0 : toStartPercent,
        });
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + "/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        data.user ? setUserDetails(data.user) : setUserDetails(null);
        localStorage.setItem("caretakerId", data.user.caretaker);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getMonthlyGoalProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(Constants.BASE_URL + '/api/goals/monthly-stats', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify({ caretakerId: caretakerId, year: 2024 })
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        console.log(data)
        setChartData(data.monthsData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };
  const getMonthlyReminderProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(Constants.BASE_URL + '/api/reminders/monthly-stat', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify({ caretakerId: caretakerId, year: 2024 })
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        console.log(data)
        setChartData(data.monthsData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserReminders();
      getUserGoals();
      getUserHabits();
      getUserDetails();
      getGoalProgress();
      getMonthlyGoalProgress()
      setRefresh(false);
    }
  }, [refresh === true]);

  const handleDropdownChange = (value) => {
    if (value !== "goal") {
      getMonthlyReminderProgress()
    }
    else {
      getMonthlyGoalProgress()
    }
  }

  useEffect(() => { }, [reminders, goals]);
  return (
    <>
      <div className="user__body">
        <UserNav />
        <UserProfile />
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
              <h5><strong>Profile</strong></h5>
              {userDetails && (
                <div className="card-user">
                  <div className="card-profile">
                    <img src={profilePic} />
                  </div>
                  <div className="card-body">
                    <h6>
                      <strong>{userDetails.firstname} {userDetails.lastname}</strong>
                    </h6>
                    <p>Age: {userDetails.age}</p>
                    <p>
                      <IoLocationSharp /> {userDetails.location || "--"}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div id="right-pane">
            <div className="boxes" id="calender">
              <div id="calender-container">
                <ReactCalendar />
              </div>
            </div>

            <div className="boxes" id="tasks">
              <div id="user-mini-nav">
                <div className="card-center-details-links">
                  <button
                    onClick={() => handleLinkClick(1)}
                    className={selectedBox === 1 ? "active" : ""} >
                    {" "}
                    Reminder
                  </button>
                  <button
                    onClick={() => handleLinkClick(2)}
                    className={selectedBox === 2 ? "active" : ""}>
                    Goal
                  </button>
                  <button
                    onClick={() => handleLinkClick(3)}
                    className={selectedBox === 3 ? "active" : ""}>
                    Habit
                  </button>
                </div>
                {/* <div className="des-option-icon">
                  <IoOptionsOutline />
                </div> */}
              </div>
              {selectedBox === 1 && (
                <div>
                  <div className="right-card-two">
                    {reminders && reminders.length ? (
                      <ReminderList
                        remindersList={reminders}
                        setRefresh={setRefresh}
                      />
                    ) : (
                      <div className="no-reminders-container">
                        <img
                          src={noRemindersImage}
                          alt="no reminders"
                          className="no-reminders-image"
                        />
                        <div>
                          Don't forget to add some reminders to stay on top of
                          your tasks!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedBox === 2 && (
                <div>
                  <div className="right-card-two">
                    {goals && goals?.length ? (
                      <GoalReminderList
                        goalsList={goals}
                        setRefresh={setRefresh}
                      />
                    ) : (
                      <div className="no-reminders-container">
                        <img
                          src={noRemindersImage}
                          alt="no reminders"
                          className="no-reminders-image"
                        />
                        <div>
                          Don't forget to add some goals to stay on top of your
                          tasks!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {selectedBox === 3 && (
                <div>
                  <div className="right-card-two">
                    {habits && habits?.length ? (
                      <HabitReminderList habitsList={habits} />
                    ) : (
                      <div className="no-reminders-container">
                        <img
                          src={noRemindersImage}
                          alt="no reminders"
                          className="no-reminders-image"
                        />
                        <div>
                          Don't forget to add some habits to stay on top of your
                          tasks!
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="boxes" id="chart">
            <div className="chart-heading">
              <h5>
                <strong>Goal Progress 2024</strong>
              </h5>
              <div className="year-container">
                <select class="form-select" aria-label="Default select example" onChange={(e) => handleDropdownChange(e.target.value)}>
                  <option value="goal">Goal</option>
                  <option value="reminder">Reminder</option>
                </select>
              </div>
            </div>
            <div className="row-one-card-one-dashboard">
              <Chart chartData={chartData} />
            </div>
          </div>
          <div id="bottom-pane">
            <div className="boxes" id="progress">
              <div className="row-three-card">
                <h5>
                  <strong>Progress</strong>
                </h5>
                {goalProgress !== null && goals?.length ? (
                  <div className="row-three-content">
                    <div className="box-left-top">
                      <div id="CircularProgressBar">
                        <CircularProgressBar
                          value={parseFloat(goalProgress.completed) || 0}
                        />{" "}
                      </div>{" "}
                      <br />
                    </div>
                    <div className="Progress-details-container">
                      <div className="pro-detail">
                        <div className="cirlce-pro-one completed"></div>
                        <div className="pro-text">
                          <div className="pro-percentage">
                            {goalProgress.completed}%
                          </div>{" "}
                          completed
                        </div>
                      </div>

                      <div className="pro-detail">
                        <div className="cirlce-pro-one"></div>
                        <div className="pro-text">
                          <div className="pro-percentage">{goalProgress.toStart}%</div>
                          to start
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="no-progress">
                    <img
                      src={noProgressCropped}
                      alt="no progress"
                      className="no-progress-image"
                    />{" "}
                    Progress will appear here when you complete the tasks in
                    time
                  </div>
                )}
              </div>
            </div>
            <div className="boxes" id="about__user">
              <h5>
                <strong>About User</strong>
              </h5>
              {userDetails && userDetails.allergies.length > 0 || userDetails && userDetails.diseases.length > 0 ? (
                <div className="row-three-dtails-container">
                  <div className="row-three-detail-first">
                    <h7>
                      <strong className="aboutUserTitle">Diseases</strong>
                    </h7>
                    {userDetails.diseases && userDetails.diseases.length > 0 ? userDetails.diseases.map((disease) => {
                      return (
                        <div className="detailAllergy">{disease}</div>
                      )
                    }) : <div>No diseases</div>}

                  </div>
                  <div className="row-three-detail-second">
                    <h7>
                      <strong className="aboutUserTitle">Allergies</strong>
                    </h7>
                    {userDetails?.allergies && userDetails.allergies.length > 0 ? userDetails.allergies.map((allergy) => {
                      return (
                        <div className="detailAllergy">{allergy}</div>
                      )
                    }) : <div>No allergies</div>}
                  </div>

                </div>
              ) : (
                <div className="no-progress">
                  <div id="about-img-div">
                    <img
                      src={noUserDetailsCropped}
                      alt="no progress"
                      className="no-progress-image"
                    />
                  </div>
                  <div>Update your profile to see the diseases and allergies details</div>
                  {/* <button className="edit-profile-button">Edit profile</button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserHome;
