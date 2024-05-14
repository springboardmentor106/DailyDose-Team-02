import React from 'react'
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar'
import './Pages.css'
import Calendar from '../dashComponents/Calendar'

import ReminderList from '../User/ReminderList';
import profilepic from "../../../assets/images/profilepic.png"
import UserNav from '../../userDashboard/UserNav'
import { AiFillSliders } from "react-icons/ai";
const Analytics = () => {
  const profileinfo=[
    {name:"Chris Evan" , email:"chris@gmail.com", age:30,blood:"O+"},
    {name:"John sinna" , email:"john@gmail.com", age:30,blood:"A+"},
    {name:"harry potter" , email:"harry@gmail.com", age:30,blood:"B+"},
    {name:"Ryan smith" , email:"ryan@gmail.com", age:30,blood:"AB+"},
  ]
  
    const reminders = [
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
      { time: '10:05 PM', activity: 'Gardening' },
    ];
 
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
          <div className="aboutuser">
            <div className="card" id='analysis-circle'>
              <div className="card-body" ><h4><strong>Progress</strong></h4>
              <div className='circle-progress'><CircularProgressBar value={55}/></div>
              <div>55% Completed</div>
              <div>45% Remaining</div>
            </div></div>
            <div className="about">
              <div className="card"><div className="card-body">
                <h4><strong> About User</strong></h4>
                <p>the User's health Condition </p>
                <div className="condition">
                  <div id="list"><ul><h6><strong>Disease</strong></h6></ul>
                  <li>Blood Pressure</li><li>Cholestrol</li><li>knee pain</li></div>
                  <div id="list"><ul><h6><strong>Allergy</strong></h6></ul>
                  <li>Dairy Product</li><li>Dust Mines</li><li>Penicilium</li></div>
                </div>
                
                    
              </div></div> 
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
