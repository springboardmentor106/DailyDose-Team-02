import React from 'react'
import SideBar from "../Component/SideBar";
import Add from "../Pages/Add"
import Target from "../Pages/Target"
import Analytics from "../Pages/Analytics";
import { Route,Routes } from 'react-router-dom';
const CareRoutes = () => {
  return (
    <div>
      <SideBar>
        <Routes>
          <Route path='/Add' element={<Add/>}></Route>
          <Route path='/Target' element={<Target/>}></Route>
          <Route path='/Analytics' element={<Analytics/>}></Route>
        </Routes>
        </SideBar>
    </div>
  )
}

export default CareRoutes
