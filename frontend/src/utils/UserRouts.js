import React from 'react'
// import "./App.css";
import SideBar from "../Component/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "../UserPages/dashboard";
import FileManager from "../UserPages/Target";
import Analytics from "../UserPages/Analytics";
import Add from "../UserPages/Add";
function UserRouts() {
  return (
    <div>
      <SideBar>
        <Routes>
          <Route path="/Userdashboard" element={<Dashboard />} />
          <Route path="/UserAdd" element={<Add />} />
          <Route path="/UserAnalytics" element={<Analytics />} />
          <Route path="/UserTarget" element={<FileManager />} />
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </div>
  )
}

export default UserRouts
