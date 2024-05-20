import React from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "./CircularProgressbar";
import profilepic from "../../../assets/images/profilepic.png"

import { UnAssignedUser } from "./StaticDataCare";
const CareAdd = () => {

  return (
    
        <div className="content">
        <div class="accordion" id="accordionExample">
        {UnAssignedUser.map((unassign,index)=>(
  <div className="accordion-item" key={index}>
    <h2 className="accordion-header">
      <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
        <div className="acc-img">
          <img src={profilepic} alt="" />
        </div>
        <div className="ass-user-detail">
            <div><strong>{unassign.name}</strong></div>
            <div><p>{unassign.phno}</p></div>
            <div><p>{unassign.disease}</p></div>
            <div><p>{unassign.allergy}</p></div>
        </div>
        <div><button type="button" className="btn btn-light btn-sm" id="getAssign" style={{marginLeft:"10px"}}>Get Assigned</button></div> <br />
        <div><button type="button" className="btn btn-light btn-sm" id="getAssign">Show More</button></div>
      </button>
    </h2>
    <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show">
    <div className="accordion-body" id="home-content">
        <div className="home-col-one">
          <div className="home-row-one">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={unassign.walk}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={unassign.exercise}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>
            </div></div>
          </div>
          <div className="home-row-two">
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={unassign.meditation}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
            <div className="card"><div className="card-body">
              <div><CircularProgressBar value={unassign.sleep}/></div>  
              <div id="dis"><strong>1 hour walk</strong></div>  
            </div></div>
          </div>
        </div>
        <div className="home-col-two">
          <div className="card"><div className="card-body">
            <div> <strong>Progress </strong></div>
            <span>Remainder   {unassign.reminds}</span>
            <Progress progress={unassign.reminds}/>
            <span>goal      {unassign.reminds}</span>
            <Progress progress={unassign.goal}/>
            <span>habits    {unassign.reminds}</span>
            <Progress progress={unassign.habit}/>
          </div></div>
        </div>
        <div className="home-col-three">
          <div className="card"><div className="card-body">
          <Table reminders={unassign.reminders}/>    
          </div></div>
        </div>
        <div className="home-col-four">
          <div className="card"><div className="card-body">
          <Table reminders={unassign.reminders}/>    
          </div></div>
        </div>
      </div>
      <div id="toAssign">
      <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
  Click to assign 
</button>
      <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Caretaker Responsibility</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
         <p>&#8226; Provide Emotional Support</p> <p>&#8226; Helping daily activities</p> <p>&#8226; Manageing medical care</p> <p>&#8226; Advocating the User needs</p>
        <br /> <p>If you have any questions about your responsibilities as a caretaker,Please contact the User.Thank you for your willingness to be a caretaker!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-primary">Confirm</button>
      </div>
    </div>
  </div>
</div>
      
      </div>
    </div>
  </div>
  
))}
        </div>
        </div>
      
  );
};

export default CareAdd;
