import React, { useState } from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "./CircularProgressbar";
import profilepic from "../../../assets/images/profilepic.png";
import { AssignedUser } from "./StaticDataCare";

const Assigned = ({ assignedUserDetails }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div>
      <div className="accordion" id="accordionExample">
        {assignedUserDetails &&
          assignedUserDetails.map((assignedUser, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}>
                  <div className="ass-user-detail">
                    <div>
                      <div className="acc-img">
                        <img src={profilepic} alt="" />
                      </div>
                      <strong>
                        {assignedUser.firstname} {assignedUser.lastname}
                      </strong>
                    </div>
                    <div>
                      <p>{assignedUser.email}</p>
                    </div>
                    <div>
                      <p>{assignedUser.disease || "--"}</p>
                    </div>
                    <div>
                      <p>{assignedUser.allergy || "--"}</p>
                    </div>
                  </div>
                  <button className="btn btn-light">
                    <p>Show More</p>
                  </button>
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapse${index}`}
                className={`accordion-collapse collapse ${
                  activeIndex === index ? "show" : ""
                }`}>
                <div className="accordion-body" id="home-content">
                  <div className="home-col-one">
                    <div className="home-row-one">
                      <div className="card">
                        <div className="card-body">
                          <div id="dis">
                            <strong>Goal progress</strong>
                          </div>
                          <div>
                            {assignedUser.goals.length ? (
                              <CircularProgressBar
                                value={assignedUser.progress.complete || 0}
                              />
                            ) : (
                              <div>
                                No goals yet. Progress will be updated when you
                                complete your goals.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="home-col-two">
                    <div className="card">
                      <div className="card-body">
                        <Table data={assignedUser.reminders} type="Reminders" />
                      </div>
                    </div>
                  </div>
                  <div className="home-col-two">
                    <div className="card">
                      <div className="card-body">
                        <Table data={assignedUser.goals} type="Goals" />
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

export default Assigned;
