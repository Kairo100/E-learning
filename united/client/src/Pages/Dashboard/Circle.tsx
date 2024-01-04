import Sidebar from '../../component/Dashboard/Sidebar';
import { Outlet, useNavigate } from 'react-router-dom';
import { Switch } from '@mui/material';
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
import { useEffect, useState } from "react";
import CategoryCount from './Catogory/Count';
import ContactCount from '../../component/Dashboard/DataList/Contact/ContactCount';

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
  const [Mode, setMode] = useState(true);

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('userInfo');
    if (userData) {
      const user: User = JSON.parse(userData);

      // Check if user is admin
      if (!user.isAdmin) {
        // Redirect to a different page if not admin
        navigate('/');
      }
    } else {
      // Redirect to login page if user data is not found
      navigate('/login');
    }
  }, [navigate]);

  const logoutHandler = () => {
    dispatch(Logout());
  };

  const handleMode = () => {
    setMode(!Mode);
  };

  return (
    <div className={`dashboardrouter ${Mode ? 'bg-blue-800' : 'bg-red-800'}`}>
      <div className='w-1/6'>
        <Sidebar />
      </div>
      <div className='w-5/6 bg-white'>
        <div className='dashboardnavbar'>
          <div className="navbar">
            <div className="wrapper">
              <div className="search flex items-center">
                <input
                  className='w-full py-2 pl-2 outline-none'
                  type="text"
                  placeholder="Search..."
                />
                <SearchOutlinedIcon className='ml-2' />
              </div>
              <div className="items">
                <div className="item">
                  <LanguageOutlinedIcon className="icon" />
                  English
                </div>
                <div className="item">
                  <DarkModeOutlinedIcon className="icon" onClick={handleMode} />
                </div>
            
                <div className="item">
                 <Link to={'contact'}> <NotificationsNoneOutlinedIcon className="icon" /></Link>
                  <div className="counter"><ContactCount/></div>
                </div>
   
                <div className="item">
                  {userInfo.givenName ? (
                    <div className='showinddatabuttons grid grid-cols-2'>
                      <div className='relative'>
                        <div className="flex items-center gap-4">
                       
                          <div
                            className='cursor-pointer relative'
                            onClick={() => setShow(!show)}
                          >
                            <p className='profile'>{userInfo.givenName[0]}</p>
                      
                          </div>
                        </div>

                        {show && (
                          <div className="adminsdashboard bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded absolute">
                            <div>
                              <p className="text-gray-400">
                                <Person />
                                {userInfo.givenName}
                              </p>
                              <div>
                                {userInfo.isAdmin && (
                                  <Link to="/dashboard">
                                    <button className='dashboards'>
                                      <MailRounded /> Dashboard
                                    </button>
                                  </Link>
                                )}
                              </div>
                              <div>
                                <button
onClick={logoutHandler}
                                  className='text-green-500 font-semibold hover:text-green-700'
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
                        <button className='regbtns'>Register</button>
                      </Link>
                      <Link to={'/login'}>
                        <button className='logbtns'>Login</button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default DashRouter;