import React, { useState, useEffect } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Book, BookOnline, Category, ContactMail, Paid, ReadMoreOutlined, RequestQuote } from "@mui/icons-material";
// import { PiExam, PiStudentBold } from "react-icons/pi";
// import './DashboardSidbar.css'
const Sidebar = () => {
  const menud = [
    { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
    { name: "Users", link: "users", icon: AiOutlineUser, },
    { name: "Categories", link: "categories", icon: Category},
    // { name: "Contact", link: "contact", icon: ContactMail },
    { name: "Courses", link: "cources", icon: BookOnline},
    { name: "Payment", link: "payment", icon: RiSettings4Line },
    { name: "Requestpayment", link: "Requestpayment", icon: RequestQuote },

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

  return (
    <section  className="sectioncontiner  mt-[7px]" >
    <div  className={`${open ? "w-62 " : "w-[90px]"} divcontiner min-h-screen shadow-[0_3px_30px_rgb(0,0,0,0.2)] duration-500 text-gray-100 px-4`}>
        <div className={`${open ? 'flex items-center justify-between':'block ml-0'}`}>
        <Link className="text-blue-800 " to={'/'}>
       SeAsom
          </Link>
        
          <div className={`${open ? 'py-3 flex justify-end':'justify-left mt-4'}`}>
            <HiMenuAlt3
              size={26}
              
              className="cursor-pointer text-gray-500"
              onClick={() => setOpen(!open)}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menud?.map((menu, i) => (
            <Link
              to={menu?.link}
              key={i}
              className={`${
                menu?.margin && "mt-5"
              } group flex items-center text-sm font-medium p-2 hover:bg-gray-800 rounded-md`}
            >
              <div style={{color: open ? "gray" : "gray"}} className="text-gray-400 group-hover:text-gray-200">
                {React.createElement(menu?.icon, { size: "20" })}
              </div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                  color: open ? "gray" : "gray"
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
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
  );
};

export default Sidebar;