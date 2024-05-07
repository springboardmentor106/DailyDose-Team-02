import './Analytics.css';
import Calendar from 'react-calendar';
import CircularProgressBar from '../UserComponents/Progressbar';
const Analytics = () => {
    return (
        <div className="dashboard-Analytics">
       <div className="left-side-Analytics">
        <div className="row-two-Analytics">
          <div className="card-Analytics">
          <div className="user-profile-card">
            <div className="circle">

            </div>
            <div className="details">
              <h3 id='Details-user'>Mrs.xyz</h3>
              <h4 id='Details-user'>abc@gmail.com</h4>
             <div className="Additional">
             <div className="Additional-row-one">
              <h3>49</h3>
              <h3>B+</h3>
             </div>
             <div className="Additional-row-two">
             <h4 id='Details-user'>Age</h4> 
              <h4 id='Details-user'>Blood</h4>
             </div>
              </div>           
            </div>
    </div>
          </div>
          <div className="card-Analytics">
          <div className="user-profile-card">
            <div className="circle">

            </div>
            <div className="details">
              <h3 id='Details-user'>Mrs.xyz</h3>
              <h4 id='Details-user'>abc@gmail.com</h4>
              <div className="Additional">
             <div className="Additional-row-one">
              <h3>49</h3>
              <h3>B+</h3>
             </div>
             <div className="Additional-row-two">
             <h4 id='Details-user'>Age</h4> 
              <h4 id='Details-user'>Blood</h4>
             </div>
              </div>  
            </div>
    </div>
          </div>
          <div className="card-Analytics">
          <div className="user-profile-card">
            <div className="circle">
          
            </div>
            <div className="details">
              <h3 id='Details-user'>Mrs.xyz</h3>
              <h4 id='Details-user'>abc@gmail.com</h4>
              <div className="Additional">
             <div className="Additional-row-one">
              <h3>49</h3>
              <h3>B+</h3>
             </div>
             <div className="Additional-row-two">
             <h4 id='Details-user'>Age</h4> 
              <h4 id='Details-user'>Blood</h4>
             </div>
              </div>  
            </div>
    </div>
          </div>
        </div>

        <div className="row-one-Analytics">
          <div className="row-one-card-one-Analytics">
            
          </div>
        </div>
        <div className="row-three-Analytics">
        <div className="row-three-card-Analytics">
          <h2>Progress</h2>
          <div className="box-left-top">
              <div><CircularProgressBar value={55} /> </div> <br />
            </div>
        </div>
        <div className="row-three-card-Analytics">
          <h2>About User</h2>
        </div>
        </div>
       </div>
       <div className="right-side-Analytics">
        <div className="right-box">
          <div className="celender-card">
              <Calendar/>
          </div>

        </div>
       </div>
      </div>
     );
}
export default Analytics;