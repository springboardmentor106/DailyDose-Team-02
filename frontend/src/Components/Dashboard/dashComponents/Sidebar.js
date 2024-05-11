import { NavLink } from "react-router-dom";
import { FaBars, FaHome} from "react-icons/fa";
import { TbTargetArrow } from "react-icons/tb";
import { MdPeopleAlt } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import './SideBar.css'; 
// import { AnimatePresence, motion } from "framer-motion";

const SideBar = ({ children }) => {
  const[isOpen,setIsOpen]=useState(false);
  const toggle=()=>setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/Dashboard",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/Add",
      name: "Add",
      icon: <FaPlus />,
    },
    {
      path: "/Target",
      name: "Target",
      icon: <TbTargetArrow />,
    },
    {
      path: "/analytics",
      name: "Analytics",
      icon: <MdPeopleAlt />,
    },
  ];

  
  return (
    <div className="wrapper">
           <div style={{width: isOpen ? "230px" : "60px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">DailyDose</h1>
                   <div style={{marginLeft: isOpen ? "20px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {
                   menuItem.map((item, index)=>(
                       <NavLink to={item.path} key={index} className="link" activeclassName="active">
                           <div className="icon">{item.icon}</div>
                           <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                       </NavLink>
                   ))
               }
           </div>
           <main>{children}</main>

    </div>
  );
};

export default SideBar;