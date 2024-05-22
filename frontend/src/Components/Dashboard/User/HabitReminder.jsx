import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const HabitReminder = ({ reminder, onCheckChange, onDelete }) => {
const {  activity } = reminder;
  return (
    <div className="reminder-item">
      <div className="type-container">
        <div>{activity}</div>
      </div>
    </div>
  );
};

export default HabitReminder;
