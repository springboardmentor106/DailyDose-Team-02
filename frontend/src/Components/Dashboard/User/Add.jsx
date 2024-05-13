import React, { useState } from 'react';
import ReminderListAdd from '../User/ReminderList';
import SideBar from "../User/SideBar"
import './Add.css'
const Add = () => {
  const reminders = [
    { Food: 'After Breakfast', activity: '1.0' },
    { Food: 'AAfter Lunch', activity: '1.0' },
    { Food: 'After Dinner', activity: '1.0' },
  ];
  const [selectedItem, setSelectedItem] = useState('goal');
  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  return (
    <div className="main-contaoner">
      <SideBar/>
    <div className="add-page-container">
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('goal')}>
          <h4 id='heading'>Add Goal</h4>
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
            <label id='Label'>Decription</label>
            <textarea name="" id="right-input"></textarea>
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
          <h4 id='heading'> Add Remainders</h4>
        </button>
        {selectedItem === 'habit' && (
            <div className="dropdown-content">
            <div className="dropdown-container-left">
            <label>Title</label>
            <input type="text" />
            <label>Date</label>
            <input type="date" />
            <div className="catogry-feilds">
            <label id='Schedule-lable'>Schedule</label>
            <ReminderListAdd reminders={reminders} />
            </div>
            </div>
            <div className="dropdown-container-right">
            <label> Start Date</label>
            <input type="date" />
            <label> End Date</label>
            <input type="date" />
            <div className="catogry-feilds-right">
              <label>Decription</label>
            <textarea name="" id="right-input-two"></textarea>
            </div>
            </div>
          </div>  
        )}
      </div>
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('reminder')}>
        <h4 id='heading'> Add Habit</h4>
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
    </div>
  );
};
export default Add;
