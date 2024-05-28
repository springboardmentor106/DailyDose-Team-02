import React, { useState, useEffect } from 'react'
import UserNav from '../../userDashboard/UserNav'
import './Pages.css'
import { RxCross2 } from "react-icons/rx";
import { profileinfo } from './StaticDataCare'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Constants from '../../../constants'
import CareProfile from '../dashComponents/CareProfile';
const AssignTask = () => {
    const navigate = useNavigate()
    const [userDetails, setUserDetails] = useState(null)
    const getAssignedUserDetails = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await fetch(Constants.BASE_URL + '/api/caretaker/senior-detail', {
                method: "GET",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': token
                }
            })

            if (response.status === 401) {
                navigate("/login");
                localStorage.clear()
            }
            const data = await response.json()
            if (data.status === "success") {
                if (data.seniorArr) {
                    console.log(data.seniorArr)
                    setUserDetails(data.seniorArr)
                }
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log("error", error)
            toast.error(error)
        }
    }

    useEffect(() => {
        getAssignedUserDetails()
    }, [])

    const handleRemoveItem = (category, type) => {
        if (type === "goal") {
            const updatedList = goalSelectedCategoriesList.filter(item => item !== category);
            setGoalSelectedCategoriesList(updatedList);
        } else {
            const updatedList = selectedCategoriesList.filter(item => item !== category);
            setSelectedCategoriesList(updatedList);
        }
    };

    const categoriesList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'Today']
    const [goalSelectedCategoriesList, setGoalSelectedCategoriesList] = useState([])
    const [details, setDetails] = useState({})
    const [selectedCategoriesList, setSelectedCategoriesList] = useState([])

    const onAddDetail = (key, value) => {
        if (key.includes("date" || "Date")) {
            const formattedDate = formatDate(value)
            setDetails({ ...details, [key]: formattedDate })
            return
        }
        setDetails({ ...details, [key]: value })
    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        return formattedDate
    }

    const handleAddCategory = (category, type) => {
        if (type === "goal") {
            if (!goalSelectedCategoriesList.includes(category)) {
                setGoalSelectedCategoriesList([...goalSelectedCategoriesList, category]);
            }
        } else {
            if (!selectedCategoriesList.includes(category)) {
                setSelectedCategoriesList([...selectedCategoriesList, category]);
            }
        }
    };

    const addGoal = async (userId) => {
        try {
            const url = Constants.BASE_URL + "/api/goals"
            const token = localStorage.getItem("token")
            const payload = {
                title: details.goalTitle,
                startDate: details.goalStartDate,
                endDate: details.goalEndDate,
                dayFrequency: goalSelectedCategoriesList,
                seniorCitizenId: details.selectedUser
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': token
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()
            if (data.status === "failed") {
                toast.warn(data.message)
            } else {
                toast.success(data.message)
                setDetails({})
                setSelectedCategoriesList(null)
            }
        } catch (err) {
            toast.error("Error:" + err)
        }
    }

    return (
        <div className='Assign'>
            <div className="nav-bar">
                <UserNav />
            </div>
            <CareProfile/>
            <div className="add-page-container">
                <div className='add-heading' >Add goals</div>
                <div className='add-content-container'>

                    <div className='two-input-container' style={{width:"99%",justifyContent:"center"}}>
                        <select class="form-select" id="inputGroupSelect04" value={details.selectedUser} onChange={(e) => onAddDetail("selectedUser", e.target.value)} aria-label="Example select with button addon">
                            <option selected>Select User</option>
                            {userDetails && userDetails?.map((profile, index) => (
                                <option value={profile.uuid} key={index}>{profile.firstname} {profile.lastname}</option>
                            ))}

                        </select>
                        <div className='input-container'>
                            <div className='input-label'>Title</div>
                            <input type="text" className='add-input' value={details.goalTitle || ""} onChange={(e) => onAddDetail("goalTitle", e.target.value)} />
                        </div>

                    </div>
                    <div className='two-input-container' style={{width:"99%",flexDirection:"column"}}>
                        <div className='input-container'>
                            <div className='input-label'>Start Date</div>
                            <input type="date" className='add-input' value={details.goalStartDate || ""} onChange={(e) => onAddDetail("goalStartDate", e.target.value)} />
                        </div>
                        <div className='input-container'>
                            <div className='input-label'>End Date</div>
                            <input type="date" className='add-input' value={details.goalEndDate || ""} onChange={(e) => onAddDetail("goalEndDate", e.target.value)} />
                        </div>
                    </div>

                    <div className='input-container'>
                        <div className='input-label'>Frequency Category</div>
                        <div className='categories-list'>
                            {categoriesList.map((category) => (
                                <div className='category-item' key={category}>
                                    <div onClick={() => handleAddCategory(category, "goal")}>
                                        {category}
                                    </div>
                                    {goalSelectedCategoriesList.includes(category) && (
                                        <div className='category-cross-icon' onClick={() => handleRemoveItem(category, "goal")}>
                                            <RxCross2 />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='add-save-button-row'>
                        <button className='add-save-button' onClick={() => addGoal()}>Save</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AssignTask
