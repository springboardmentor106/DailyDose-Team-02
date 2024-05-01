import React, { useState } from 'react';
import './Add.css';
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