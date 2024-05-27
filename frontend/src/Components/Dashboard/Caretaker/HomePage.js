import React from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Caretacker from "../../../assets/images/Caretacker.png"
import profilepic from "../../../assets/images/profilepic.png"
import UserNav from "../../userDashboard/UserNav";
import Assigned from "./Assigned";
import CareAdd from "./CareAdd";
import CareProfile from "../dashComponents/CareProfile"
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
// import CareProfile from "../dashComponents/CareProfile"
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
      
      <CareProfile/>
      
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
              <div><img src="" alt="" /></div>
              <div id="careTaker-Deatils"><p><strong>Dr Caretaker</strong> </p><p>Occupation:MBBS</p><p>Age:30</p></div>
          </div></div>
          <div className="card" id="card3"><div className="card-title"><h6>User Update</h6></div>
          <div className="card-body">
          <AvatarGroup max={24}>
            <Avatar alt="Remy Sharp" src={profilepic} />
            <Avatar alt="Travis Howard" src={profilepic} />
            <Avatar alt="Cindy Baker" src={profilepic} />
            <Avatar alt="Agnes Walker" src={profilepic} />
            </AvatarGroup>
          </div>
          </div>
        </div>
        
        <div className="content">
        <nav>
  <div class="nav nav-tabs" id="nav-tab" role="tablist">
    <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true"><strong>Assigned User</strong></button>
    <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false"><strong>Unassigned User</strong></button>
  </div>
</nav>
        <div className="profile-heading">
          <div id='ass-name'><strong>Name</strong></div>
          <div id='ass-phno'><strong>Ph no</strong></div>
          <div id='ass-disease'><strong>Disease</strong></div>
          <div id='ass-allergy'><strong>Allergy</strong></div>
        </div>
        
        <div class="tab-content" id="nav-tabContent">
  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab" tabindex="0"><Assigned/></div>
  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab" tabindex="0"><CareAdd/></div>
  </div>

        </div>
      <br />
      </div>
    </div>
  );
};

export default HomePage;
