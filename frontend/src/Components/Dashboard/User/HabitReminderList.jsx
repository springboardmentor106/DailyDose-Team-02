import React, { useState } from 'react';
import HabitReminder from './HabitReminder';
const HabitReminderList = ({ habitsList }) => {
  const [reminders, setReminders] = useState(habitsList);
  const handleCheckChange = (changedReminder) => {
    const updatedReminders = reminders.map((reminder) =>
      reminder.id === changedReminder.id
        ? { ...reminder, checked: !reminder.checked }
        : reminder
    );
    setReminders(updatedReminders);
  };
  
  return (
    <div className="main">
    <div className="reminder-list">
      {reminders.map((reminder) => (
        <HabitReminder
          key={reminder.id}
          reminder={reminder}
          onCheckChange={handleCheckChange}
        />
      ))}
    </div>
    </div>
  )
};
export default HabitReminderList;
