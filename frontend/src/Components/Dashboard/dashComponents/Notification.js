import React from 'react'
import UserNav from '../../userDashboard/UserNav'
import UserProfile from '../dashComponents/UserProfile'
const Notification = () => {
  return (
    // <div className="main1" style={{opacity:"1"}}>
    //     <div className="nav-bar">
    //       <UserNav/>
    //     </div>
    //     <UserProfile/>
    //     <div className="notify" style={{paddingLeft:"110px",width:"100%"}}>
    //     <div className='Notification-heading' 
    //     style={{backgroundColor:"#6a58dc",color:"white", borderRadius:"20px", padding:"15px",
    //       display:"flex", flexDirection:"row", justifyContent:"space-between",margin:"10px"
    //     }}>
    //         <div><h4><strong>Notification</strong></h4></div>
    //         <div><button type="button" className="btn-close" ></button></div>

    //     </div>
    //     <div className="Nodtification-body">
        

    //       <div className="card" style={{borderRadius:"20px",marginBottom:"10px"}}>
    //         <div className="card-title" style={{backgroundColor:"white", color:"black",marginLeft:"1%",display:"flex",justifyContent:"flex-start",gap:"10px"}}>
    //          <div><h5><strong>Goal Achived </strong></h5></div>
    //          <div><h5>12:00</h5> </div>
    //         </div>
    //         <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row",width:"97%"}}>
    //           <div><p>Congratulation !!! you have achive your goal "by reading Daily"</p></div>
    //           <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc",color:"white"}}>Go to Goal</button></div>
    //         </div>
            
    //       </div>
    //       <div className="card" style={{borderRadius:"20px",marginBottom:"10px"}}>
    //         <div className="card-title" style={{backgroundColor:"white", color:"black",marginLeft:"1%",display:"flex",justifyContent:"flex-start",gap:"10px"}}>
    //          <h5><strong>Goal Achive</strong></h5>
    //          <div><h5>12:00</h5> </div>
    //         </div>
    //         <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row",width:"97%"}}>
    //           <div><p>Congratulation !!! you have achive your goal "by reading Daily"</p></div>
    //           <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc",color:"white"}}>Go to Goal</button></div>
    //         </div>
            
    //       </div>

    //       <div className="card" style={{borderRadius:"20px",marginBottom:"10px"}}>
    //         <div className="card-title" style={{backgroundColor:"white", color:"black",marginLeft:"1%",display:"flex",justifyContent:"flex-start",gap:"10px"}}>
    //          <h5><strong>Goal Achive</strong></h5>
    //          <div><h5>12:00</h5> </div>
    //         </div>
    //         <div className="card-body" style={{display:"flex", justifyContent:"space-between", flexDirection:"row",width:"97%"}}>
    //           <div><p>Congratulation !!! you have achive your goal "by reading Daily"</p></div>
    //           <div><button className='btn btn-sm' style={{backgroundColor:"#6a58dc",color:"white"}}>Go to Goal</button></div>
    //         </div>
            
    //       </div>

    //    </div>
    //     </div>
    // </div>

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
