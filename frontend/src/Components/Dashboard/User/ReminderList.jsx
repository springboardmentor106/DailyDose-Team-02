import React, { useState, useEffect } from 'react';
import Reminder from '../User/Reminder';
import { toast } from 'react-toastify';
import Constants from '../../../constants';
const ReminderList = ({ remindersList, setRefresh, isCaretaker }) => {
  const [reminders, setReminders] = useState(remindersList || null);
  const handleCheckChange = async (changedReminder) => {
    try {
      if (isCaretaker) {
        return
      }
      const url = Constants.BASE_URL + "/api/reminders/update"
      const token = localStorage.getItem("token")
      const payload = {
        reminderId: changedReminder.uuid,
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
    setReminders(remindersList)
  }, [remindersList])

  return (
    <div className="reminders-list-container">
      <div className="reminder-list">
        {reminders &&
          reminders?.length ? reminders.map((reminder) => (
            <Reminder
              key={reminder.uuid}
              reminder={reminder}
              onCheckChange={handleCheckChange}
            />
          )) : <div>no reminders</div>
        }
      </div>
    </div>
  )
};

export default ReminderList;