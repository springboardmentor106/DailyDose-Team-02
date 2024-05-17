import React from "react";
import "./Pages.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";

import Caretacker from "../../../assets/images/Caretacker.png"
import profilepic from "../../../assets/images/profilepic.png"
import UserNav from "../../userDashboard/UserNav";
import CircularProgressBar from "./CircularProgressbar";
const HomePage = () => {
  const reminders = [
    { time: "08:00 AM", activity: "Morning walk" },
    { time: "12:00 PM", activity: "Lunch break" },
    { time: "03:00 PM", activity: "Meeting" },
  ];
  return (
    <div className="main1">
      <div className="nav-bar">
        <UserNav/>
      </div>
      <div className="pages">
        <div className="header">
          <div className="card" id="card1">
            <div className="card-body" id="heading">
                <div ><strong><h3> Welcome back...</h3></strong>
                <p>Upgrade your crowd by surrounding yourself with supportive, 
                and uplifting individuals who encourage positivity.</p></div>
                <div className="imgconatiner"><img src={Caretacker} alt="" /></div>
            </div>
          </div>
          <div className="card" id="card2"><div className="card-title"><h6>Profile</h6></div>
            <div className="card-body" id="care-profile">
              <div><img src={profilepic} alt="" /></div>
              <div id="careTaker-Deatils"><p><strong>Dr Caretaker</strong> </p><p>Occupation:MBBS</p><p>Age:30</p></div>
          </div></div>
          <div className="card" id="card3"><div className="card-title"><h6>User Update</h6></div></div>
        </div>
        <div className="line"><h2>User's Profile</h2></div>
        <div className="content">
        <div class="accordion" id="accordionPanelsStayOpenExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <div className="acc-img">
          <img src={profilepic} alt="" />
        </div>
        <div><strong>Chris Evan</strong></div>
        <div>,Califonia,USA</div>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
      <div className="accordion-body" id="home-content">
        <div className="home-col-one">
          <div className="home-row-one">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
          </div>
          <div className="home-row-two">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
          </div>
        </div>
        <div className="home-col-two">
          <div className="card"><div className="card-body">
            <div> <strong>Progress </strong></div>
            <span>Remainder   50%</span>
            <Progress progress={50}/>
            <span>goal      60%</span>
            <Progress progress={60}/>
            <span>habits    80%</span>
            <Progress progress={80}/>
          </div></div>
        </div>
        <div className="home-col-three">
          <div className="card"><div className="card-body">
          <Table reminders={reminders}/>    
          </div></div>
        </div>
        <div className="home-col-four">
          <div className="card"><div className="card-body">
          <Table reminders={reminders}/>    
          </div></div>
        </div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo">
      <div className="acc-img">
          <img src={profilepic} alt="" />
        </div>
        <div><strong>Chris Evan</strong></div>
        <div>,Califonia,USA</div>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
      <div className="accordion-body" id="home-content">
      <div className="home-col-one">
          <div className="home-row-one">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
          </div>
          <div className="home-row-two">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={75}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
          </div>
        </div>
        <div className="home-col-two">
          <div className="card"><div className="card-body">
            <div> <strong>Progress </strong></div>
            <span>Remainder   50%</span>
            <Progress progress={50}/>
            <span>goal      60%</span>
            <Progress progress={60}/>
            <span>habits    80%</span>
            <Progress progress={80}/>
          </div></div>
        </div>
        <div className="home-col-three">
          <div className="card"><div className="card-body">
          <Table reminders={reminders}/>    
          </div></div>
        </div>
        <div className="home-col-four">
          <div className="card"><div className="card-body">
          <Table reminders={reminders}/>    
          </div></div>
        </div>
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
