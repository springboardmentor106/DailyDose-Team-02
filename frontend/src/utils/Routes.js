import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../Components/auth/Login";
import Register from "../Components/auth/Register";
import Reset from "../Components/auth/Reset";
import UpdatePassword from "../Components/auth/UpdatePassword"
import UserHome from "../Components/userDashboard/UserHome";
import VerifyOTP from "../Components/auth/VerifyOTP";
import { toast } from "react-toastify";

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
    </Routes>
  );
}

export default Routing;
