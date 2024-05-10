import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Reset from "../Components/auth/Reset";
import UpdatePassword from "../Components/auth/UpdatePassword"
import UserHome from "../Components/userDashboard/UserHome";
import VerifyOTP from "../Components/auth/VerifyOTP";
import { toast } from "react-toastify";
import Error404 from "../Components/pageNotFound/Error404";
import Add from "../Components/Dashboard/User/Add"
import Dashboard from "../Components/Dashboard/User/Dashboard"
import Target from "../Components/Dashboard/User/Target"
import CareAdd from "../Components/Dashboard/Caretaker/CareAdd";
import HomePage from "../Components/Dashboard/Caretaker/HomePage";
import Analytics from "../Components/Dashboard/Caretaker/Analytics";
function ProtectedRoute({ Component }) {
  const userInfo = localStorage.getItem("user-info");
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  console.log("token:", token, "role:", role);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.warn("Unauthorized Access, Please Login First", {
        position: "top-center",
      });
      navigate("/login");
    }
  }, []);
  return <Component />;
}

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/update-password" element={<UpdatePassword />} />
      <Route path="/user-home" element={<ProtectedRoute Component={UserHome} />} />
      <Route path="*" element={<Error404 />} />
      <Route path="/Add" element={<Add/>} />
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Target" element={<Target/>} />
      <Route path="/Care-dashboard" element={<HomePage/>} />
      <Route path="/Care-add" element={<CareAdd/>} />
      <Route path="/Care-analytics" element={<Analytics/>} />
    </Routes>
  );
}

export default Routing;
