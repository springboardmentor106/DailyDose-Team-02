import React, { useState } from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Progress from "../dashComponents/Progress";
import Table from "../dashComponents/Table";
import CircularProgressBar from "./CircularProgressbar";
import profilepic from "../../../assets/images/profilepic.png";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Constants from "../../../constants";

const CareAdd = ({ unAssignedUserDetails, setRefresh }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [buttonTest, setButtonText] = useState('Show More')
  const navigate = useNavigate();
  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const assignUserToCaretaker = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/caretaker/assign-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ userId: userId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        toast.success(data.message);
        setRefresh(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  return (
    <div className="content">
      <div className="accordion" id="accordionExample">
        {unAssignedUserDetails && unAssignedUserDetails.length > 0
          ? unAssignedUserDetails.map((unassign, index) => (
            <div className="accordion-item" key={index}>
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  // onClick={() => toggleAccordion(index)}
                  aria-expanded={activeIndex === index}
                  aria-controls={`panelsStayOpen-collapse-${index}`}>
                  <div className="ass-user-detail">
                    <div>
                      <div className="acc-img">
                        <img src={profilepic} alt="" />
                      </div>
                      <strong>{unassign.firstname}</strong>
                    </div>
                    <div>
                      <p>{unassign.email}</p>
                    </div>
                    <div>
                      <p>{unassign.disease || "--"}</p>
                    </div>
                    <div>
                      <p>{unassign.allergy || "--"}</p>
                    </div>
                  </div>
                  <div id="caretaker-action-btns">
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      id="getAssign"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop" key={index}>
                      Get Assigned
                    </button>
                    <button
                      type="button"
                      className="btn btn-light btn-sm"
                      id="getAssign" key={index}
                      onClick={() => toggleAccordion(index)}>
                      {activeIndex===index ? "Show Less" : "Show More"}
                    </button>
                  </div>
                </button>
              </h2>
              <div
                id={`panelsStayOpen-collapse-${index}`}
                className={`accordion-collapse collapse ${activeIndex === index ? "show" : ""
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
                            {unassign.goals.length ? (
                              <CircularProgressBar
                                value={unassign.progress.complete || 0}
                              />
                            ) : (
                              <div>
                                No goals yet. rogress will be updated when you
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
                        <Table
                          reminders={unassign.reminders}
                          type="Reminders"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="home-col-two">
                    <div className="card">
                      <div className="card-body">
                        <Table reminders={unassign.goals} type="Goals" />
                      </div>
                    </div>
                  </div>
                </div>
                <div id="toAssign">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop" key={index}>
                    Click to assign
                  </button>
                </div>
              </div>
            </div>
          ))
          : null}

      </div>
      {unAssignedUserDetails && unAssignedUserDetails.length > 0 ? unAssignedUserDetails.map((unassign, index) => (
        <div className="modal fade"
          id="staticBackdrop" key={index}
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1
                  className="modal-title fs-5"
                  id="exampleModalLabel">
                  Caretaker Responsibility
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>&#8226; Provide Emotional Support</p>
                <p>&#8226; Helping daily activities</p>
                <p>&#8226; Managing medical care</p>
                <p>&#8226; Advocating the User needs</p>
                <br />
                <p>
                  If you have any questions about your
                  responsibilities as a caretaker, Please contact
                  the User. Thank you for your willingness to be a
                  caretaker!
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                  onClick={() =>
                    assignUserToCaretaker(unassign.uuid)
                  }
                >Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )) : null}

    </div>
  );
};

export default CareAdd;
