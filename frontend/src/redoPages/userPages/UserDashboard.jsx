import React from 'react'
import "./UserDashboard.css"
import SideBar from '../../redoPages/CommonComponents/Sidebar'

const UserDashboard = () => {
    return (
        <div className='page-container'>
            <SideBar />
            <div>UserDashboard</div>
        </div>
    )
}

export default UserDashboard