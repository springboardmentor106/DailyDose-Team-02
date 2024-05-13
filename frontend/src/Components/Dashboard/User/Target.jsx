import React, { useState } from 'react';
import moment from 'moment';
import SideBar from "../User/SideBar"
import TargetList from '../User/CheckBoxTarget';
import { RiCheckboxCircleLine } from "react-icons/ri";
import { PiDotsThreeOutlineVerticalBold } from "react-icons/pi";
import CircularProgressBar from '../User/ProgressBarForTarget';
import './Target.css'
const Target = () => {
  const [selectedItem, setSelectedItem] = useState('goal'); // Default to 'goal' being selected
  const handleItemClick = (item) => {
    setSelectedItem(item === selectedItem ? null : item);
  };
  return (
   <div className="main-container-target">
    <SideBar/>
       <div className="add-page-container">
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('goal')}>
          <h4 id='heading'>My Goal</h4>
        </button>
        {selectedItem === 'goal' && (
          <div className="dropdown-content">
            <div className="app">
            <div className="header-container">
                      <div id="chaeck-icon">
                      <RiCheckboxCircleLine />
                      </div>
                      <div className="header-details-Task">
                        <h5>Task</h5>
                      </div>
                      <div className="header-details-EndDate">
                        <h5>End Date</h5>
                      </div>
                      <div className="header-details-Status">
                        <h5>Status</h5>
                      </div>
                  </div>
                  <div className="details-container">
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={55} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                     <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                     <TargetList/>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={100} /> 
                      </div>    
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>               
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={80} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={68} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={40} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={75} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>  
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={63} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={33} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={5} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div> 
                    </div>
                  </div>
            </div>
          </div>
        )}
      </div>
      {/* My Reminder Dropdown */}
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('habit')}>
          <h4 id='heading'>My Reminder</h4>
        </button>
        {selectedItem === 'habit' && (
          <div className="dropdown-content">
            <div className="app">
            <div className="header-container">
                      <div id="chaeck-icon">
                      <RiCheckboxCircleLine />
                      </div>
                      <div className="header-details-Task">
                        <h5>Task</h5>
                      </div>
                      <div className="header-details-EndDate">
                        <h5>End Date</h5>
                      </div>
                      <div className="header-details-Status">
                        <h5>Status</h5>
                      </div>
                  </div>
                  <div className="details-container">
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={55} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                     <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                     <TargetList/>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={100} /> 
                      </div>    
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>               
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={80} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={68} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={40} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={75} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>  
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={63} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={33} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={5} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div> 
                    </div>
                  </div>
            </div>
          </div>
        )}
      </div>

      {/* My Habit Dropdown */}
      <div className="dropdown">
        <button className="dropdown-button" onClick={() => handleItemClick('reminder')}>
          <h4 id='heading'>My Habit</h4>
        </button>
        {selectedItem === 'reminder' && (
          <div className="dropdown-content">
            <div className="app">
            <div className="header-container">
                      <div id="chaeck-icon">
                      <RiCheckboxCircleLine />
                      </div>
                      <div className="header-details-Task">
                        <h5>Task</h5>
                      </div>
                      <div className="header-details-EndDate">
                        <h5>End Date</h5>
                      </div>
                      <div className="header-details-Status">
                        <h5>Status</h5>
                      </div>
                  </div>
                  <div className="details-container">
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={55} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                     <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                     <TargetList/>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={100} /> 
                      </div>    
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>               
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={80} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={68} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={40} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={75} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>  
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={63} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={33} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div> 
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div>
                    </div>
                    <div className="details">
                    <div className='Progress-bar'>
                      <CircularProgressBar value={5} /> 
                      </div>
                      <div className="end-date">
                      <strong>{moment().format('MMMM Do YYYY h:mm:ss a')}</strong>
                      </div>  
                      <div className="dot">
                     <PiDotsThreeOutlineVerticalBold />
                     </div> 
                    </div>
                  </div>
            </div>
          </div>
        )}
      </div>
    </div>
   </div>
  );
};
export default Target;
