import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Constants from "../../../constants";
import "./Pages.css";
import profilepic from "../../../assets/images/profilepic.png";
import UserNav from "../../userDashboard/UserNav";
import { profileinfo } from "./StaticDataCare";
import { reminders } from "./StaticDataCare";
import "../../userDashboard/userHome.css";
import { IoOptionsOutline } from "react-icons/io5";
import Chart from "../dashComponents/Chart";
import CircularProgressBar from "../dashComponents/ProgressBar";
import ReactCalendar from "../dashComponents/Calendar";
import { IoIosArrowDropdown } from "react-icons/io";
import { user, habitsList } from "../User/StaticDataUser";
import noProgressCropped from "../../../assets/images/noProgressCropped.png";
import noUserDetailsCropped from "../../../assets/images/noUserDetailsCropped.png";
import noRemindersImage from "../../../assets/images/noReminders.png";
import ReminderList from "../User/ReminderList";
import HabitReminderList from "../User/HabitReminderList";
import GoalReminderList from "../User/GoalReminderList";
import CareProfile from "../dashComponents/CareProfile";

const Analytics = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };

  const [selectedBox, setSelectedBox] = useState(1);
  const [reminders, setReminders] = useState(null);
  const [goals, setGoals] = useState(null);
  const [habits, setHabits] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [goalProgress, setGoalProgress] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [chartData, setChartData] = useState(null)
  const navigate = useNavigate();
  const [assignedUsers, setAssignedUsers] = useState(null)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleLinkClick = (boxNumber) => {
    setSelectedBox(boxNumber);
  };

  const getUserReminders = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const caretakerId = localStorage.getItem("caretakerId")
      const body = role === "user" ? { caretakerId: caretakerId } : { seniorCitizenId: selectedUser }
      const response = await fetch(
        Constants.BASE_URL + "/api/reminders/get-reminders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(body)
        }
      );

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
      const data = await response.json();
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
      const role = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const body = role === "user" ? { caretakerId: caretakerId } : { seniorCitizenId: selectedUser }
      const response = await fetch(
        Constants.BASE_URL + "/api/goals/getTodayGoals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(body),
        }
      );

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
      const data = await response.json();
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
      const role = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const body = role === "user" ? null : { seniorCitizenId: selectedUser }
      const response = await fetch(Constants.BASE_URL + "/api/habits/get-habits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body)
      });

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
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
      const role = localStorage.getItem("role");
      const body = role === "user" ? { caretakerId: caretakerId } : { seniorCitizenId: selectedUser }

      const response = await fetch(
        Constants.BASE_URL + "/api/goals/daily-stats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify(body),
        }
      );

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      //   return; // Added return to exit function early
      // }

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

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
      const data = await response.json();
      if (data.status === "success") {
        data.user ? setUserDetails(data.user) : setUserDetails(null);
        localStorage.setItem("caretakerId", data.user.caretaker || null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getChartData = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role");
      const caretakerId = localStorage.getItem("caretakerId");
      const body = role === "user" ? { caretakerId: caretakerId, year: 2024 } : { seniorCitizenId: selectedUser, year: 2024 }
      const response = await fetch(Constants.BASE_URL + "/api/goals/monthly-stats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(body)
      });

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
      const data = await response.json();
      if (data.status === "success") {
        data.monthsData ? setChartData(data.monthsData) : setChartData(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getAssignedUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/caretaker/senior-detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      // if (response.status === 401) {
      //   navigate("/login");
      //   localStorage.clear();
      // }
      const data = await response.json();
      if (data.status === "success") {
        if (data.seniorArr) {
          
          setAssignedUsers(data.seniorArr)
          setSelectedUser(data.seniorArr[0].uuid)
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const handleSelectCard = (userId) => {
    setSelectedUser(userId)
    setRefresh(true)
  }

  const getMonthlyReminderProgress = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + '/api/reminders/monthly-stat', {
        method: "POST",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify({ seniorCitizenId: selectedUser, year: 2024 })
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        setChartData(data.monthsData)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };
  const handleDropdownChange = (value) => {
    if (value !== "goal") {
      getMonthlyReminderProgress()
    }
    else {
      getChartData()
    }
  }

  useEffect(() => {
    // handleSelectCard(assignedUsers[0].uuid)
  }, [assignedUsers && assignedUsers.length])
  useEffect(() => {
    console.log(selectedUser)
  }, [selectedUser])

  useEffect(() => {
    getUserGoals();
    getAssignedUserDetails()
    if (selectedUser) {
      getUserReminders();
      getUserGoals();
      getUserHabits()
      getGoalProgress()
      getChartData()
    }
    setRefresh(false)
  }, [refresh === true]);
  return (
    <>
      <div className="user__body">
        <UserNav />
        <CareProfile />
        <div className="main__content">
          <div id="user__welcome">
            {assignedUsers && assignedUsers.map((profile, index) => (
              <div className="care-profile-card" key={index} id="ana-card-body" onClick={() => handleSelectCard(profile.uuid)}>
                <div id="img-body">
                  <img src={profilepic} alt="" />
                </div>
                <h6>
                  <strong>{profile.firstname}{profile.lastname}</strong>
                </h6>
                <p>{profile.email}</p>
                <p>Gender: {profile.gender}</p>
                <p>Age: {profile.age}</p>
              </div>
            ))}
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
                    className={selectedBox === 1 ? "active" : ""}>
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
                <div className="des-option-icon">
                  <IoOptionsOutline />
                </div>
              </div>
              {selectedBox === 1 && (
                <div>
                  <div className="right-card-two">
                    {reminders && reminders.length ? (
                      <ReminderList
                        remindersList={reminders}
                        setRefresh={setRefresh}
                        isCaretaker={true}
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
                    {goals && goals.length ? (
                      <GoalReminderList
                        goalsList={goals}
                        setRefresh={setRefresh}
                        isCaretaker={true}
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
                    {habits && habits.length ? (
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
                {goalProgress !== null && goals.length ? (
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
                          <div className="pro-percentage">
                            {goalProgress.toStart}%
                          </div>
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
              {user.details ? (
                <div className="row-three-dtails-container">
                  <div className="row-three-details-container-row-first">
                    <div className="row-three-detail-first">
                      <h7>
                        <strong>Disease</strong>
                      </h7>
                      <p>Blood pressure</p>
                      <p>Cholesterol</p> br
                    </div>
                    <div className="row-three-detail-second">
                      <h7>
                        <strong>Allergy</strong>
                      </h7>
                      <p>Dairy products</p>
                      <p>Dust mites</p>
                    </div>
                  </div>
                  <div className="row-three-details-container-row-second">
                    <div className="row-three-detail-first">
                      <h7>
                        <strong>Disease</strong>
                      </h7>
                      <p>Blood pressure</p>
                      <p>Cholestrol</p>
                    </div>
                    <div className="row-three-detail-second">
                      <h7>
                        <strong>Allergy</strong>
                      </h7>
                      <p>Dairy products</p>
                      <p>Dust mites</p>
                    </div>
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
                  <button className="edit-profile-button">Edit profile</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Analytics;
