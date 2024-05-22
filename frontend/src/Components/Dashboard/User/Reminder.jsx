import React ,{useState} from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const Reminder = ({ reminder, onCheckChange, onDelete }) => {
  const { date, title, checked } = reminder || {};
  const todayDate = new Date().getDate()
  const timeNow = new Date().getHours()
  const timeInMin = new Date().getMinutes()
  console.log("today date", { date, timeNow, timeInMin })
  return (
    <div className="reminder-item">
      {/* <div id='datepicker'>{date}{timeNow}:{timeInMin} </div> */}
      <div id='datepicker'>11:00 am </div>
      <div className="type-container">
        <div>{title}</div>
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

export default Reminder;
