import React from 'react'
import UserNav from '../../userDashboard/UserNav'
import UserProfile from '../dashComponents/UserProfile'
const Notification = () => {
  return (
    

    <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog model-lg modal-dialog-scrollable">
        <div className="modal-content">
      
        <div class="modal-header" style={{backgroundColor:"#6a58dc", color:'white'}}>
        <h4 class="modal-title"><strong>Notification</strong></h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
        <div className="modal-body" >
        <div className='notify-body' style={{marginBottom:"10px"}}>
          <div className="card" style={{borderRadius:"25px",padding:"10px"}}>
            <div className="card-title" style={{backgroundColor:"white", color:"black", marginLeft:"10px",  fontSize:"20px"}}>Goal Achevied !!!</div>
            <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row" ,width:"100%"}}>
              <div style={{marginTop:"6px"}}>Congratulation you have achived your goal!!!</div>
              <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc", color:"white"}}>goal</button></div>
            </div>
          </div>

        </div>

        <div className='notify-body' style={{marginBottom:"10px"}}>
          <div className="card" style={{borderRadius:"25px",padding:"10px"}}>
            <div className="card-title" style={{backgroundColor:"white", color:"black", marginLeft:"10px",  fontSize:"20px"}}>Goal Achevied !!!</div>
            <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row" ,width:"100%"}}>
              <div style={{marginTop:"6px"}}>Congratulation you have achived your goal!!!</div>
              <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc", color:"white"}}>goal</button></div>
            </div>
          </div>

        </div>

        <div className='notify-body' style={{marginBottom:"10px"}}>
          <div className="card" style={{borderRadius:"25px",padding:"10px"}}>
            <div className="card-title" style={{backgroundColor:"white", color:"black", marginLeft:"10px",  fontSize:"20px"}}>Goal Achevied !!!</div>
            <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row" ,width:"100%"}}>
              <div style={{marginTop:"6px"}}>Congratulation you have achived your goal!!!</div>
              <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc", color:"white"}}>goal</button></div>
            </div>
          </div>

        </div>

        <div className='notify-body' style={{marginBottom:"10px"}}>
          <div className="card" style={{borderRadius:"25px",padding:"10px"}}>
            <div className="card-title" style={{backgroundColor:"white", color:"black", marginLeft:"10px",  fontSize:"20px"}}>Goal Achevied !!!</div>
            <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row" ,width:"100%"}}>
              <div style={{marginTop:"6px"}}>Congratulation you have achived your goal!!!</div>
              <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc", color:"white"}}>goal</button></div>
            </div>
          </div>

        </div>
      </div>
      
    </div>
  </div>
</div>
  )
}

export default Notification
