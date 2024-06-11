import React from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../dashComponents/Notification";
const CareProfile = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload()
  };

  return (
    <div>
      <div
        class="modal"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div
            className="modal-content"
            style={{
              backgroundColor: "#6a58dc",
              width: "fit-content",
              bottom: "3vh",
              left: "110px",
              position: "fixed"
            }}>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-evenly",
              }}>
              {/* <div>
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1"
                  style={{ backgroundColor: "#e0dcf8", width: "100%",marginBottom:"3px" }}>
                  Edit Profile
                </button>
              </div> */}
              {/* <div>
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                  style={{ backgroundColor: "#e0dcf8", width: "100%",marginBottom:"3px" }}>
                  Setting
                </button>
              </div> */}
              <div>
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop3"
                  style={{ backgroundColor: "#e0dcf8", width: "100%", marginBottom: "3px" }}>
                  Notification
                </button>
              </div>
              <div>
                <button
                  type="button"
                  class="btn"
                  style={{ backgroundColor: "#e0dcf8", width: "100%", marginBottom: "3px" }}
                  onClick={() => handleLogout()}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ----Model----- */}
      <div
        className="modal fade"
        id="staticBackdrop1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                backgroundImage: "linear-gradient(to right,#e7ccf9,#b7d7f3)",
                height: "90px",
              }}>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
              }}>
              <div
                style={{
                  width: "150px",
                  height: "150px",
                  borderRadius: "100%",
                  background: "#9186d9",
                  marginTop: "-20%",
                }}></div>
              <div>
                <strong>Username</strong> <p>username@gmail.com</p>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                data-bs-dismiss="modal">
                Cancel
              </button>
              <button type="button" className="btn btn-primary btn-sm">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*---- Model-setting ----- */}
      <div
        className="modal fade"
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="staticBackdropLabel">
                Setting
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"></button>
            </div>
            <div
              className="modal-body"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
              }}>
              <div
                class="form-check form-switch"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Dark Mode</strong>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>
              <div
                class="form-check form-switch"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Notification</strong>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>
              <div
                class="form-check form-switch"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Google calender</strong>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>
              <div
                class="form-check form-switch"
                style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <strong>Location</strong>
                </div>
                <div>
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Notification />
    </div>
  );
};

export default CareProfile;
