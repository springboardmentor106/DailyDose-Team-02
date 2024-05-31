import React from 'react';
const GoalReminder = ({ reminder, onCheckChange }) => {
  const {  completedToday, title } = reminder || {};
  return (
    <div className="reminder-item">
      <div className="type-container">
        <div>{title}</div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={completedToday}
          onChange={() => onCheckChange(reminder)}
          id='check'
        />
      </div>
    </div>
  );
};

export default GoalReminder;
