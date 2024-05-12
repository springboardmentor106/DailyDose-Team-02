import './User.css'
// import dailyim from '../Images/User.png'
// import SideBar from "../User/SideBar"
import UserNav from '../../userDashboard/UserNav';
import Chart from '../dashComponents/Chart'
import CircularProgressBar from '../dashComponents/ProgressBar';
import ReminderList from './ReminderList';
import ReactCalendar from '../dashComponents/Calendar';
const Dashboard = () => {
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
        <div className="dashboard">
          <UserNav/>
       <div className="left-side">
       <div className="row-one">
          <div className="row-one-card-one">
            <h2>Welcome Back...</h2>
            <div className="lower-side">
            <p>Have a nice day and don't forget take your pills...</p>
              <div className="img-container">
                {/* <img src= {dailyim}alt="" /> */}
              </div>
            </div>
          </div>
          <div className="row-one-card-two">
          <div className="circle-das">

         </div>
          <div className="details-das">
              <h3 id='Details-user-das'>Mrs. User xyz</h3>
              <div className="Additional">
             <div className="Additional-row-one-das">
              <h3>49</h3>
              <h3>Delhi, India</h3>
             </div>
              </div>  
            </div>
          </div>
        </div>
         <div className="row-one-chart">
          <div className="row-one-card-one-dashboard">
            <Chart/>
          </div>
        </div>
           <div className="row-three">
        <div className="row-three-card">
          <h2 id='progres'>Progress</h2>
          <div className="box-left-top">
              <div><CircularProgressBar value={55} /> </div> <br />
            </div>
        </div>
        <div className="row-three-card">
          <h2 id='about'>About User</h2>
        </div>
        </div>

       </div>
       <div className="right-side">
        <div className="right-card-one">
          <ReactCalendar/>

        </div>
        <div className="right-card-two">
        <ReminderList reminders={reminders} />
        </div>
       </div>
      </div>
     );
  };
  export default Dashboard;