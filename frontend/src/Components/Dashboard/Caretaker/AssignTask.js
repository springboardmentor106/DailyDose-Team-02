import React, { useState } from 'react'
import UserNav from '../../userDashboard/UserNav'
import'./Pages.css'
import {profileinfo} from './StaticDataCare'
import { toast } from "react-toastify";

const AssignTask = () => {
    const [FormData,setFormData]=useState({
        user:"",
        title:"",
        date:'',
        startTime:"",
        endTime:"",
        discription:"",
        category:"",
        dayFrequency:""
    })
    const handleChanges=(e)=>{
        const { name, value } = e.target;
        setFormData({ ...FormData, [name]: value });
    }

     const handleSubmit =(e)=>{
        e.preventDefault();
        //let item={FormData.category,FormData.date,FormData.discription,FormData.endTime,FormData.startTime,FormData.title, FormData.user}
        console.log(FormData);

        const URL='http://localhost:5000/api/caretaker/create-user-goal';
        fetch(URL,{
            method:'POST',
            header:{
                "Content-Type": "application/json",
            },
            body:JSON.stringify({title:FormData.title, discription:FormData.discription})
        })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === "success") {
            toast.info("Task assigned");
          }else {
            // Handle errors, e.g., display a message to the user
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
        
    }
    return (
    <div className='Assign'>
        <div className="nav-bar">
            <UserNav/>
        </div>
        <form onSubmit={handleSubmit}>
        <div className="Assign_pages">
            <div className='assign-heading'>
                <h5><strong>Assign Task</strong></h5>
            </div>
        
            <div className="card" id="Assign-card"><div className="card-body" >
                <div className="assign-left">
                    <label for="exampleFormControlInput1" class="form-label">Select User</label>
                    <div class="input-group">
                        <select class="form-select" id="inputGroupSelect04" onChange={handleChanges} name="user" aria-label="Example select with button addon" required>
                        <option selected>Select User</option>
                        {profileinfo.map((profile,index)=>(
                        <option value={profile.name} key={index}>{profile.name}</option>
                        ))}
                        </select>
                    </div>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">Date</label>
                        <input type="date" className='form-control' onChange={handleChanges} name='date'/>
                    </div>
                    <div class="input-group">
                        <select class="form-select" id="inputGroupSelect04" onChange={handleChanges} name="dayFrequency" aria-label="Example select with button addon" required>
                        <option selected>Select User</option>
                        <option value='daily' >weekly</option>
                        <option value='daily' >Daily</option>
                        </select>
                    </div>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">Category</label>
                        <input type="text" className='form-control' onChange={handleChanges} name='category'/> <br />
                        <input type="text" className='form-control' onChange={handleChanges} name='category'/> <br />
                    </div>
                </div>
                <div className='assign-right'>
                    <div class="mb-3">
                        <label for="exampleFormControlInput1" class="form-label">Title</label>
                        <input type="Text" class="form-control" id="exampleFormControlInput1" onChange={handleChanges} name='title' required placeholder="enter the title"/>
                    </div>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">Start time</label>
                        <input type="time" className='form-control' onChange={handleChanges} name='startTime'/>
                    </div>
                    <div>
                        <label for="exampleFormControlInput1" class="form-label">End time</label>
                        <input type="time" className='form-control' onChange={handleChanges} name='endTime'/>
                    </div>
                    <div id='textarea'>
                        <label for="exampleFormControlInput1" class="form-label" id="assign-des">Descripton</label>
                        <textarea name="description" id="" onChange={handleChanges}  required></textarea>
                    </div>
                </div>
                
            
            </div>
            <div><button type='submit' className='btn btn-secondary'>Save</button></div>
        </div>
        </div>
        </form>
        
        
    </div>
    
  )
}

export default AssignTask
