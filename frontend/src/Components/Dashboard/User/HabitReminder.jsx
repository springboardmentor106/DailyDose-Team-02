import React from 'react';
import { RiDeleteBinLine } from "react-icons/ri";
const HabitReminder = ({ reminder }) => {
  const { title } = reminder;
  return (
    <div className="reminder-item">
      <div className="type-container">
        <div>{title}</div>
      </div>
    </div>
  );
};

export default HabitReminder;
