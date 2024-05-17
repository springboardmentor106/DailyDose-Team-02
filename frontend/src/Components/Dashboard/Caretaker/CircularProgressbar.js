import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CircularProgressBar = ({ value }) => {
  return (
    <div style={{ width: 55, height: 55 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          textFont: 'bold',
          pathColor: `#39CA50`,
          textColor: '#00000',
        })}
      />
    </div>
  );
};
export default CircularProgressBar;