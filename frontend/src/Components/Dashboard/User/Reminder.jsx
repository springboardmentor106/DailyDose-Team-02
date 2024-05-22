import React ,{useState} from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const Reminder = ({ reminder, onCheckChange }) => {
  const { date, title, completedToday, startTime } = reminder || {};
  const todayDate = new Date().getDate()
  const timeNow = new Date().getHours()
  const timeInMin = new Date().getMinutes()
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
