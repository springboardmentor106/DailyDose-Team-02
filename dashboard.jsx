import './dashboard.css'
import Calendar from 'react-calendar';
const Dashboard = () => {
     return (
        <div className="dashboard">
       <div className="left-side">
       <div className="row-one">
          <div className="row-one-card-one">
            <h2>Welcome Back...</h2>
            <p>Have a nice day a don't forget take your pills</p>
          </div>
          <div className="row-one-card-two">
        
          </div>
        </div>
        <div className="row-two">
          <div className="card">Card 3</div>
          <div className="card">Card 4</div>
          <div className="card">Card 5</div>
        </div>
        <div className="row-three">
        <div className="row-three-card">Card 1</div>
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
        <div className="right-card-one">card 6</div>
        <div className="right-card-two">card 7</div>
       </div>
      </div>
     );
  };
  export default Dashboard;