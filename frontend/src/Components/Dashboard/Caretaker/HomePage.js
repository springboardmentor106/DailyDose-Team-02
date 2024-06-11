import React, { useEffect, useState } from "react";
import "./Homepage.css"; // Import your CSS file for styling
import Caretacker from "../../../assets/images/Caretacker.png";
import UserNav from "../../userDashboard/UserNav";
import Assigned from "./Assigned";
import CareAdd from "./CareAdd";
import Constants from "../../../constants";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CareProfile from "../dashComponents/CareProfile";

const HomePage = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [assignedUserDetails, setAssignedUserDetails] = useState(null);
  const [unAssignedUserDetails, setUnassignedUserDetails] = useState(null);
  const [updateUserCount, setUpdateUserCount] = useState(null);
  const [chartData, setChartData] = useState(null)
  const getUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + "/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        data.user ? setUserDetails(data.user) : setUserDetails(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUserGoals = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const caretakerId = localStorage.getItem("caretakerId");
      const response = await fetch(
        Constants.BASE_URL + "/api/goals/getTodayGoals",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ seniorCitizenId: userId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        return data.goals ? data.goals : null;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getAssignedUserGoals = async (assignedUsers) => {
    try {
      let usersGoals = [];
      for (let i = 0; i < assignedUsers.length; i++) {
        const userGoal = await getUserGoals(assignedUsers[i].uuid);
        if (userGoal) {
          usersGoals.push({ uuid: assignedUsers[i].uuid, goals: userGoal });
        }
      }
      return usersGoals;
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUserReminders = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/reminders/get-reminders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ seniorCitizenId: userId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        return data.reminders ? data.reminders : null;
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };
  const getAssignedUserReminders = async (assignedUsers) => {
    try {
      let userReminders = [];
      for (let i = 0; i < assignedUsers.length; i++) {
        const userReminder = await getUserReminders(assignedUsers[i].uuid);
        if (userReminder) {
          userReminders.push({
            uuid: assignedUsers[i].uuid,
            reminders: userReminder,
          });
        }
      }
      return userReminders;
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getGoalProgress = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/goals/daily-stats",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          body: JSON.stringify({ seniorCitizenId: userId }),
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        const completePercent = parseFloat(data.completePercent);
        const toStartPercent = parseFloat(data.toStartPercent);
        return { complete: completePercent, toStart: toStartPercent };
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  const getAssignedUserProgress = async (assignedUsers) => {
    try {
      let userProgress = [];
      for (let i = 0; i < assignedUsers.length; i++) {
        const progress = await getGoalProgress(assignedUsers[i].uuid);
        if (progress) {
          userProgress.push({
            uuid: assignedUsers[i].uuid,
            progress: progress,
          });
        }
      }
      return userProgress;
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getAssignedUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/caretaker/senior-detail",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        if (data.seniorArr) {
          const assignedUserGoals = await getAssignedUserGoals(data.seniorArr);
          const assignedUserReminders = await getAssignedUserReminders(
            data.seniorArr
          );
          const assignedUserProgress = await getAssignedUserProgress(
            data.seniorArr
          );
          const finalArray = [];
          data.seniorArr.forEach((user) => {
            const userUuid = user.uuid;
            const { firstname, lastname, age, gender, email, allergies, diseases } = user;

            // Get user goals
            const userGoals = assignedUserGoals
              ?.filter(goal => goal.uuid === userUuid)
              .map(goal => goal.goals);


            // Get user reminders
            const userReminders = assignedUserReminders
              ?.filter(reminder => reminder.uuid === userUuid)
              .map(reminder => reminder.reminders);

            // Get user progress
            const userProgress = assignedUserProgress
              ?.filter(progress => progress.uuid === userUuid)
              .map(progress => progress.progress);


            const userDetails = {
              firstname,
              lastname,
              age,
              gender,
              email,
              allergies, diseases,
              uuid: userUuid,
              goals: userGoals[0] || [],
              reminders: userReminders[0] || [],
              progress: userProgress[0] || {},
            };

            finalArray.push(userDetails);
          });
          console.log(finalArray);
          setAssignedUserDetails(finalArray);
          localStorage.setItem("assignedUsers", finalArray);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  const getUnassignedUserDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        Constants.BASE_URL + "/api/caretaker/all-unassigned-user",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
      }
      const data = await response.json();
      if (data.status === "success") {
        if (data.users) {
          const assignedUserGoals = await getAssignedUserGoals(data.users);
          const assignedUserReminders = await getAssignedUserReminders(
            data.users
          );
          const assignedUserProgress = await getAssignedUserProgress(
            data.users
          );
          const finalArray = [];

          data.users.forEach((user) => {
            const userUuid = user.uuid;
            const { firstname, lastname, age, gender, email, allergies, diseases } = user;

            const userGoals =
              assignedUserGoals?.map((goal) =>
                goal.uuid === userUuid ? goal.goals : null
              ) || {};
            const userReminders =
              assignedUserReminders?.map((reminder) =>
                reminder.uuid === userUuid ? reminder.reminders : null
              ) || {};
            const userProgress =
              assignedUserProgress?.map((progress) =>
                progress.uuid === userUuid ? progress.progress : null
              ) || {};

            const userDetails = {
              firstname,
              lastname,
              age,
              gender,
              email,
              allergies, diseases,
              uuid: userUuid,
              goals: userGoals[0] || [],
              reminders: userReminders[0] || [],
              progress: userProgress[0] || {},
            };

            finalArray.push(userDetails);
          });
          console.log(finalArray);
          setUnassignedUserDetails(finalArray);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token) {
      console.log(token);
      getUserDetails();
      getAssignedUserDetails();
      getUnassignedUserDetails();
    }
    setRefresh(false);
  }, [refresh === true]);

  const calculateNumberOfUsersStartedGoals = () => {
    const usersCount =
      assignedUserDetails &&
      assignedUserDetails.filter((user) => {
        return user.progress.complete > 0;
      });
    setUpdateUserCount(usersCount?.length);
  };

  useEffect(() => {
    calculateNumberOfUsersStartedGoals();
  }, [assignedUserDetails]);

  return (
    <div className="main1">
      <div className="nav-bar">
        <UserNav />
      </div>

      <CareProfile />

      <div className="pages">
        <div className="header">
          <div className="card" id="card1">
            <div className="card-body" id="heading">
              <div>
                <strong>
                  <h3> Welcome back...</h3>
                </strong>
                <p>
                  Upgrade your crowd by surrounding yourself with supportive,
                  and uplifting individuals who encourage positivity.
                </p>
              </div>
              <div className="imgconatiner">
                <img src={Caretacker} alt="" />
              </div>
            </div>
          </div>
          {userDetails && (
            <div className="card" id="card2">
              <div className="card-title">
                <h6>Profile</h6>
              </div>
              <div className="card-body" id="care-profile">
                <div>
                  <div className="circle-das">{userDetails.firstname[0]}</div>
                </div>
                <div id="careTaker-Deatils">
                  <p>
                    <strong>
                      {userDetails.firstname} {userDetails.lastname}
                    </strong>{" "}
                  </p>
                  <p>gender: {userDetails.gender}</p>
                  <p>Age: {userDetails.age}</p>
                </div>
              </div>
            </div>
          )}
          {
            <div className="card" id="card3">
              <div className="card-title">
                <h6>User Update</h6>
              </div>
              <p>
                No of users started hitting their goals: {updateUserCount || 0}{" "}
              </p>
            </div>
          }
        </div>

        <div className="content">
          <nav>
            <div class="nav nav-tabs" id="nav-tab" role="tablist">
              <button
                class="nav-link active"
                id="nav-home-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-home"
                type="button"
                role="tab"
                aria-controls="nav-home"
                aria-selected="true">
                <strong>Assigned User</strong>
              </button>
              <button
                class="nav-link"
                id="nav-profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#nav-profile"
                type="button"
                role="tab"
                aria-controls="nav-profile"
                aria-selected="false">
                <strong>Unassigned User</strong>
              </button>
            </div>
          </nav>
          <div className="profile-heading">
            <div id="care-nav-left">
              <div id="ass-name">
                <strong>User</strong>
              </div>
              <div id="ass-phno">
                <strong>Contact</strong>
              </div>
              <div className="dummy-div">Allergy</div>
              <div className="dummy-div">Disease</div>
            </div>
            {/* <div id='ass-disease'><strong>Disease</strong></div> */}
            {/* <div id='ass-allergy'><strong>Allergy</strong></div> */}
            <div id="care-nav-right">
              <div id="ass-allergy">
                <strong>Action</strong>
              </div>
            </div>
          </div>
          <div class="tab-content" id="nav-tabContent">
            <div
              class="tab-pane fade show active"
              id="nav-home"
              role="tabpanel"
              aria-labelledby="nav-home-tab"
              tabindex="0">
              <Assigned assignedUserDetails={assignedUserDetails} />
            </div>
            <div
              class="tab-pane fade"
              id="nav-profile"
              role="tabpanel"
              aria-labelledby="nav-profile-tab"
              tabindex="0">
              <CareAdd
                unAssignedUserDetails={unAssignedUserDetails}
                setRefresh={setRefresh}
              />
            </div>
          </div>
        </div>
        <br />
      </div>
    </div>
  );
};

export default HomePage;
