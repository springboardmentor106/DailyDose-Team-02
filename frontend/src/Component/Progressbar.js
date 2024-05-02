import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const CircularProgressBar = ({ value }) => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          textFont: 'bold',
          pathColor: `rgb(138, 121, 245, ${value / 100})`,
          textColor: '#1f165c',
          trailColor: '#e9e9e9',
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
