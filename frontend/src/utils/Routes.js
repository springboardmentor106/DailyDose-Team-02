import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import UpdatePassword from "../auth/UpdatePassword"
import UserHome from "../userDashboard/UserHome";
import VerifyOTP from "../auth/VerifyOTP";
function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/verify-otp" element={<VerifyOTP />} />
      <Route path="/update-password" element={<UpdatePassword/>} />
      <Route path="/user-home" element={<UserHome />} />
    </Routes>
  );
}

export default Routing;
