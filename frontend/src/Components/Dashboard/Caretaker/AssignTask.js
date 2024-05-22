import React from 'react'
import UserNav from '../../userDashboard/UserNav'
import'./Pages.css'
import {profileinfo} from './StaticDataCare' 
const AssignTask = () => {
  return (
    <div className='Assign'>
        <div className="nav-bar">
            <UserNav/>
        </div>
        <div className="Assign_pages">
        <div className='assign-heading'>
            <h5><strong>Assign Task</strong></h5>
        </div>
        
        <div className="card" id="Assign-card"><div className="card-body" >
            
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
            <input type="text" className='form-control' /> <br />
            <input type="text" className='form-control' /> <br />
            <input type="text" className='form-control' /> <br />
            <input type="text" className='form-control' />
            </div>
            
                </div>
                <div className='assign-right'>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Title</label>
                <input type="Text" class="form-control" id="exampleFormControlInput1" placeholder="enter the title"/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">Start time</label>
            <input type="time" className='form-control'/>
            </div>
            <div>
            <label for="exampleFormControlInput1" class="form-label">End time</label>
            <input type="time" className='form-control'/>
            </div>
            <div id='textarea'>
            <label for="exampleFormControlInput1" class="form-label" id="assign-des">Descripton</label>
            <textarea name="add Description" id=""></textarea>
            </div>
                </div>
            
        </div>
        
        
        </div>
        
        </div>
        
        </div>
    
  )
}

export default AssignTask
