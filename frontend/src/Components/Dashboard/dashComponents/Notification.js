import React, { useEffect, useRef, useState } from 'react'
import UserNav from '../../userDashboard/UserNav'
import UserProfile from '../dashComponents/UserProfile'
import Constants from '../../../constants'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Notification = () => {
  const navigate = useNavigate()
  const modalRef = useRef(null)

  const [notifications, setNotifications] = useState([])
  const getAllNotifications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + '/api/notifications', {
        method: "GET",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        setNotifications(data.notifications)
        console.log("notifiations", data.notifications)
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  const updateNotification = async (notificationId) => {
    try {
      console.log(notificationId)
      const token = localStorage.getItem("token");
      const response = await fetch(Constants.BASE_URL + '/api/notifications', {
        method: "PATCH",
        headers: {
          'Content-Type': "application/json",
          'Authorization': token
        },
        body: JSON.stringify({ notificationId: notificationId })
      });

      if (response.status === 401) {
        navigate("/login");
        localStorage.clear();
        window.location.reload()
        return; // Added return to exit function early
      }

      const data = await response.json();
      if (data.status === "success") {
        navigate("/target")
        getAllNotifications()
        window.location.reload()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error.message); // changed to error.message to properly display the error
    }
  };

  const handleClickNotification = async (notificationId) => {
    const role = localStorage.getItem("role");
    console.log("clicked")
    if (role === "user") {
      navigate("/target")
      // Close the modal programmatically
      const modalElement = modalRef.current;
      if (modalElement) {
        const modalInstance = window.bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
          modalInstance.hide();
        }
      }
      const notificationUpdate = await updateNotification(notificationId)
    }
  }

  useEffect(() => {
    getAllNotifications()
  }, [])
  return (
    <div className="modal fade" id="staticBackdrop3" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true" ref={modalRef}>
      <div className="modal-dialog model-lg modal-dialog-scrollable">
        <div className="modal-dialog model-lg modal-dialog-scrollable">
          <div className="modal-content">

            <div className="modal-header" style={{ backgroundColor: "#6a58dc", color: 'white' }}>
              <h4 className="modal-title"><strong>Notification</strong></h4>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body" >
              {notifications && notifications.notification?.length ? notifications.notification.map((notification) => {
                return (
                  <div className='notify-body' style={{ marginBottom: "10px" }} key={notification.uuid}>
                    <div className="card" style={{ borderRadius: "25px", padding: "10px" }}>
                      <div className="card-title" style={{ backgroundColor: "white", color: "black", marginLeft: "10px", fontSize: "20px" }}>{notification.title || "New notification"}</div>
                      <div className="card-body" style={{ display: "flex", justifyContent: "space-between", flexDirection: "row", width: "100%" }}>
                        <div style={{ marginTop: "6px" }}>{notification.description || "New Notification"}</div>
                      </div>
                      {!notification.actionTaken && notification.belongTo !== "quote" && <div style={{ alignSelf: "flex-end" }}><button className='btn btn-sm' style={{ backgroundColor: "#6a58dc", color: "white" }} onClick={() => handleClickNotification(notification._id)}>go to {notification.belongTo}</button></div>}
                    </div>
                  </div>
                )
              }) : <div>No new notifications</div>}
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification;
