import React from 'react'
import Chart from '../Component/Chart'
import CircularProgressBar from '../Component/Progressbar'
import './Pages.css'
import Caldender from '../Component/Caldender'
import CareRoutes from '../utils/CareRoutes'
import Table from "../Component/Table"
const Analytics = () => {
  return (
      <div className="main" >
        <div className="nav-bar">
          <CareRoutes/>
        </div>
        <div className="Analytics-pages">
        <div className="left-side">
          <div className="user">
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
          </div>
          <div className="chart">
            <div className="card"><div className='card-body'><Chart/></div></div>
          </div>
          <div className="aboutuser">
            <div className="card">
              
              <div className="card-body"><h6>Progress</h6><br /><CircularProgressBar value={55}/></div>
            </div>
            <div className="about">
              <div className="card"><div className="card-body">
                <h6>About User</h6>
                    <p>Disease: Blood Pressure</p>
                    <p>Allergy: Dairy Product</p>
              </div></div> 
            </div>
          </div>
        </div>
        <div className="right-side">
          <div className="card"><Caldender/></div>
          <div className="card">
            <div className="card-body">
              <p>10:00am : "Grarding"</p><br />
              <p>10:00am : "Grarding"</p><br />
              <p>10:00am : "Grarding"</p><br />
              <p>10:00am : "Grarding"</p><br />
            </div>
          </div>
        </div>
        </div>
      </div>
    
  )
}

export default Analytics
