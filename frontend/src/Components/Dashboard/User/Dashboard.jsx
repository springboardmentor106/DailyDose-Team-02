import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import UserNav from "../../userDashboard/UserNav";
import { IoIosArrowDropdown } from "react-icons/io";
import Chart from "../dashComponents/Chart";
import CircularProgressBar from "../dashComponents/ProgressBar";
import ReminderList from "./ReminderList";
import ReactCalendar from "../dashComponents/Calendar";
import dailyimg from "../../../assets/images/User.png";
import { IoLocationSharp } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { user, remindersList, goalsList, habitsList, } from "./StaticDataUser";
// import { reminders } from "./StaticDataUser";
import HabitReminderList from './HabitReminderList';
import GoalReminderList from './GoalReminderList';
import { toast } from "react-toastify"
import Constants from "../../../constants"
import noRemindersImage from "../../../assets/images/noReminders.png"
import noProgress from "../../../assets/images/noProgress.png"
import noUserDetails from "../../../assets/images/noUserDetails.png"
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [selectedBox, setSelectedBox] = useState(1);
  const [reminders, setReminders] = useState(remindersList)
  const navigate = useNavigate()
  const handleLinkClick = (boxNumber) => {
    setSelectedBox(boxNumber);
  };

  const getUserReminders = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(Constants.BASE_URL + '/api/reminders', {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        }
      })

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear()
      }
      const data = await response.json()
      console.log(data)
      if (data.status === "success") {
        data.reminders ? setReminders(data.reminders) : setReminders(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log("error", error)
      toast.error(error)
    }
  }

  // useEffect(() => {
  //   getUserReminders()
  //   console.log("user")
  // }, [])

  useEffect(() => {
    console.log(reminders, new Date().toISOString(), new Date().toJSON())
  }, [reminders])
  return (
    <div className="dashboard">
      <UserNav />
      <div className="left-side">
        <div className="row-one">
          <div className="row-one-card-one">
            <h5>
              <strong>Welcome Back...</strong>
            </h5>
            <div className="lower-side">
              <p>Have a nice day and don't forget take your pills</p>
              <div className="img-container">
                <img src={dailyimg} alt="" />
              </div>
            </div>
          </div>
          <div className="row-one-card-two">
            <div className="circle-das">
              {user.firstName[0]}
            </div>
            <div className="details-das">
              {/* {profileinfo.map((profile, index) => ( */}
              <div className="card-user" ><div className="card-body">
                <h6><strong>{user.firstName} {user.lastName}</strong></h6>
                <p>Age: {user.age}</p>
                <p><IoLocationSharp /> {user.location || "--"}</p>
              </div></div>
              {/* // ))} */}
            </div>
          </div>
        </div>

        <div className="row-one-chart">
          <div className="chart-heading">
            <h5>
              <strong>Goal Progress</strong>
            </h5>
            <div className="year-container">
              <button>year</button>
              <div id="year-button-container">
                <IoIosArrowDropdown />
              </div>
            </div>
          </div>
          <div className="row-one-card-one-dashboard">
            <Chart />
          </div>
        </div>

        <div className="row-three">
          <div className="row-three-card">
            <h5 id="progres">
              <strong>Progress</strong>
            </h5>
            {user.progress ?
              <div className='row-three-content'>
                <div className="box-left-top">
                  <div id="CircularProgressBar">
                    <CircularProgressBar value={user.progress || 0} />{" "}
                  </div>{" "}
                  <br />
                </div>
                <div className="Progress-details-container">
                  <div className="pro-detail">
                    <div className="cirlce-pro-one completed"></div>
                    <div className="pro-text"><div className='pro-percentage'>{user.completed}%</div> completed</div>
                  </div>

                  <div className="pro-detail">
                    <div className="cirlce-pro-one in-progress"></div>
                    <div className="pro-text"><div className='pro-percentage'>{user.inProgress}%</div> in progress</div>
                  </div>

                  <div className="pro-detail">
                    <div className="cirlce-pro-one"></div>
                    <div className="pro-text"><div className='pro-percentage'>{user.toStart}%</div> to start</div>
                  </div>
                </div>
              </div>
              : <div className='no-progress'>
                <img src={noProgress} alt="no progress" className='no-progress-image' /> Progress will appear here when you complete the tasks in time</div>}

          </div>
          < div className="row-three-card">
            <h5 id="about">
              <strong>About User</strong>
            </h5>
            {user.details ?
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
              :
              <div className='no-progress'>
                <img src={noUserDetails} alt="no progress" className='no-progress-image' />
                <button className='edit-profile-button'>Edit profile</button>
              </div>}

          </div>
        </div>
      </div>
      <div className="right-side">
        <div className="right-card-one">
          <ReactCalendar />
        </div>
        <div className="card-center-details">
          <div className="card-center-details-links">
            <button onClick={() => handleLinkClick(1)} className={selectedBox === 1 ? 'active' : ''}  > Reminder</button>
            <button onClick={() => handleLinkClick(2)} className={selectedBox === 2 ? 'active' : ''} >Goal</button>
            <button onClick={() => handleLinkClick(3)} className={selectedBox === 3 ? 'active' : ''} >Habit</button>
          </div>
          <div className="des-option-icon">
            <IoOptionsOutline />
          </div>
          <div>
            {selectedBox === 1 && <div>
              <div className="right-card-two">
                {reminders && reminders.length ?
                  <ReminderList remindersList={reminders} />
                  :
                  <div className='no-reminders-container'>
                    <img src={noRemindersImage} alt="no reminders" className='no-reminders-image' />
                    <div>Don't forget to add some reminders to stay on top of your tasks!</div>
                  </div>
                }
              </div>
            </div>}
            {selectedBox === 2 && <div>
              <div className="right-card-two">
                {goalsList && goalsList.length ?
                  < GoalReminderList goalsList={goalsList} />
                  :
                  <div className='no-reminders-container'>
                    <img src={noRemindersImage} alt="no reminders" className='no-reminders-image' />
                    <div>Don't forget to add some goals to stay on top of your tasks!</div>
                  </div>
                }
              </div>
            </div>}
            {selectedBox === 3 && <div>
              <div className="right-card-two">
                {reminders && reminders.length ?
                  <HabitReminderList reminders={reminders} />
                  :
                  <div className='no-reminders-container'>
                    <img src={noRemindersImage} alt="no reminders" className='no-reminders-image' />
                    <div>Don't forget to add some habits to stay on top of your tasks!</div>
                  </div>
                }
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
