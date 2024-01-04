import Sidebar from '../../component/Dashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { MenuList, Switch } from '@mui/material';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import { LogoutOutlined, NotificationAdd, MailRounded, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Logout } from "../../redux/Slices/Dashboard/User/userInfo";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import CategoryCount from './Catogory/Count';
import ContactCount from '../../component/Dashboard/DataList/Contact/ContactCount';
// import React, { useState, useEffect } from "react";
import './Dashboard.css'
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
// import { Link } from "react-router-dom";
import { Book, BookOnline, Category, ContactMail, Paid, ReadMoreOutlined, RequestQuote } from "@mui/icons-material";
import CountRequets from '../../TeacherDashboard/RequestPayment/cout';
interface User {
  id: number;
  givenName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const DashRouter: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [show, setShow] = useState(false);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const [Mode, setMode] = useState(false);
  const menud = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Categories", link: "categories", icon: Category},
    { name: "Cources", link: "cources", icon: BookOnline},
    { name: "Paid", link: "payment", icon: RiSettings4Line },
    { name: "Requests Money", link: "Requestpayment", icon: RequestQuote },
    // { name: "Contact", link: "contact", icon: ContactMail },
    { name: "Users", link: "users", icon: AiOutlineUser, },

  ];

  const [open, setOpen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setOpen(window.innerWidth >= 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  // useEffect(() => {
  //   // Retrieve user data from local storage
  //   const userData = localStorage.getItem('userInfo');
  //   if (userData) {
  //     const user: User = JSON.parse(userData);

  //     // Check if user is admin
  //     if (!user.isAdmin) {
  //       // Redirect to a different page if not admin
  //       navigate('/');
  //     }
  //   } else {
  //     // Redirect to login page if user data is not found
  //     navigate('/login');
  //   }
  // }, [navigate]);

  const logoutHandler = () => {
    dispatch(Logout());
  };

  const handleMode = () => {
    setMode(!Mode);
  };

  return (
    <div className={`dashboardrouter`}>
      <div className=''>
        {/* <Sidebar /> */}
      </div>
    <div className='w-[100%] bg-white'>
        <div className='dashboardnavbar'>
          <div   className="navbar mb-2">
            <div className="wrapper shadow-[0_3px_30px_rgb(0,0,0,0.2)]">
            <div className={`${open ? 'flex items-center gap-16 justify-between':'flex items-center ml-0'}`}>
        <Link className={`${open ?'':' text-blue-800'}`}to={'/'}>
       <p className='text-blue-600 ' style={{fontWeight:'bolder',fontSize:'20px'}}>SeAsom</p>
          </Link>
        
          <div className={`${open ? 'py-3 flex justify-end':'justify-left mt-4'}`}>
            <HiMenuAlt3
              size={26}
              
              className="cursor-pointer text-gray-500"
              onClick={() => setOpen(!open)}
            />
          </div>
          {/* <MenuList clas/> */}
        </div>
              <div  className=" flex items-center">
                {/* <input
                  className='w-full py-2 pl-2 outline-none'
                  type="text"
                  placeholder="Search..."
                  
                /> */}
             {/* <p  style={{color:"white"}} >We are leading the market</p> */}
                {/* <SearchOutlinedIcon className='ml-2' /> */}
              </div>
              <div className="items">
                <div style={{color:"blue",marginRight:"6px"}}  className="item">
                  <LanguageOutlinedIcon  />
                  English
                </div>
               
            
                <div className="item">
                 <Link style={{color:"blue"}} to={'Requestpayment'}> <NotificationsNoneOutlinedIcon  /></Link>
                  <div  className="counter"><CountRequets/></div>
                </div>
   {/* <mone */}
                <div className="item text-white">
                  {userInfo.givenName ? (
                    <div className='showinddatabuttons grid grid-cols-2'>
                      <div className='relative'>
                        <div className="flex items-center gap-4">
                       
                          <div
                            className='cursor-pointer relative'
                            onClick={() => setShow(!show)}
                          >
                            <p className='' style={{backgroundColor:'black',width:'40px',fontWeight:'bolder',fontSize:'25px',height:'40px',alignItems:'center',textAlign:'center',borderRadius:'50%'}}>{userInfo.givenName[0]}</p>
                      
                          </div>
                        </div>

                        {show && (
                          <div className="adminsdashboard p-2  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded absolute">
                            <div>
                              <p className="text-blue-600">
                                <Person />
                                {userInfo.givenName}
                              </p>
                              <div>
                                {userInfo.isAdmin && (
                                  <Link to="/dashboard">
                                    <button className='text-blue-600'>
                                      <MailRounded /> Dashboard
                                    </button>
                                  </Link>
                                )}
                              </div>
                              <div>
                                <button
onClick={logoutHandler}
                                  className='text-blue-600'
                                >
                                  <LogoutOutlined /> Logout
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                       <Link to='/register'>
              <button  style={{border:'1px solid orange'}} className='rounded-md text-black px-4  '>login</button>
            </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
     <div className="flex ">
     <div>
     <section  className="sectioncontinerSidebar h-full  divcontiner shadow-[0_3px_30px_rgb(0,0,0,0.2)] duration-500 text-gray-100 px-4 mt-[-5px]" >
    <div  className={`${open ? "w-62 " : "w-[80px]"}`}>
       
        <div className="mt-4 flex flex-col gap-4 relative">
          {menud?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`text-blue-700 group flex items-center text-sm font-medium p-2 hover:bg-orange-600 hover:text-white rounded-md`}
            >
              <div className="hover:text-white">
                {React.createElement(menu?.icon, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                  // color: open ? "blue" : "blue"
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28  overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>
              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
              >
                {menu?.name}
              </h2>
            </Link>
          ))}
        </div>
     

      </div>
    </section>
     </div>
        <Outlet />
     </div>
      </div>
     
    </div>
  );
};

export default DashRouter;