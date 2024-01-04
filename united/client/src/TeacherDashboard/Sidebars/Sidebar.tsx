import "./Sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import logo from './logo.png'
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import { Computer, EarbudsRounded, Quiz } from "@mui/icons-material";
import { BiDollar } from "react-icons/bi";
import { FaBookOpen } from "react-icons/fa";

const Sidebar = () => {
//   const { dispatch } = useContext(DarkModeContext);
  return (
    <div  className="sidebar bg-white  text-gray-500">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
           <div style={{fontWeight:'bolder',fontSize:'18px'}} className="text-blue-600">
            SeAsom
           </div>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
      
          <li className="hover:bg-blue-400 bg-blue-700  text-white rounded hover:text-white">
            <DashboardIcon className="icon" />
              <Link to={'/teacherDashboard'}><span>Home</span></Link>
          </li>
          <li className="hover:bg-blue-400 bg-blue-700  text-white  my-8 rounded hover:text-white">
            <FaBookOpen className="icon" />
              <Link to={'Cources'}><span>cources</span></Link>
          </li>
    
          {/* <li className="hover:bg-blue-400 rounded hover:text-white">
            <Quiz className="icon" />
              <Link to={'Quiz'}><span>Quiz</span></Link>
          </li> */}
     
 
        </ul>
      </div>
 
      </div>
  
  );
};

export default Sidebar;