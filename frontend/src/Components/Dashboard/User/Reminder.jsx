import React ,{useState} from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const Reminder = ({ reminder, onCheckChange }) => {
  const {  title, completedToday, startTime } = reminder || {};
 
  return (
    <div className="reminder-item">
      <div id='datepicker'>{startTime} {startTime.split(':')[0] > 12 ? "pm" : "am"} </div>
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

export default Reminder;
