import React from 'react'
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar'
import './Pages.css'
import Caldender from '../dashComponents/Calendar'
import SideBar from "./SideBar";
import Table from "../dashComponents/Table"
import profilepic from "../../../assets/images/profilepic.png"
const Analytics = () => {
  const profileinfo=[
    {name:"Chris Evan" , email:"chris@gmail.com", age:30},
    {name:"John sinna" , email:"john@gmail.com", age:30},
    {name:"harry potter" , email:"harry@gmail.com", age:30},
    {name:"Ryan smith" , email:"ryan@gmail.com", age:30},
  ]
  const reminders = [
    { time: "08:00 AM", activity: "Morning walk" },
    { time: "12:00 PM", activity: "Lunch break" },
    { time: "03:00 PM", activity: "Meeting" }, 
    { time: "03:00 PM", activity: "Gardening" },
    { time: "03:00 PM", activity: "Playing" },
  ];
  return (
      <div className="main" >
        <div className="nav-bar">
          <SideBar/>
        </div>
        <div className="Analytics-pages">
        <div className="ana-left-side">
          <div className="user">
            {profileinfo.map((profile,index)=>(
              <div className="card" key={index}><div className="card-body">
                <img src={profilepic} alt="" />
                <h6><strong>{profile.name}</strong></h6>
                <p>email: {profile.email}</p>
                <p>Age: {profile.age}</p>
              </div></div>
            ))}
            
            
          </div>
          <div className="chart">
            <div className="card"><div className='card-body'><Chart/></div></div>
          </div>
          <div className="aboutuser">
            <div className="card" id='analysis-circle'>
              <div className="card-body" ><h6><strong>Progress</strong></h6>
              <div className='circle-progress'><CircularProgressBar value={55}/></div>
            </div></div>
            <div className="about">
              <div className="card"><div className="card-body">
                <h6><strong> About User</strong></h6>
                    <p>The user is suffering from Disease: Blood Pressure </p>
                    
              </div></div> 
            </div>
          </div>
        </div>
        <div className="ana-right-side">
          <div className="card"><Caldender/></div>
          <div className="card">
            <div className="card-body">
              <Table reminders={reminders}/>
            </div>
          </div>
        </div>
        </div>
      </div>
    
  )
}

export default Analytics
