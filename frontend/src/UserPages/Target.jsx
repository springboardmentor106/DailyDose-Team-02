import React, { useState } from 'react';
import './Add.css';
import TaskBox from '../UserComponents/ProgressBarTask';
const Target = () => {
      const [selectedItem, setSelectedItem] = useState(null);
    
      const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
      };
    
      return (
        <div className="add-page-container">
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => handleItemClick('goal')}>
              <h1 id='heading'>My Goal</h1>
            </button>
            {selectedItem === 'goal' && (
              <div className="dropdown-content">
                <div className="app">
      <TaskBox taskName="Project Task" endDate="2024-06-30" initialStatus="not started" />
    </div>
           
              </div>   
            )}
          </div>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => handleItemClick('habit')}>
              <h1 id='heading'> My Reminder</h1>
            </button>
            {selectedItem === 'habit' && (
                <div className="dropdown-content">
              
              </div>  
            )}
          </div>
          <div className="dropdown">
            <button className="dropdown-button" onClick={() => handleItemClick('reminder')}>
            <h1 id='heading'> My Habit</h1>
            </button>
            {selectedItem === 'reminder' && (
                <div className="dropdown-content">
           
              </div>  
            )}
          </div>
        </div>
      );
    };
export default Target;