import React, { useState, useEffect } from 'react';
import GoalReminder from './GoalReminder';
import { toast } from 'react-toastify';
import Constants from '../../../constants';
const GoalReminderList = ({ goalsList, setRefresh, isCaretaker }) => {
  const [reminders, setReminders] = useState(goalsList);
  const handleCheckChange = async (changedReminder) => {
    try {
      if (isCaretaker) {
        return
      }
      const url = Constants.BASE_URL + "/api/goals/update"
      const token = localStorage.getItem("token")
      const payload = {
        goalId: changedReminder.uuid,
        completedToday: !changedReminder.completedToday
      }
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Authorization": token,
          'Content-Type': "application/json",
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()
      if (data.success === "false") {
        toast.warn(data.message)
      } else {
        setRefresh(true)
        toast.success(data.message)
      }
    } catch (err) {
      console.log(err)
      toast.error("Error:" + err)
    }
  };
  useEffect(() => {
    setReminders(goalsList)
  }, [goalsList])
  return (
    <div className="main">
      <div className="reminder-list">
        {reminders.map((reminder) => (
          <GoalReminder
            key={reminder.id}
            reminder={reminder}
            onCheckChange={handleCheckChange}
          />
        ))}
      </div>
    </div>
  )
};
export default GoalReminderList;
