import React, { useState } from 'react';
import Reminder from './GoalReminder';
const GoalReminderList = ({ goalsList }) => {
  const [reminders, setReminders] = useState(goalsList);
  const handleCheckChange = (changedReminder) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === changedReminder.id
        ? { ...reminder, checked: !reminder.checked }
        : reminder
    );
    setReminders(updatedReminders);
  };
  const handleDelete = (reminderToDelete) => {
    const updatedReminders = reminders.filter(
      (reminder) => reminder.id !== reminderToDelete.id
    );
    setReminders(updatedReminders);
  };
  return (
    <div className="main">
    <div className="reminder-list">
      {reminders.map((reminder) => (
        <Reminder
          key={reminder.id}
          reminder={reminder}
          onCheckChange={handleCheckChange}
          onDelete={handleDelete}
        />
      ))}
    </div>
    </div>
  )
};
export default GoalReminderList;
