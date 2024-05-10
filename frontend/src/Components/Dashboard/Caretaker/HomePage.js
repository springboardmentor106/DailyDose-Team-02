import React from "react";
import SideBar from "./SideBar";
import "./Pages.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "../dashComponents/ProgressBar";
import Caretacker from "../../../assets/images/Caretacker.png"
import profilepic from "../../../assets/images/profilepic.png"
const HomePage = () => {
  const reminders = [
    { time: "08:00 AM", activity: "Morning walk" },
    { time: "12:00 PM", activity: "Lunch break" },
    { time: "03:00 PM", activity: "Meeting" },
  ];

  return (
    <div className="main1">
      <div className="nav-bar">
        <SideBar/>
      </div>
      <div className="pages">
        <div className="header">
          <div className="card" id="card1">
            <div className="card-body" id="heading">
                <div><h5>Welcome back...</h5>
                <p>Upgrade your crowd by surrounding yourself with supportive, 
                and uplifting individuals who encourage positivity.</p></div>
                <div className="imgconatiner"><img src={Caretacker} alt="" /></div>
            </div>
          </div>
          <div className="card" id="card2"><div className="card-title"><h6>Profile</h6></div>
            <div className="card-body" id="profile">
              <div><img src={profilepic} alt="" /></div>
              <div><p>Dr Caretaker</p> <br /><p>Occupation:MBBS</p><p>Age:30</p></div>
          </div></div>
          <div className="card" id="card3"><div className="card-title">User Upadate</div></div>
        </div>
        <div className="line"><h2>User's Profile</h2></div>
        <div className="content">
        <div class="accordion" id="accordionPanelsStayOpenExample">
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <div className="acc-img">
          <img src={profilepic} alt="" />
        </div>
        <div><strong>Chris Evan</strong></div>
        <div>,Califonia,USA</div>
        
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
      <div class="accordion-body">
        
        <div className="card"><div className="card-body">  <CircularProgressBar value={75}/><span>1 Hour walk</span></div> </div>
        <div className="card"><div className="card-body">  <CircularProgressBar value={75}/><span>Yoga</span></div> </div>
        <div className="card"><div className="card-body">  <CircularProgressBar value={85}/><span>Exericse</span></div> </div>
        <div className="card" id="progress"><div className="card-body">
        <span>Remainder   50%</span>
          <Progress progress={50}/>
          <span>goal      60%</span>
          <Progress progress={60}/>
          <span>habits    80%</span>
          <Progress progress={80}/>
        </div></div>
        <div className="card"><div className="card-body">
          <Table reminders={reminders}/>  
        </div></div>
        <div className="card"><div className="card-body">
          <Table reminders={reminders}/>  
        </div></div>
        

      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      <div className="acc-img">
          <img src={profilepic} alt="" />
        </div>
        <div><strong>Chris Evan</strong></div>
        <div>,Califonia,USA</div>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" class="accordion-collapse collapse">
      <div class="accordion-body">
        <div className="card"><div className="card-body">  <CircularProgressBar value={75}/><span>1 Hour walk</span></div> </div>
        <div className="card"><div className="card-body">  <CircularProgressBar value={75}/><span>Yoga</span></div> </div>
        <div className="card"><div className="card-body">  <CircularProgressBar value={85}/><span>Exericse</span></div> </div>
        <div className="card" id="progress"><div className="card-body">
        <span>Remainder   50%</span>
          <Progress progress={50}/>
          <span>goal      60%</span>
          <Progress progress={60}/>
          <span>habits    80%</span>
          <Progress progress={80}/>
        </div></div>
        <div className="card"><div className="card-body">
          <Table reminders={reminders}/>  
        </div></div>
        <div className="card"><div className="card-body">
          <Table reminders={reminders}/>  
        </div></div>
      </div>
    </div>
  </div>
  
</div>
        </div>
      <br />
      
      </div>
    </div>
  );
};

export default HomePage;
