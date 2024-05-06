import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import Reset from "../auth/Reset";
import HomePage from "../Pages/HomePage"
import Add from "../Pages/Add"
import Target from "../Pages/Target"
import Analytics from "../Pages/Analytics";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset" element={<Reset />} />
      <Route path="/dashboard" element={<HomePage />} />
      <Route path="/Add" element={<Add />} />
      <Route path="/Target" element={<Target />} />
      <Route path="/Analytics" element={<Analytics />} />
    </Routes>

    
  );
};

export default Routing;
