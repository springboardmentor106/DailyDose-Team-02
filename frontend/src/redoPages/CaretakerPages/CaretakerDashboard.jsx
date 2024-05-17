import React, { useEffect, useState } from 'react';
import SideBar from '../../redoPages/CommonComponents/Sidebar';
import "./CaretakerDashboard.css"
import welcomeBack from "../../assets/images/Caretaker.png"
import Data from "../staticData"
const CaretakerDashboard = () => {
    const CaretakerDetails = Data.CaretakerDetails
    const UnassignedUsers = Data.UnassignedUsers
    const [selectedTab, setSelectedTab] = useState("users")
    const [startedTodayCount, setStartedTodyCount] = useState({ started: 0, totalUsers: 0 })
    // user update card details
    const getUserUpdateDetails = () => {
        const assignedUsers = CaretakerDetails.users
        const startedTodayCount = assignedUsers.filter(user => user.startedToday).length;
        setStartedTodyCount({ started: startedTodayCount, totalUsers: assignedUsers.length })
    }

    useEffect(() => {
        getUserUpdateDetails()
    }, [CaretakerDetails])

    return (
        <div className='page-container'>
            <SideBar />
            <div className='page-content care-dashboard-container'>
                <div className='care-dashboard-row1'>
                    <div className='welcome-back-card'>
                        <div>
                            <div className='welcome-back-title large-bold'>Welcome back...</div>
                            <div className='welcome-back-description medium-normal'>Upgrade your crowd by surrounding yourself with supportive, inspiring, and uplifting individuals who encourage growth and positivity.</div>
                        </div>
                        <img src={welcomeBack} alt="welcome back" className='welcome-back-image' />
                    </div>

                    <div className='care-dashboard-profile-container'>
                        <div className='care-dashboard-profile-head title'>Profile</div>
                        <div className='care-dashboard-profile-details-profile-container'>
                            <div className='care-dashboard-profile'>{CaretakerDetails.firstName[0]}</div>
                            <div className='care-dashboard-profile-details'>
                                <div className='care-dashboard-profile-name medium-bold'>{CaretakerDetails.firstName} {CaretakerDetails.lastName}</div>
                                <div className='small-normal'>Occupation : {CaretakerDetails.occupation}</div>
                                <div className='small-normal'>Age : {CaretakerDetails.age}</div>
                            </div>
                        </div>
                    </div>

                    <div className='care-dashboard-user-update-container'>
                        <div className='care-dashboard-user-update title'>User update</div>
                        <div className='care-dashboard-user-update-content'>
                            <div className='small-normal'>User Started: {startedTodayCount.started || 0} / {startedTodayCount.totalUsers || 0}</div>
                        </div>
                    </div>
                </div>

                <div className='care-dashboard-row2'>
                    <div className='care-dashboard-tabs'>
                        <div className={`care-dashboard-tab1 large-bold ${selectedTab === "users" ? 'active-tab' : ''}`} onClick={() => setSelectedTab("users")}>Assigned users</div>
                        <div className={`care-dashboard-tab2 large-bold ${selectedTab === "unassignedUsers" ? 'active-tab' : ''}`} onClick={() => setSelectedTab("unassignedUsers")}>Unassigned users</div>
                    </div>
                    {/* <div className='care-dashboard-users-list'>
                        <table className='care-dashboard-table'>
                            <th >
                                <td>User</td>
                                <td>Contact</td>
                                <td>Disease</td>
                                <td>Allergy</td>
                                <td>Action</td>
                            </th>

                        </table>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default CaretakerDashboard