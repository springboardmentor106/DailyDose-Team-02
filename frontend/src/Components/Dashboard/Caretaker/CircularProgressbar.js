import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const CircularProgressBar = ({ value }) => {
  return (
    <div style={{ width: 60, height: 60 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '23px',
          textFont: 'bolder',
          pathColor: `#6a58dc`,
          textColor: 'black',
          trailColor: 'white',
        })}
      />
    </div>
  );
};
export default CircularProgressBar;