import React, { useState } from 'react';
import './Taskbar.css'
const TaskBox = () => {
 return  (
  <div className="container">
    <div className="Task-bar-container">
      <div className="task-header">

      </div>
      <div className="task-deatils-container">
        <div className="task-details">
          <input type="checkbox" name="" id="checkbox" />
          <h4 id='status'>Gardening</h4>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        <div className="date-time">
          
        </div>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        </div>
        <div className="task-details">
        <input type="checkbox" name="" id="checkbox" />
        <h4 id='status'>Gardening</h4>
        </div>
      </div>

    </div>
  </div>
 );
};


export default TaskBox;
