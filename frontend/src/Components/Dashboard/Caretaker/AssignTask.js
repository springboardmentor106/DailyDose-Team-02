import React, { useState, useEffect } from 'react'
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
        <div className="Assign_pages" style={{fontSize:"15px"}}>
        <div className='assign-heading'>
            <h5><strong>Assign Task</strong></h5>
        </div>
        <div className="assign-main">
        <div className="assign-left">
        <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Select User</label>
            <div class="input-group" style={{marginBottom:"15px"}}>
            <select class="form-select" id="inputGroupSelect04" aria-label="Example select with button addon">
                <option selected>Select User</option>
                {profileinfo.map((profile,index)=>(
                    <option value={profile.name} key={index}>{profile.name}</option>
                ))}
                
            </select>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Date</label>
            <input type="date" className='form-control' style={{marginBottom:"18px"}}/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Category</label>
            <input type="text" className='form-control' style={{marginBottom:"18px"}}/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Discription</label>
            <input type="text" className='form-control' style={{marginBottom:"18px"}}/>
            <input type="text" className='form-control' style={{marginBottom:"18px"}}/>
            </div>
            
        </div>
        <div className='assign-right'>
            <div >
                <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Title</label>
                <input type="Text" class="form-control" id="exampleFormControlInput1" placeholder="enter the title" style={{marginBottom:"15px"}}/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>Start Date</label>
            <input type="date" className='form-control' style={{marginBottom:"18px"}}/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px"}}>End Date</label>
            <input type="date" className='form-control' style={{marginBottom:"18px"}}/>
            </div>
            <div>
                
            <label for="exampleFormControlInput1" class="form-label" style={{fontSize:"18px",color:"white"}}>.</label>
            <input type="text" className='form-control' style={{marginBottom:"18px"}} />
            <input type="text" className='form-control' style={{marginBottom:"18px"}} />
            </div>
        </div>
        </div>
        </div>
    </div>
  )
}

export default AssignTask
