import './Dashboard.css'
import UserNav from '../../userDashboard/UserNav';
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar';
import ReminderList from './ReminderList';
import ReactCalendar from '../dashComponents/Calendar';
import dailyimg from "../../../assets/images/User.png"
import { IoLocationSharp } from "react-icons/io5";
import { IoOptionsOutline } from "react-icons/io5";
import { profileinfo } from './StaticDataUser';
import { reminders } from './StaticDataUser';
const Dashboard = () => {
     return (
        <div className="dashboard">
          <UserNav/>
       <div className="left-side">
       <div className="row-one">
          <div className="row-one-card-one">
            <h5> <strong>Welcome Back...</strong> </h5>
            <div className="lower-side">
            <p>Have a nice day and don't forget take your pills...</p>
              <div className="img-container">
                <img src= {dailyimg}alt="" />
              </div>
            </div>
          </div>
          <div className="row-one-card-two">
            <div className="profile-name-conainter">
              <div className="profile-name">
              
              </div>
            </div>
        <div className="row-user-detail-container">
        <div className="circle-das">

</div>
 <div className="details-das">
         {profileinfo.map((profile,index)=>(
     <div className="card-user" key={index}><div className="card-body">
       <h6><strong>{profile.name}</strong></h6>
       <p>Age: {profile.age}</p>
       <p><IoLocationSharp /> {profile.location}</p>
     </div></div>
   ))}
   </div>
        </div>
          </div>
        </div>
         <div className="row-one-chart">
          <div className="chart-heading">
            <h5><strong>Goal Progress</strong></h5>
          </div>
          <div className="row-one-card-one-dashboard">
            <Chart/>
          </div>
        </div>
           <div className="row-three">
        <div className="row-three-card">
          <h5 id='progres'><strong>Progress</strong></h5>
          <div className="box-left-top">
              <div id='CircularProgressBar'><CircularProgressBar value={55} /> </div> <br />
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
       <div className="right-side">
        <div className="right-card-one">
          <ReactCalendar/>
        </div>
        <div className="card-center-details">
          <div className="Des-Rem">
          Reminder
          </div>
          <div className="Des-goal">
            Goal
          </div>
          <div className="Des-Hebit">
            Habit
          </div>
          <div className="des-option-icon">
          <IoOptionsOutline />
          </div>
        </div>
        <div className="right-card-two">
        <ReminderList reminders={reminders} />
        </div>
       </div>
      </div>
     );
  };
  export default Dashboard;