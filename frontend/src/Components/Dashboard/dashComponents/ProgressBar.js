import { CardContent } from '@mui/material';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProgressBar = ({ value }) => {
  return (
    <div style={{ width: 100, height: 100 }}>
      <CircularProgressbar
        value={value}
        text={`${value}%`}
        styles={buildStyles({
          textSize: '16px',
          textFont: 'bold',
          pathColor: `#6455C6`,
          textColor: '#1f165c',
          trailColor: 'white',
        })}
      />
    </div>
  );
};

export default ProgressBar;