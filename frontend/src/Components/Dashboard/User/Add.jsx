import React, { useEffect, useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import './Add.css'
import { toast } from 'react-toastify';
import Constants from '../../../constants';
import UserNav from "../../userDashboard/UserNav";
import UserProfile from '../dashComponents/UserProfile';

const Add = () => {
  const [selectedItem, setSelectedItem] = useState('goal');
  const [selectedCategoriesList, setSelectedCategoriesList] = useState([])
  const [goalSelectedCategoriesList, setGoalSelectedCategoriesList] = useState([])
  const [details, setDetails] = useState({})

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  const categoriesList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Daily', 'Today']

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }
  const [minDate, setMinDate] = useState(formatDate(new Date()));

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

  const handleRemoveItem = (category, type) => {
    if (type === "goal") {
      const updatedList = goalSelectedCategoriesList.filter(item => item !== category);
      setGoalSelectedCategoriesList(updatedList);
    } else {
      const updatedList = selectedCategoriesList.filter(item => item !== category);
      setSelectedCategoriesList(updatedList);
    }
  };

  const onAddDetail = (key, value) => {
    if (key.includes("date" || "Date")) {
      const formattedDate = formatDate(value)
      setDetails({ ...details, [key]: formattedDate })
      return
    }
    setDetails({ ...details, [key]: value })
  }

  const addReminder = async () => {
    try {
      const url = Constants.BASE_URL + "/api/reminders"
      const token = localStorage.getItem("token")
      const payload = {
        title: details.reminderTitle,
        startDate: details.reminderStartDate,
        endDate: details.reminderEndDate,
        startTime: details.reminderStartTime,
        endTime: details.reminderEndTime,
        timeFrequency: details.reminderTimeFrequency,
        dayFrequency: selectedCategoriesList
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
      }
    } catch (err) {
      toast.error("Error:" + err)
    }
  }

  const addGoal = async () => {
    try {
      const url = Constants.BASE_URL + "/api/goals"
      const token = localStorage.getItem("token")
      const payload = {
        title: details.goalTitle,
        startDate: details.goalStartDate,
        endDate: details.goalEndDate,
        dayFrequency: goalSelectedCategoriesList,
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
        // selectedCategoriesList([])
        // setGoalSelectedCategoriesList([])
      }
    } catch (err) {
      toast.error("Error:" + err)
    }
  }


  const addHabit = async () => {
    try {
      const url = Constants.BASE_URL + "/api/habits"
      const token = localStorage.getItem("token")
      const payload = {
        title: details.habitTitle,
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
      }
    } catch (err) {
      toast.error("Error:" + err)
    }
  }

  return (
    <div className="main-container">
      <UserNav />
      <UserProfile/>
      <div className="add-page-container">
        <div className='add-container'>
          <div className='add-heading' onClick={() => handleItemClick('goal')}>Add goals</div>
          {selectedItem === "goal" ?
            <div className='add-content-container'>
              <div className='input-container'>
                <div className='input-label'>Title</div>
                <input type="text" className='add-input' value={details.goalTitle || ""} onChange={(e) => onAddDetail("goalTitle", e.target.value)} />
              </div>

              <div className='two-input-container'>
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
            : null}
        </div>

        <div className='add-container'>
          <div className='add-heading' onClick={() => handleItemClick('reminder')}>Add Reminders</div>
          {selectedItem === "reminder" ?
            <div className='add-content-container'>
              <div className='input-container'>
                <div className='input-label'>Title</div>
                <input type="text" className='add-input' value={details.reminderTitle || ""} onChange={(e) => onAddDetail("reminderTitle", e.target.value)} />
              </div>

              <div className='two-input-container'>
                <div className='input-container'>
                  <div className='input-label'>Start Date</div>
                  <input type="date" className='add-input' value={details.reminderStartDate || ""} onChange={(e) => onAddDetail("reminderStartDate", e.target.value)} />
                </div>
                <div className='input-container'>
                  <div className='input-label'>End Date</div>
                  <input type="date" className='add-input' value={details.reminderEndDate || ""} onChange={(e) => onAddDetail("reminderEndDate", e.target.value)} />
                </div>
              </div>

              <div className='two-input-container'>
                <div className='input-container'>
                  <div className='input-label'>Start Time</div>
                  <input type="time" className='add-input' value={details.reminderStartTime || ""} onChange={(e) => onAddDetail("reminderStartTime", e.target.value)} />
                </div>
                <div className='input-container'>
                  <div className='input-label'>End Time</div>
                  <input type="time" className='add-input' value={details.reminderEndTime || ""} onChange={(e) => onAddDetail("reminderEndTime", e.target.value)} />
                </div>
              </div>

              <div className='input-container'>
                <div className='input-label'>Frequency Per Day</div>
                <input type="number" defaultValue={1} className='add-input frequency-per-day' value={details.reminderTimeFrequency} onChange={(e) => onAddDetail("reminderTimeFrequency", e.target.value)} />
              </div>

              <div className='input-container'>
                <div className='input-label'>Frequency Category</div>
                <div className='categories-list'>
                  {categoriesList.map((category) => (
                    <div className='category-item' key={category}>
                      <div onClick={() => handleAddCategory(category, "reminder")}>
                        {category}
                      </div>
                      {selectedCategoriesList.includes(category) && (
                        <div className='category-cross-icon' onClick={() => handleRemoveItem(category, "reminder")}>
                          <RxCross2 />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className='add-save-button-row'>
                <button className='add-save-button' onClick={() => addReminder()}>Save</button>
              </div>
            </div>
            : null}
        </div>

        <div className='add-container'>
          <div className='add-heading'
            onClick={() => handleItemClick('habit')}>
            Add Habits
          </div>
          {selectedItem === "habit" ?
            <div className='add-content-container'>
              <div className='input-container'>
                <div className='input-label'>Title</div>
                <input type="text" className='add-input' value={details.habitTitle || ""} onChange={(e) => onAddDetail("habitTitle", e.target.value)} />
              </div>

              <div className='add-save-button-row'>
                <button className='add-save-button' onClick={() => addHabit()}>Save</button>
              </div>
            </div>
            : null}
        </div>

      </div>
    </div >
  );
};
export default Add;
