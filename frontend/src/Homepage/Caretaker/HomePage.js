import React from 'react';
import { FaHome, FaPlus, FaBullseye, FaUsers, FaCog, FaUser } from 'react-icons/fa';

import CircularProgressBar from '../Progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './HomePage.css'; // Import your CSS file for styling
import pic from "../../assets/picture.png"
import Progress from '../Progress'
import Table from '../Table';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const reminders = [
    { time: '08:00 AM', activity: 'Morning walk' },
    { time: '12:00 PM', activity: 'Lunch break' },
    { time: '03:00 PM', activity: 'Meeting' },
  ];

  return (
    <div className="wrapper">
      <div className="sidebar">
        <div className="sidebar-item"><FaHome className="icon" /></div>
        <div className="sidebar-item"><FaPlus className="icon" /></div>
        <div className="sidebar-item"><FaBullseye className="icon" /></div>
        <div className="sidebar-item"><FaUsers className="icon" /></div><br/><br/><br/><br/>
        <div className="sidebar-item"><FaCog className="icon" /></div>
        <div className="sidebar-item"><FaUser className="icon" /></div>
      </div>
      <div className='main'>
        <div className="card">
          <div className="card-body"><h1>Welcome Back !!!</h1><p>Have a nice day and dont forget to take your pills</p></div>
          <div className='img'><img src={pic} alt="" /></div>
        </div>
        <br />
          <div class="accordion" id="accordionExample">
            <div class="accordion-item">
              <h2 class="accordion-header">
              <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              User Profile</button>
              </h2>
            <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
          <div class="accordion-body">
          <div className="box">
            <div className="box-left">
            <div className="box-left-top">
              <div><CircularProgressBar value={40} /> <span>1-hour walk</span></div> <br />
              <div><CircularProgressBar value={50} /> <span>water balance</span></div> <br />
              <div><CircularProgressBar value={60} /> <span>exercise</span></div> <br />
            </div>
            <div className="box-left-down">
              <div className="box-left-down-left">
                <h6>Monthly analysis</h6>
                <div><span>goal    30%</span><Progress progress={30}/></div>
                <div><span>habit   50%</span><Progress progress={50}/></div>
                <div><span>hobbies 60%</span><Progress progress={60}/></div>
              </div>
              <div className="box-left-down-right">
                <h6>Details</h6>
                <p>It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions</p>              </div>
            </div>
          </div>
          <div className="box-right">
            
              {/* Call the ReminderTable component and pass reminders data as a prop */}
              <Table reminders={reminders} />
              <Table reminders={reminders} />
            
          </div>
        </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        User Profile
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div class="accordion-body">
      <div className="box">
            <div className="box-left">
            <div className="box-left-top">
              <div><CircularProgressBar value={40} /> <span>1-hour walk</span></div> <br />
              <div><CircularProgressBar value={50} /> <span>water balance</span></div> <br />
              <div><CircularProgressBar value={60} /> <span>exercise</span></div> <br />
            </div>
            <div className="box-left-down">
              <div className="box-left-down-left">
                <h6>Monthly analysis</h6>
                <div><span>goal    30%</span><Progress progress={30}/></div>
                <div><span>habit   50%</span><Progress progress={50}/></div>
                <div><span>hobbies 60%</span><Progress progress={60}/></div>
              </div>
              <div className="box-left-down-right">
                <h6>Details</h6>
                <p>It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions</p>              </div>
            </div>
          </div>
          <div className="box-right">
            
              {/* Call the ReminderTable component and pass reminders data as a prop */}
              <Table reminders={reminders} />
              <Table reminders={reminders} />
            
          </div>
        </div>
    
      </div>
    </div>
  </div>
  
</div>
        </div>
        
      
      </div>
    </div>
  );
}

export default HomePage;
