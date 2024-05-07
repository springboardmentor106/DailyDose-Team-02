import React, { useState } from 'react';
import Reminder from '../UserComponents/Reminder';
import './Reminder.css'

const ReminderList = () => {
  const [reminders, setReminders] = useState([
    { id: 1, date: '10:05 PM', type: 'Gardening', checked: true },
    { id: 2, date: '10:05 PM', type: 'Gardening', checked: true },
    { id: 3, date: '10:05 PM', type: 'Gardening', checked: true },
    { id: 4, date: '10:05 PM', type: 'Gardening', checked: true },
    // Add more reminders as needed
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
        <div className="check-boc-heading">
            <h2>Reminder</h2>
        </div>
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
  );
};

export default ReminderList;
