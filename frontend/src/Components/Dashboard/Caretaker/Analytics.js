import React from 'react'
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar'
import './Pages.css'
import Calendar from '../dashComponents/Calendar'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReminderList from '../User/ReminderList';
import profilepic from "../../../assets/images/profilepic.png"
import UserNav from '../../userDashboard/UserNav'
import { AiFillSliders } from "react-icons/ai";
import { profileinfo } from './StaticDataCare'
import { reminders } from './StaticDataCare'
import Slider from "react-slick";

const Analytics = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
  };
  return (
      <div className="ana-main" >
        <div className="nav-bar">
          <UserNav/>
        </div>
        <div className="Analytics-pages">
        <div className="ana-left-side">
        
          <div className="ana-user">
          {/* <Slider {...settings}> */}
            {profileinfo.map((profile,index)=>(
              <div className="card" key={index}><div className="card-body" id="ana-card-body">
                <img src={profilepic} alt="" />
                <h6><strong>{profile.name}</strong></h6>
                <p>{profile.email}</p>
                <p>Age: {profile.age}</p>
                <p>Blood: {profile.blood}</p>
              </div></div>
            ))}
            {/* </Slider> */}
          </div>
          {/* <div>
            <Cardlist profileinfo={profileinfo}/>
          </div> */}
          
          <div className="ana-chart">
            <div className="card"><div className='card-body'>
              <div id="ana-bargraph"><Chart/></div>
            <div  className="btn-group">
              <button  className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Monthy</button>
              <ul  className="dropdown-menu">
                <li><a  className="dropdown-item" href="#">Monthly</a></li>
                <li><a  className="dropdown-item" href="#">Weekly</a></li>
              </ul>
            </div>
            </div></div>
          </div>
          <div className="row-three" id="ana-progress">
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
        
        <div className="ana-right-card-two">
          
          {/* <ul className="nav nav-underline" id="ana-select">
            <li className="nav-item">
            <a className="nav-link active" aria-current="page" href="#">Goal</a>
            </li>
          <li className="nav-item">
    <a className="nav-link" href="#">Reminder</a>
  </li>
  <li className="nav-item">
    <a className="nav-link" href="#">Goal</a>
  </li>
  
  <li className="nav-item">
    <a className="nav-link " ><AiFillSliders /></a>
  </li>
</ul> */}
        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
  <li className="nav-item" role="presentation">
    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">Goal</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Reminder</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Habit</button>
  </li>
  <li className="nav-item" role="presentation">
    <button className="nav-link" id="pills-disabl-tab" data-bs-toggle="pill" data-bs-target="#pills-disabled" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false"><AiFillSliders /></button>
  </li>
</ul>
<div className="tab-content" id="pills-tabContent">
  <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabindex="0"><div className="ana-reminder">
          <ReminderList reminders={reminders} />
          </div></div>
  <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabindex="0"><div className="ana-reminder">
          <ReminderList reminders={reminders} />
          </div></div>
  <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabindex="0"><div className="ana-reminder">
          <ReminderList reminders={reminders} />
          </div></div>
  <div className="tab-pane fade" id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabindex="0">...</div>
</div>
          {/* <div className="ana-reminder">
          <ReminderList reminders={reminders} />
          </div> */}
        
        </div>
          </div>
        </div>
        </div>
  )
}

export default Analytics
