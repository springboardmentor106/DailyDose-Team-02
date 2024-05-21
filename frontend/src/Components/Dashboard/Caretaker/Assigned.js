import React from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "./CircularProgressbar";
import profilepic from "../../../assets/images/profilepic.png";
import { AssignedUser } from "./StaticDataCare";
const Assigned = () => {
  return (
    <div>
      <div class="accordion" id="accordionExample">
        {AssignedUser.map((assignedUser, index) => (
          <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne">
                <div className="acc-img">
                  <img src={profilepic} alt="" />
                </div>
                <div className="ass-user-detail">
                  <div>
                    <strong>{assignedUser.name}</strong>
                  </div>
                  <div>
                    <p>{assignedUser.phno}</p>
                  </div>
                  <div>
                    <p>{assignedUser.disease}</p>
                  </div>
                  <div>
                    <p>{assignedUser.allergy}</p>
                  </div>
                </div>
                <button className="btn btn-light">
                  <p>Show More</p>
                </button>
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse show">
              <div className="accordion-body" id="home-content">
                <div className="home-col-one">
                  <div className="home-row-one">
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <CircularProgressBar value={assignedUser.walk} />
                        </div>
                        <div id="dis">
                          <strong>1 hour walk</strong>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <CircularProgressBar value={assignedUser.exercise} />
                        </div>
                        <div id="dis">
                          <strong>Exercise</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home-row-two">
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <CircularProgressBar
                            value={assignedUser.meditation}
                          />
                        </div>
                        <div id="dis">
                          <strong>Meditation</strong>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <div>
                          <CircularProgressBar value={assignedUser.sleep} />
                        </div>
                        <div id="dis">
                          <strong>Sleeping</strong>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-col-two">
                  <div className="card">
                    <div className="card-body">
                      <div>
                        {" "}
                        <strong>Progress </strong>
                      </div>
                      <span>Remainder {assignedUser.reminds}</span>
                      <Progress progress={assignedUser.reminds} />
                      <span>goal {assignedUser.goal}</span>
                      <Progress progress={assignedUser.goal} />
                      <span>habits {assignedUser.habit}</span>
                      <Progress progress={assignedUser.habit} />
                    </div>
                  </div>
                </div>
                {/* <div className="home-col-three">
                  <div className="card">
                    <div className="card-body">
                      <Table reminders={assignedUser.reminders} />
                    </div>
                  </div>
                </div> */}
                {/* <div className="home-col-four">
                  <div className="card">
                    <div className="card-body">
                      <Table reminders={assignedUser.reminders} />
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assigned;
