import React from 'react';

const Progress = ({ progress }) => {
  const progressBarStyles = {
    width: '100%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    marginBottom: '10px',
    position: 'relative',
  };

  const progressStyles = {
    height: '100%',
    backgroundColor: '#6a58dc',
    borderRadius: '10px',
    overflow: 'hidden',
    width: `${progress}%`,
  };

  const progressTextStyles = {
    position: 'relative',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
  };

  return (
    <div style={progressBarStyles}>
      <div style={progressStyles}></div>
      {/* <span style={progressTextStyles}>{`${progress}%`}</span> */}
    </div>
  );
}

export default Progress;