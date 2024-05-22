import React, { useState, useEffect } from 'react';
import Reminder from '../User/Reminder';
const ReminderList = ({ remindersList }) => {
  const [reminders, setReminders] = useState(remindersList || null);
  const handleCheckChange = (changedReminder) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === changedReminder.id
        ? { ...reminder, checked: !reminder.checked }
        : reminder
    );
    setReminders(updatedReminders);
  };
  useEffect(() => {
    setReminders(remindersList)
  }, [remindersList])
  const handleDelete = (reminderToDelete) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.id !== reminderToDelete.id
    );
    setReminders(updatedReminders);
  };
  return (
    <div className="main">
      <div className="reminder-list">
        {reminders&& 
          reminders?.length ? reminders.map((reminder) => (
            <Reminder
              key={reminder}
              reminder={reminder}
              onCheckChange={handleCheckChange}
              onDelete={handleDelete}
            />
          )) : <div>no reminders</div>
        }
      </div>
    </div>
  )
};
export default ReminderList;
