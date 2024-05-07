import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import UpdatePassword from "../auth/UpdatePassword"
import UserHome from "../userDashboard/UserHome";
import VerifyOTP from "../auth/VerifyOTP";
import { toast } from "react-toastify";

function ProtectedRoute({Component}) {
  const token = localStorage.getItem("user-info");
  console.log(token);
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
      <Route path="/update-password" element={<UpdatePassword/>} />
      <Route path="/user-home" element={<ProtectedRoute Component={UserHome} />} />
    </Routes>
  );
}

export default Routing;
