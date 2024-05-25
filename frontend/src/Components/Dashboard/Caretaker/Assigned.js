import React from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "./CircularProgressbar";
import profilepic from "../../../assets/images/profilepic.png"
import { AssignedUser } from './StaticDataCare'
const Assigned = ({ assignedUserDetails }) => {
  return (
    <div>

      <div className="accordion" id="accordionExample" >
        {assignedUserDetails && assignedUserDetails.map((assignedUser, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">

              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
                <div className="acc-img">
                  <img src={profilepic} alt="" />
                </div>
                <div className="ass-user-detail">
                  <div><strong>{assignedUser.firstname} {assignedUser.lastname}</strong></div>
                  <div><p>{assignedUser.email}</p></div>
                  <div><p>{assignedUser.disease || "--"}</p></div>
                  <div><p>{assignedUser.allergy || "--"}</p></div>
                </div>
                <button className="btn btn-light"><p>Show More</p></button>
              </button>
            </h2>
            <div id="panelsStayOpen-collapseOne" class="accordion-collapse collapse show">
              <div className="accordion-body" id="home-content">
                <div className="home-col-one">
                  <div className="home-row-one">
                    <div className="card"><div className="card-body">
                      <div id="dis"><strong>Goal progress</strong></div>
                      <div><CircularProgressBar value={assignedUser.progress.complete} /></div>
                    </div></div>
                  </div>
                </div>
                {/* <div className="home-col-two">
                  <div className="card"><div className="card-body">
                    <div> <strong>Progress </strong></div>
                    <span>Remainder   {assignedUser.reminds}</span>
                    <Progress progress={assignedUser.reminds} />
                    <span>goal      {assignedUser.goal}</span>
                    <Progress progress={assignedUser.goal} />
                    <span>habits    {assignedUser.habit}</span>
                    <Progress progress={assignedUser.habit} />
                  </div></div>
                </div> */}
                <div className="home-col-three">
                  <div className="card"><div className="card-body">
                    <Table reminders={assignedUser.reminders} type="Reminders" />
                  </div></div>
                </div>
                <div className="home-col-four">
                  <div className="card"><div className="card-body">
                    <Table reminders={assignedUser.goals} type="Goals" />
                  </div></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Assigned
