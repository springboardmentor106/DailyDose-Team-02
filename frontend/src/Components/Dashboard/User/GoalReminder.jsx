import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const GoalReminder = ({ reminder, onCheckChange, onDelete }) => {
  const { date, type, checked, activity } = reminder;
  return (
    <div className="reminder-item">
      <div id='datepicker'>10:00 am</div>
      <div className="type-container">
      <div>{activity}</div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onCheckChange(reminder)}
          id='check'
        />
      </div>
      {/* <div>
        <button onClick={() => onDelete(reminder)}><RiDeleteBinLine /></button>
      </div> */}
    </div>
  );
};

export default GoalReminder;
