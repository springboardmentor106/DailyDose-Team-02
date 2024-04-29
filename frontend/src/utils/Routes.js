import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import UpdatePassword from "../auth/UpdatePassword"

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/update-password" element={<UpdatePassword/>} />
    </Routes>
  );
}

export default Routing;
