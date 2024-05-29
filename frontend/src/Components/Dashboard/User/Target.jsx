import React, { useState, useEffect } from "react";
import moment from "moment";
import TargetList from "../User/CheckBoxTarget";
import { RiCheckboxCircleLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import CircularProgressBar from "../User/ProgressBarForTarget";
import "./Target.css";
import UserNav from "../../userDashboard/UserNav";
import UserProfile from "../dashComponents/UserProfile";
import { PiDotsThreeOutlineFill } from "react-icons/pi";
import Constants from "../../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Target = () => {
  const [selectedItem, setSelectedItem] = useState("goal"); // Default to 'goal' being selected
  const [goals, setGoals] = useState(null);
  const [reminders, setReminders] = useState(null);
  const [habits, setHabits] = useState(null);
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
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
      const response = await fetch(Constants.BASE_URL + "/api/habits", {
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
        data.habits ? setHabits(data.habits) : setHabits(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    getUserReminders();
    getUserGoals();
    getUserHabits();
  }, []);

  return (
    <div className="main-container-target">
      <UserNav />
      <UserProfile />
      <div className="add-page-container" id="user-target">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => handleItemClick("goal")}>
            <h4 id="heading">My Goal</h4>
          </button>
          {selectedItem === "goal" && (
            <div className="dropdown-content">
              <div className="app">
                <div className="header-container">
                  <div id="chaeck-icon">
                    <RiCheckboxCircleLine />
                  </div>
                  <div className="header-details-Task">
                    <h5>Task</h5>
                  </div>
                  <div className="header-details-EndDate">
                    <h5>End Date</h5>
                  </div>
                  <div className="header-details-Status">
                    <h5>Status</h5>
                  </div>
                  <div className="header-details-dots">
                    <PiDotsThreeOutlineFill />
                  </div>
                </div>
                <div className="details-container">
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={55} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                    <TargetList />
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={100} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={80} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={68} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={40} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={75} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={63} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={33} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={5} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        {/* My Reminder Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => handleItemClick("habit")}>
            <h4 id="heading">My Reminder</h4>
          </button>
          {selectedItem === "habit" && (
            <div className="dropdown-content">
              <div className="app">
                <div className="header-container">
                  <div id="chaeck-icon">
                    <RiCheckboxCircleLine />
                  </div>
                  <div className="header-details-Task">
                    <h5>Task</h5>
                  </div>
                  <div className="header-details-EndDate">
                    <h5>End Date</h5>
                  </div>
                  <div className="header-details-Status">
                    <h5>Status</h5>
                  </div>
                  <div className="header-details-dots">
                    <PiDotsThreeOutlineFill />
                  </div>
                </div>
                <div className="details-container">
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={55} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                    <TargetList />
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={100} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={80} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={68} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={40} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={75} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={63} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={33} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={5} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* My Habit Dropdown */}
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => handleItemClick("reminder")}>
            <h4 id="heading">My Habit</h4>
          </button>
          {selectedItem === "reminder" && (
            <div className="dropdown-content">
              <div className="app">
                <div className="header-container">
                  <div id="chaeck-icon">
                    <RiCheckboxCircleLine />
                  </div>
                  <div className="header-details-Task">
                    <h5>Task</h5>
                  </div>
                  <div className="header-details-EndDate">
                    <h5>End Date</h5>
                  </div>
                  <div className="header-details-Status">
                    <h5>Status</h5>
                  </div>
                  <div className="header-details-dots">
                    <PiDotsThreeOutlineFill />
                  </div>
                </div>
                <div className="details-container">
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={55} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                    <TargetList />
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={100} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={80} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={68} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={40} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={75} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={63} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={33} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                  <div className="details">
                    <div className="Progress-bar">
                      <CircularProgressBar value={5} />
                    </div>
                    <div className="end-date">
                      <strong>
                        {moment().format("MMMM Do YYYY h:mm:ss a")}
                      </strong>
                    </div>
                    <div className="dot">
                      <PiDotsThreeOutlineVerticalBold />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Target;
