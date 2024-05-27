import React from 'react'
import UserNav from '../../userDashboard/UserNav'
import'./Pages.css'
import {profileinfo} from './StaticDataCare' 
import CareProfile from '../dashComponents/CareProfile'
const AssignTask = () => {
  return (
    <div className='Assign'>
        <div className="nav-bar">
            <UserNav/>
        </div>
        <CareProfile/>
        <div className="Assign_pages">
        <div className='assign-heading'>
            <h5><strong>Assign Task</strong></h5>
        </div>
        <div className="assign-main">
        <div className="assign-left">
        <label for="exampleFormControlInput1" class="form-label">Select User</label>
            <div class="input-group">
            <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option selected>Select User</option>
                {profileinfo.map((profile,index)=>(
                    <option value={profile.name} key={index}>{profile.name}</option>
                ))}
                
            </select>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">Date</label>
            <input type="date" className='form-control'/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">Categogry</label>
            <input type="text" className='form-control' />
            </div>
            
        </div>
        <div className='assign-right'>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input type="Text" class="form-control" id="exampleFormControlInput1" placeholder="enter the title"/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">Start Date</label>
            <input type="date" className='form-control'/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">End Date</label>
            <input type="date" className='form-control'/>
            </div>
        </div>
        </div>
        <div id='textarea'>
            <label for="exampleFormControlInput1" class="form-label">Descripton</label>
            <textarea name="add Description" id=""></textarea>
            </div>
        </div>
    </div>
  )
}

export default AssignTask
