import React, { useEffect, useState } from "react";
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
  const [targets, setTargets] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const handleToggle = ({ target, completedToday }) => {
    console.log(target, completedToday);
    // const updatedTargets = targets.map(target =>
    //   target.id === targetId ? { ...target, completed } : target
    // );
    // console.log(targets)
    // setTargets(updatedTargets);
  };

  const handleReminderCheckChange = async (changedReminder) => {
    try {
      const url = Constants.BASE_URL + "/api/reminders/update";
      const token = localStorage.getItem("token");
      const payload = {
        reminderId: changedReminder.uuid,
        completedToday: !changedReminder.completedToday,
      };
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success === "false") {
        toast.warn(data.message);
      } else {
        setRefresh(true);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error:" + err);
    }
  };

  const handleGoalsCheckChange = async (changedReminder) => {
    try {
      const url = Constants.BASE_URL + "/api/goals/update";
      const token = localStorage.getItem("token");
      const payload = {
        goalId: changedReminder.uuid,
        completedToday: !changedReminder.completedToday,
      };
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (data.success === "false") {
        toast.warn(data.message);
      } else {
        setRefresh(true);
        toast.success(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error:" + err);
    }
  };

  const TargetCheckbox = ({ target, type }) => {
    const handleCheckboxChange = async () => {
      if (type === "reminders") {
        const updatedTarget = await handleReminderCheckChange(target); // Toggle the completed status
      } else {
        const updatedTarget = await handleGoalsCheckChange(target); // Toggle the completed status
      }
    };
    return (
      <div className="checkbox">
        <input
          type="checkbox"
          checked={target.completedToday}
          onChange={handleCheckboxChange}
        />
        <label>
          {target.title}
          <div className="status">
            {target.completedToday ? "Completed" : "Not Completed"}
          </div>
        </label>
      </div>
    );
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
      const response = await fetch(Constants.BASE_URL + "/api/habits/get-habits", {
        method: "POST",
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
  }, [refresh === true]);

  return (
    <div className="main-container-target">
      <UserNav />
      <UserProfile />
      <div className="add-page-container" id="user-target">
        <div className="dropdown">
          <button
            className="dropdown-button"
            onClick={() => handleItemClick("goal")}>
            <h4 id="heading">My Goals</h4>
          </button>
          {selectedItem === "goal" && (
            <div className="dropdown-content">
              <div className="app">
                {goals && goals.length ? (
                  <div className="header-container">
                    <div id="chaeck-icon">
                      <RiCheckboxCircleLine />
                    </div>
                    <div className="header-details-Task">
                      <h5>Goal</h5>
                    </div>
                    <div className="header-details-EndDate">
                      <h5>End Date</h5>
                    </div>
                    <div className="header-details-Status">
                      <h5>Status</h5>
                    </div>
                    <div className="header-details-dots">
                      {/* <PiDotsThreeOutlineFill /> */}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="details-container">
                  {goals && goals.length ? goals.map((goal) => {
                    return (
                      <div className="details">
                        <div className="Progress-bar"></div>
                        <div className="end-date">
                          <strong>
                            {moment().format("MMMM Do YYYY h:mm:ss a")}
                          </strong>
                        </div>
                        <div className="dot">
                          {/* <PiDotsThreeOutlineVerticalBold /> */}
                        </div>
                        <TargetCheckbox
                          key={goal.uuid}
                          target={goal}
                          // onToggle={handleToggle}
                          type="goals"
                        />
                        {/* {goals &&
                        goals.map((goal) => {
                          return (
                            <TargetCheckbox
                              key={goal.uuid}
                              target={goal}
                              // onToggle={handleToggle}
                              type="goals"
                            />
                          );
                        })} */}
                      </div>
                    )
                  }) : (
                    <div className="no-reminders">No goals yet</div>
                  )}
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
            <h4 id="heading">My Reminders</h4>
          </button>
          {selectedItem === "habit" && (
            <div className="dropdown-content">
              <div className="app">
                {reminders && reminders.length ? (
                  <div className="header-container">
                    <div id="chaeck-icon">
                      <RiCheckboxCircleLine />
                    </div>
                    <div className="header-details-Task">
                      <h5>Reminder</h5>
                    </div>
                    <div className="header-details-EndDate">
                      <h5>End Date</h5>
                    </div>
                    <div className="header-details-Status">
                      <h5>Status</h5>
                    </div>
                    <div className="header-details-dots">
                      {/* <PiDotsThreeOutlineFill /> */}
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="details-container">
                  {reminders && reminders.length ? reminders.map((reminder) => {
                    return (
                      <div className="details">
                        <div className="Progress-bar"></div>
                        <div className="end-date">
                          <strong>
                            {moment().format("MMMM Do YYYY h:mm:ss a")}
                          </strong>
                        </div>
                        <div className="dot">
                          {/* <PiDotsThreeOutlineVerticalBold /> */}
                        </div>
                        <TargetCheckbox
                          key={reminder.uuid}
                          target={reminder}
                          // onToggle={handleToggle}
                          type="reminders"
                        />
                      </div>
                    )
                  }) : (
                    <div className="no-reminders">No reminders yet</div>
                  )}
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
            <h4 id="heading">My Habits</h4>
          </button>
          {selectedItem === "reminder" && (
            <div className="dropdown-content">
              <div className="app">
                {habits && habits.length ? (
                  <div className="header-container">
                    <div className="header-details-Task-habit">
                      <h5>Habit</h5>
                    </div>
                  </div>
                ) : (
                  <div></div>
                )}
                <div className="details-container">
                  {habits && habits.length ? habits.map((habit) => {
                    return (
                      <div className="details">
                        {/* <div className='Progress-bar'>
                      </div>
                      <div className="end-date">
                        <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                      <div className="dot">
                        <PiDotsThreeOutlineVerticalBold />
                      </div> */}
                        <div className="habit">{habit.title}</div>

                      </div>
                    )
                  }) : (
                    <div className="no-reminders">No habits yet</div>
                  )}
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
