import './dashboard.css'
import CircularProgressBar from '../UserComponents/Progressbar';
import Progress from '../UserComponents/Progress'
import Calendar from 'react-calendar';
import UserRouts from '../utils/UserRouts';
// import Table from './Table';
import ReminderList from '../UserComponents/ReminderList';
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
          <div>
           <UserRouts/>
          </div>
       <div className="left-side">
       <div className="row-one">
          <div className="row-one-card-one">
            <h2>Welcome Back...</h2>
            <div className="lower-side">
            <p>Have a nice day and don't forget take your pills...</p>
              <div className="img-container">
                <img src="" alt="" />
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
        <div className="row-two">
          <div className="card">
          <div className="box-left-top-dashboard">
              <div><CircularProgressBar value={40} /> <span>1-hour walk</span></div> <br />
            </div>
          </div>
          <div className="card">
          <div className="box-left-top-dashboard">
              <div><CircularProgressBar value={61} /> <span>Water Balence</span></div> <br />
            </div>
          </div>
          <div className="card">
          <div className="box-left-top-dashboard">
              <div><CircularProgressBar value={86} /> <span>Exercise</span></div> <br />
            </div>
          </div>
        </div>
        <div className="row-three">
        <div className="row-three-card">
        <div className="box-left-down-left">
                <h3 id='heading-box-left-down-left'>Monthly analysis</h3>
                <div className="collection">
                <div id='progress-bars'><span>Goal    60%</span><Progress progress={80}/></div>
                <div id='progress-bars'><span>Habit   85%</span><Progress progress={85}/></div>
                <div id='progress-bars'><span>Hobbies 60%</span><Progress progress={60}/></div>
                </div>
              </div>
        </div>
        <div className="row-three-card">
        <div className="calendar-card">
            <div className="calendar-container">
                <Calendar />
            </div>
        </div>
        </div>
        </div>
       </div>
       <div className="right-side">
        <div className="right-card-one">
        <ReminderList reminders={reminders} />
        </div>
        <div className="right-card-two">
        <ReminderList reminders={reminders} />
        </div>
       </div>
      </div>
     );
  };
  export default Dashboard;