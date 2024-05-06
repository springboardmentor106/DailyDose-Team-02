import React from 'react'
import Chart from '../Component/Chart'
import CircularProgressBar from '../Component/Progress'
import './Pages.css'
import Caldender from '../Component/Caldender'
const Analytics = () => {
  return (
      <div className="main" >
        <div className="left-side">
          <div className="user">
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
            <div className="card"><div className="card-body"><h6>UserProfile</h6></div></div>
          </div>
          <div className="chart">
            <Chart/>
          </div>
          <div className="aboutuser">
            <div className="progress">
              
                <h6>User progress</h6>
               
              
            </div>
            <div className="about">
             
                  <h6>About User</h6>
                  <p>Disease: Blood Pressure</p>
                  <p>Allergy: Dairy Product</p>
                
            </div>
          </div>
        </div>
        <div className="right-side">
          <Caldender/>
        </div>
      </div>
    
  )
}

export default Analytics
