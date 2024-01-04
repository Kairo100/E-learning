import "./Navbar.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { Dashboard, LogoutOutlined, MailRounded, Person, Settings } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Logout } from "../../redux/Slices/Dashboard/User/userInfo";

const Navbar = () => {
  const dispatch =useDispatch<AppDispatch>()
  const logoutHandler = () => {
    dispatch(Logout());
  };
  const [show, setShow] = useState(false);
//   const { dispatch } = useContext(DarkModeContext);
const userInfo = useSelector((state: RootState) => state.userInfo);
  return (
    <div  className="navbar m-0 bg-white w-ful">
      <div className="wrapper">
        {/* <div className="search"> */}
          {/* <input type="text" placeholder="Search..." /> */}
          {/* <SearchOutlinedIcon /> */}
          <div></div>
        {/* </div> */}
        <div className="items">
          {/* <div className="item">
            <LanguageOutlinedIcon className="icon" />
            English
          </div>
          <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              // onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div>
          <div className="item">
            <FullscreenExitOutlinedIcon className="icon" />
          </div>
          <div className="item">
            <NotificationsNoneOutlinedIcon className="icon" />
            <div className="counter">1</div>
          </div>
          <div className="item">
            <ChatBubbleOutlineOutlinedIcon className="icon" />
            <div className="counter">2</div>
          </div>
          <div className="item">
            <ListOutlinedIcon className="icon" />
          </div> */}
          <div className="item">
          {userInfo.givenName ? (
            <div className='showinddatabuttons grid grid-cols-2 '>
              <div className='relative'>
                {/* image */}
                <div
                  
                  onClick={() => setShow(!show)}
                
                >
                  {' '}
                  
                  <p className=' text-white font-bold text-center my-16 rounded-[50%] px-2' style={{background:'blue',fontSize:'20px',width:'40px',cursor:'pointer',border:'3px solid purple',height:'40px'}}>{userInfo.givenName[0]}</p>
                </div>
               
                {/* options */}

                { show ? (
                <div className="w-[114px] z-4  p-2 bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded absolute">
                <div>
                  <p className=" text-gray-500"><Person/>{userInfo.givenName}</p>
                  
         <div>
         <button className="dashboards rounded-lg mt-4">
                  {userInfo.isAdmin && (
                  
                  <button className='flex text-gray-500'><Link to="/dashboard"><Dashboard/> Dashboard     </Link></button>
             
                    )}
                  </button>
         </div>
               <div>
               <button
                    onClick={logoutHandler}
                    className="text-gray-500 font-semibold hover:text-green-700"
                  >
                  <LogoutOutlined/> Logout
                  </button>
               </div>
                </div>
                
                 
                </div>
             
                ) : null}
              </div>
              <div>

              </div>
            </div>
          ) : (
            <>
              <Link to='/register'>
                <button className='regbtns'>
                  Register
                </button>
              </Link>
              <Link to={'/login'}>
                <button  className='logbtns'>
                  Login
                </button>
              </Link>
            </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;