import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Reset from "../Components/auth/Reset";
import UpdatePassword from "../Components/auth/UpdatePassword"
import VerifyOTP from "../Components/auth/VerifyOTP";
import { toast } from "react-toastify";
import Error404 from "../Components/pageNotFound/Error404";
import Add from "../Components/Dashboard/User/Add"
import Dashboard from "../Components/Dashboard/User/Dashboard"
import Target from "../Components/Dashboard/User/Target"
import HomePage from "../Components/Dashboard/Caretaker/HomePage";
import Analytics from "../Components/Dashboard/Caretaker/Analytics";
import UserDashboard from "../Components/userDashboard/UserHome";
import AssignTask from "../Components/Dashboard/Caretaker/AssignTask";
import Notification from "../Components/Dashboard/dashComponents/Notification"
function ProtectedRoute({ Component, authorizedFor }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log("token:", token, "role:", role);
  
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.warn("Unauthorized Access, Please Login First", {
        position: "top-right",
      });
      navigate("/login");
    } else {
      if (authorizedFor !== role) {
        toast.warn(`Unauthorized Access,${authorizedFor}s only can access the page.`, {
          position: "top-right",
        });
        if (token) {
          console.log("Token hai",token)
          if (role === "user") {
            navigate("/user-dash");
          }
          if (role === "caretaker") {
            navigate("/care-dashboard");
          }
        }else{
          navigate("/login")
        }
      }
    }
  }, []);
  return <Component />;
}

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="*" element={<Error404 />} />

      <Route path="/user-dash" element={<ProtectedRoute Component={UserDashboard} authorizedFor="user" />} />
      <Route path="/add" element={<ProtectedRoute Component={Add} authorizedFor="user" />} />
      <Route path="/target" element={<ProtectedRoute Component={Target} authorizedFor="user" />} />

      <Route path="/care-dashboard" element={<ProtectedRoute Component={HomePage} authorizedFor="caretaker" />} />
      <Route path="/care-add" element={<ProtectedRoute Component={AssignTask} authorizedFor="caretaker" />} />
      <Route path="/care-analytics" element={<ProtectedRoute Component={Analytics} authorizedFor="caretaker" />} />
      <Route path="/Notification" element={<Notification />} />
    </Routes>
  );
}
export default Routing;