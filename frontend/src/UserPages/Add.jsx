import React, { useState } from 'react';
import './Add.css';

const Add = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };

  return (
    <div className="add-page-container">
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('goal')}>
          <h1 id='heading'>Add Goal</h1>
        </button>
        {selectedItem === 'goal' && (
          <div className="dropdown-content">
            <div className="dropdown-container-left">
            <label>Title</label>
            <input type="text" />
            <label>Date</label>
            <input type="date" />
            <label> Start Date</label>
            <input type="date" />
            <div className="catogry-feilds">
            <label>Category</label>
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
            <div className="dropdown-container-right">
            <label>Decription</label>
            <input type="text" id='right-input'/>
            <label> End Date</label>
            <input type="date" id='End-date-input' />
            <div className="catogry-feilds-right">
              <input type="text" id='catogry-inputs-one' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
          </div>   
        )}
      </div>
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('habit')}>
          <h1 id='heading'> Add Reminder</h1>
        </button>
        {selectedItem === 'habit' && (
            <div className="dropdown-content">
            <div className="dropdown-container-left">
            <label>Title</label>
            <input type="text" />
            <label>Date</label>
            <input type="date" />
            <label> Start Date</label>
            <input type="date" />
            <div className="catogry-feilds">
            <label>Category</label>
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
            <div className="dropdown-container-right">
            <label>Decription</label>
            <input type="text" id='right-input'/>
            <label> End Date</label>
            <input type="date" />
            <div className="catogry-feilds-right">
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
          </div>  
        )}
      </div>
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('reminder')}>
        <h1 id='heading'> Add Habit</h1>
        </button>
        {selectedItem === 'reminder' && (
            <div className="dropdown-content">
            <div className="dropdown-container-left">
            <label>Title</label>
            <input type="text" />
            <label>Date</label>
            <input type="date" />
            <label> Start Date</label>
            <input type="date" />
            <div className="catogry-feilds">
            <label>Category</label>
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
            <div className="dropdown-container-right">
            <label>Decription</label>
            <input type="text" id='right-input'/>
            <label> End Date</label>
            <input type="date" />
            <div className="catogry-feilds-right">
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
          </div>  
        )}
      </div>
    </div>
  );
};

export default Add;
