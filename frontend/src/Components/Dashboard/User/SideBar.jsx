// import {  NavLink } from "react-router-dom";
// import { FaBars, FaHome} from "react-icons/fa";
// import { TbTargetArrow } from "react-icons/tb";
// import { FaPlus } from "react-icons/fa";
// import { useState } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// const routes = [
//   {
//     path: "/Dashboard",
//     name: "Dashboard",
//     icon: <FaHome />,
//   },
//   {
//     path: "/Add",
//     name: "Add",
//     icon: <FaPlus />,
//   },
//   {
//     path: "/Target",
//     name: "Target",
//     icon: <TbTargetArrow />,
//   },
//   {
//     path : "/UserProfile",
//     name: "profile",
//   }
// ];
// const SideBar = ({ children }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const toggle = () => setIsOpen(!isOpen);
//   const showAnimation = {
//     hidden: {
//       width: 0,
//       opacity: 0,
//       transition: {
//         duration: 0.5,
//       },
//     },
//     show: {
//       opacity: 1,
//       width: "auto",
//       transition: {
//         duration: 0.5,
//       },
//     },
//   };
//   return (
//     <>
//       <div className="main-container">
//         <motion.div
//           animate={{
//             width: isOpen ? "200px" : "60px",
//             transition: {
//               duration: 0.5,
//               type: "spring",
//               damping: 10,
//             },
//           }}
//           className={`sidebar `}
//         >
//           <div className="top_section">
//             <AnimatePresence>
//               {isOpen && (
//                 <motion.h1
//                   variants={showAnimation}
//                   initial="hidden"
//                   animate="show"
//                   exit="hidden"
//                   className="logo"
//                 >
//                   DailyDose
//                 </motion.h1>
//               )}
//             </AnimatePresence>
//             <div className="bars">
//               <FaBars onClick={toggle} />
//             </div>
//           </div>
//           <section className="routes">
//             {routes.map((route, index) => {
//               if (route.subRoutes) {
//               }
//               return (
//                 <NavLink
//                   to={route.path}
//                   key={index}
//                   className="link"
//                   activeClassName="active"
//                 >
//                   <div className="icon">{route.icon}</div>
//                   <AnimatePresence>
//                     {isOpen && (
//                       <motion.div
//                         variants={showAnimation}
//                         initial="hidden"
//                         animate="show"
//                         exit="hidden"
//                         className="link_text"
//                       >
//                         {route.name}
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </NavLink>
//               );
//             })}
//           </section>
//         </motion.div>
//         <main>{children}</main>
//       </div>
//     </>
//   );
// };
// export default SideBar;



import React from "react";
import "../../userDashboard/userNav.css";
import logo from  "../../../assets/images/logo.png"
import { Link } from "react-router-dom";
const SideBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img alt="user avatar" src={logo} />
      </div>
      <ul className="navbar__menu">
        <li className="navbar__item">
          <Link to="/dashboard"  className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span>Home</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link  to="/add" className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Add</span>
          </Link>
        </li>
        <li className="navbar__item">
          <Link to="/target" className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="text-white">
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="6" />
              <circle cx="12" cy="12" r="2" />
            </svg>
            <span>Target</span>
          </Link>
        </li>
        {/* <li className="navbar__item">
          <a href="#" className="navbar__link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-white">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span>Users</span>
          </a>
        </li> */}
      </ul>
      <div className="user__profile">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-user">
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      </div>
    </nav>
  );
};

export default SideBar;
//onclick fun --> path (check role) 