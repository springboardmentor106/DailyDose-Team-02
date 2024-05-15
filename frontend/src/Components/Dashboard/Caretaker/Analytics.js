import React from 'react'
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar'
import './Pages.css'
import Calendar from '../dashComponents/Calendar'

import ReminderList from '../User/ReminderList';
import profilepic from "../../../assets/images/profilepic.png"
import UserNav from '../../userDashboard/UserNav'
import { AiFillSliders } from "react-icons/ai";
import { profileinfo } from './StaticDataCare'
import { reminders } from './StaticDataCare'
const Analytics = () => {
  return (
      <div className="main" >
        <div className="nav-bar">
          <UserNav/>
        </div>
        <div className="Analytics-pages">
        <div className="ana-left-side">
          <div className="user">
            {profileinfo.map((profile,index)=>(
              <div className="card" key={index}><div className="card-body">
                <img src={profilepic} alt="" />
                <h6><strong>{profile.name}</strong></h6>
                <p>{profile.email}</p>
                <p>Age: {profile.age}</p>
                <p>Blood: {profile.blood}</p>
              </div></div>
            ))}
          </div>
          <div className="chart">
            <div className="card"><div className='card-body'><Chart/></div></div>
          </div>
          <div className="row-three">
        <div className="row-three-card">
          <h5 id='progres'><strong>Progress</strong></h5>
          <div className="box-left-top">
              <div><CircularProgressBar value={55} /> </div> <br />
            </div>
            <div className="Progress-details-container">
              <div className="one-pro-detail">
              <div className="cirlce-pro-one"></div>
             <div className="pro-text">
             55%
            Completed
             </div>
              </div>
              <div className="second-pro-detail">
              <div className="cirlce-pro-two"></div>
              <div className="pro-text">
             25%
             <br />
             In process
             </div>
              </div>
              <div className="third-pro-detail">
              <div className="cirlce-pro-three"></div>
              <div className="pro-text">
             10%
             <br />
             In process
             </div>
              </div>
            </div>
        </div>
        <div className="row-three-card">
          <h5 id='about'><strong>About User</strong></h5>
          <div className="row-three-dtails-container">
          <div className="row-three-details-container-row-first">
          <div className="row-three-detail-first">
             <h7><strong>Disease</strong></h7>
             <p>Blood pressure</p>
             <p>Cholestrol</p>
           </div>
           <div className="row-three-detail-second">
           <h7><strong>Allergy</strong></h7>
           <p>Dairy products</p>
           <p>Dust mites</p>
           </div>
          </div>
          <div className="row-three-details-container-row-second">
          <div className="row-three-detail-first">
             <h7><strong>Disease</strong></h7>
             <p>Blood pressure</p>
             <p>Cholestrol</p>
           </div>
           <div className="row-three-detail-second">
           <h7><strong>Allergy</strong></h7>
           <p>Dairy products</p>
           <p>Dust mites</p>
           </div>
          </div>
          </div>
        </div>
        </div>
        </div>
        <div className="ana-right-side">
        <div className="ana-right-card-one">
          <Calendar/>
        </div>
        <div className="select">
          <div><strong>Reminder</strong></div>
          <div><strong>Goal</strong></div>
          <div><strong>Habit</strong></div>
          <div><AiFillSliders /></div>
        </div>
        <div className="ana-right-card-two">
        <ReminderList reminders={reminders} />
        </div>
          </div>
        </div>
        </div>
  )
}

export default Analytics
