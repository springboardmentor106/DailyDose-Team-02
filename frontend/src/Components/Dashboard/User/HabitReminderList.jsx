import React, { useState } from 'react';
import HabitReminder from './HabitReminder';
const HabitReminderList = () => {
  const [reminders, setReminders] = useState([
    { id: 1, date: '11:05 PM', type: 'cooking' },
    { id: 2, date: '11:05 PM', type: 'cooking' },
    { id: 3, date: '11:05 PM', type: 'cooking' },
    { id: 4, date: '11:05 PM', type: 'cooking' },
  ]);
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
        <HabitReminder
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
export default HabitReminderList;
