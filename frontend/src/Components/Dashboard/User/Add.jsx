import React, { useState } from 'react';
import ReminderListAdd from '../User/ReminderList';
import SideBar from "../User/SideBar"
import { remindersAddData } from './StaticDataUser';
import './Add.css'
const Add = () => {
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
         <h4 id='heading'>Add Goals </h4>
        </button>
        {selectedItem === 'goal' && (
          <div className="dropdown-content">
            <div className="dropdown-container-left">
              <h4>Add Goals</h4>
            <label>Title</label>
            <input type="text" id='saow' />
            <label>Date</label>
            <input type="date" id='saow'/>
            <label> Start Date</label>
            <input type="date" id='saow' />
            <div className="catogry-feilds">
            <label>Category</label>
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
            <div className="dropdown-container-right">
            <button className="btn" onClick={() => handleItemClick('goal')} style={{ padding: '6px 20px', fontSize: '10px', backgroundColor: '#E0DCF8', color: 'white' , marginLeft: '370px', borderRadius:'15px' ,}}>
            <h4 id='heading' style={{ margin: 0, fontSize: '15px ',color: "#403774"}}>Save </h4>
            </button>
              
            <label id='Label'>Description</label>
            <textarea name="" id="right-input"></textarea>
            <label> End Date</label>
            <input type="date" id='End-date-input' />
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
        <button className="dropdown-button" onClick={() => handleItemClick('habit')}>
          <h4 id='heading'> Add Reminders</h4>
        </button>
        {selectedItem === 'habit' && (
            <div className="dropdown-content">
            <div className="dropdown-container-left">
            <h4>Add Reminders</h4>
            <label>Title</label>
            <input type="text" id='saow'/>
            <label>Date</label>
            <input type="date" id='saow'/>
            <div className="catogry-feilds"> 

            <label id='Schedule-lable'>Schedule</label>

            <div className="bordered-div" style={{ border: '1px solid black',borderRadius: '8px', padding: '5px' }}>

            <ReminderListAdd reminders={remindersAddData} />
            <button className="btn" onClick={() => handleItemClick('goal')} style={{ padding: '5px 8px', fontSize: '10px', backgroundColor: '#6A58DC', color: 'white' , marginLeft: '110px' }}>
            <h4 id='heading' style={{ margin: 0, fontSize: '10px' }}>+ Add </h4>
            </button>
            </div>

            </div>
            </div>
            <div className="dropdown-container-right">
            <button className="btn" onClick={() => handleItemClick('goal')} style={{ padding: '6px 20px', fontSize: '10px', backgroundColor: '#E0DCF8', color: 'white' , marginLeft: '380px', borderRadius:'15px' ,}}>
            <h4 id='heading' style={{ margin: 0,  fontSize: '15px ',color: "#403774"}}>Save </h4>
            </button>
            <label> Start Date</label>
            <input type="date" id='saow' />
            <label> End Date</label>
            <input type="date" id='saow'/>
            <div className="catogry-feilds-right">
              <label>Description</label>
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
            <h4 id='heading'> Add Habits</h4>
            <label>Title</label>
            <input type="text" id='saow' />
            <label>Date</label>
            <input type="date" id='saow' />
            <label> Start Date</label>
            <input type="date"id='saow' />
            <div className="catogry-feilds">
            <label>Category</label>
            <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
              <input type="text" id='catogry-inputs' />
            </div>
            </div>
            <div className="dropdown-container-right">
            <button className="btn" onClick={() => handleItemClick('goal')} style={{ padding: '6px 20px', fontSize: '10px', backgroundColor: '#E0DCF8', color: 'white' , marginLeft: '380px', borderRadius:'15px' ,}}>
            <h4 id='heading' style={{ margin: 0,  fontSize: '15px ',color: "#403774"}}>Save </h4>
            </button>
            <label>Description</label>
            <textarea name="" id="right-input"></textarea>
            <label> End Date</label>
            <input type="date" id='saow' />
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
