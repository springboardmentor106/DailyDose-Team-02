import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const Reminder = ({ reminder, onCheckChange, onDelete }) => {
  const { date, type, checked } = reminder;

  return (
    <div className="reminder-item">
      <div id='datepicker'>{date}</div>
      <div className="type-container">
      <div>{type}</div>
      </div>
      <div>
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onCheckChange(reminder)}
          id='check'
        />
      </div>
      <div>
        <button onClick={() => onDelete(reminder)}><RiDeleteBinLine /></button>
      </div>
    </div>
  );
};

export default Reminder;
