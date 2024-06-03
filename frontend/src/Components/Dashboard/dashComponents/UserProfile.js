import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "../dashComponents/Notification";
import Constants from "../../../constants";
import { toast } from "react-toastify";
const UserProfile = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phoneno: "",
    age: "",
    gender: "",
    disease: "",
    allergy: ""
  });

  const handleSumit = (e) => {
    e.preventDefault();
    console.log(formData);
    updateUserDetail();
  }

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    window.location.reload()
  };

  const [userDetail, setUserDetail] = useState(null);
  const getUserDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + '/api/user/profile', {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        }
      })
      if (response.status === 401) {
        navigate('/login');
        localStorage.clear()
      }
      const data = await response.json();
      if (data.status === 'success') {
        // console.log("ho gya");
        data.user ? setUserDetail(data.user) : setUserDetail(null)
        setFormData({
          firstname: data.user.firstname || "",
          lastname: data.user.lastname || "",
          email: data.user.email || "",
          phoneno: data.user.phoneno || "",
          age: data.user.age || "",
          gender: data.user.gender || "",
          disease: data.user.diseases || "",
          allergy: data.user.allergies || ""
        })
        localStorage.setItem("caretakerId", data.user.caretaker)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error);
    }
  }

  const updateUserDetail = async () => {
    try {
      const token = localStorage.getItem("token");
      const body = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        age: formData.age,
        gender: formData.gender,
        diseases: formData.disease != "" ? formData.disease.split(",") : [],
        allergies: formData.allergy != "" ? formData.allergy.split(",") : []
      }
      console.log(formData, body)
      const response = await fetch(Constants.BASE_URL + "/api/user/update-profile", {
        method: 'PATCH',
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify(body)
      })
      if (response.status === 400) {
        toast.error(response.message);
      }
      const data = await response.json();
      if (data.status === 'success') {
        toast.success(data.message)
      }
      else {
        toast.error(data.message)
      }
    }
    catch (error) {
      toast.error(error);
    }

  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      getUserDetail()
    }
  }, [])
  return (
    <div>
      <div
        class="modal fade"
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
              <div>
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop1"
                  style={{ backgroundColor: "#e0dcf8", width: "100%", marginBottom: "3px" }}>
                  Edit Profile
                </button>
              </div>
              {/* <div>
                <button
                  type="button"
                  class="btn"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                  style={{ backgroundColor: "#e0dcf8", width: "100%" ,marginBottom:"3px"}}>
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
                  style={{ backgroundColor: "#e0dcf8", width: "100%" }}
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
            <form onSubmit={handleSumit}>
              <div className="modal-body">
                <div
                  className="profile-header"
                  style={{ display: "flex", justifyContent: "flex-start" }}>
                  <div
                    style={{
                      width: "150px",
                      height: "150px",
                      borderRadius: "100%",
                      background: "#9186d9",
                      marginTop: "-20%",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"center",
                      fontSize: '40px',
                      color:"white"
                    }}>{userDetail?.firstname[0] ||""}</div>
                  {userDetail &&
                    <div>
                      <strong>{userDetail.firstname} {userDetail.lastname}</strong> <p>{userDetail.email}</p>
                    </div>
                  }
                </div>
                <div
                  className="profile-body"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                  }}>
                  <div className="profile-left">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        First Name
                      </label>
                      <input type="text" class="form-control" name="firstname" value={formData.firstname} onChange={(e) => setFormData({ ...formData, firstname: e.target.value })} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email
                      </label>
                      <input type="email" class="form-control" name="lastname" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Age
                      </label>
                      <input type="number" class="form-control" name="age" value={formData.age} onChange={(e) => setFormData({ ...formData, age: e.target.value })} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Disease
                      </label>
                      <input type="text" class="form-control" name="disease" value={formData.disease} onChange={(e) => setFormData({ ...formData, disease: e.target.value })} />
                    </div>
                  </div>
                  <div className="profile-right">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Last Name
                      </label>
                      <input type="text" class="form-control" name="lastname" value={formData.lastname} onChange={(e) => setFormData({ ...formData, lastname: e.target.value })} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Phone Number
                      </label>
                      <input type="number" class="form-control" name="phoneno" value={formData.phoneno} onChange={(e) => setFormData({ ...formData, phoneno: e.target.value })} />
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Gender
                      </label>
                      <select class="form-select" aria-label="Default select example" name="gender" value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                        <option selected>Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Allergy
                      </label>
                      <input type="text" class="form-control" name="allergy" value={formData.allergy} onChange={(e) => setFormData({ ...formData, allergy: e.target.value })} />
                    </div>
                  </div>
                </div>

              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  data-bs-dismiss="modal">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* setting model */}
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

export default UserProfile;
