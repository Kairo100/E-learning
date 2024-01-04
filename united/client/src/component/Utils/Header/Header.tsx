import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../../redux/store';
import { useEffect, useState } from 'react';
import { AiFillCloseCircle, AiFillCloseSquare, AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { CardTravel, Dashboard, Explore, LogoutOutlined, MailRounded, ManageAccountsSharp, Person, Settings } from '@mui/icons-material';
import { Logout } from '../../../redux/Slices/Dashboard/User/userInfo';
import { FaBookOpen, FaSearch } from 'react-icons/fa';
import { Dialog, TextField } from '@mui/material';
import Dropdown from '../../Dashboard/DataList/Category/Dropdown';
import { DropdownComponent } from '../../../CategoryDrodown';
import './Header.css'
interface User {
  id: number;
  givenName: string;
  username: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

const Header = () => {
  const user = useSelector((state: RootState) => state.user);
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const dispatch = useDispatch<AppDispatch>();
  const [mobiles, setmobiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog,setopenDialog]=useState(false)
 const handleshow=()=>{
  setopenDialog(!openDialog)
 }
 const handlehide=()=>{
  setopenDialog(false)
 }
  const logoutHandler = () => {
    dispatch(Logout());
  };

  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Add your search functionality here
    console.log('Search query:', searchQuery);
    // Redirect to search results page
    navigate(`/search?q=${searchQuery}`);
  };
  const [isSticky,setisSticky]=useState(false)

  useEffect(()=>{
  const handlescroll=()=>{
      if(window.scrollY >100){
          setisSticky(true)
      }
      else{
          setisSticky(false)
      }
  }
  window.addEventListener('scroll',handlescroll)
  return()=>{
      window.addEventListener('scroll',handlescroll)
  }
  },[])
  return (
    // <div style={{zIndex:'500'}} className={`${isSticky ?'border border-b-3 bg-white ':'bg-gray-100'} pt-4 headercontiner w-full fixed`}>
     <div>
   
    
    <div className={`${isSticky?'border-b border-solid border-gray-400 headercontiner w-full bg-white text-black ':'headercontiner w-full bg-white text-black  '}`}>
    <div  className='containerheader '>
    <div className="flex  gap-8 items-center">
    <div  className='logo ' style={{ display: 'flex',alignItems:'center' }}>     </div>
      <div>
         <Link to={'/'}>
          {/* <img className='' style={{ width: 50, height: 50 }} src="../assets/logo.png" alt="" /> */}
          <p style={{fontSize:'30px',color:"blue",fontWeight:'bolder'}} >SeAsom</p>
        </Link>
        </div>
        <div className={mobiles ? 'nav-links-mobile shadow-[0_3px_10px_rgb(0,0,0,0.2)] bg-gray-50' : 'headers'} onClick={() => setmobiles(false)}>
         
          <div className='text-black ' style={{fontWeight:'bolder',fontSize:'20px'}}>
            <Link to={'cources'}>Cources</Link>
          </div>
          {/* <div>
            <Link to={'exam'}>Exams</Link>
          </div> */}
          {/* <div className='text-black'>
            <Link to={'Contact'}>Contact</Link>
          </div> */}
          </div>
       
    </div>
{/* <Dialog open={openDialog} onClose={handleshow}> */}

  {/* Hi */}

{/* </Dialog> */}

 

      <div className='btnscontinerheader flex gap-4'>
      
        {userInfo.givenName ? (
          <div className='showinddatabuttons grid grid-cols-2 '>
            <div className='relative'>
              {/* image */}
              <div onClick={() => setShow(!show)}>
                {' '}
                <p className='prifleuser'>{userInfo.givenName[0]}</p>
              </div>

              {/* options */}
              {show ? (
                <div className="adminsdashboard  block  bg-white shadow-[0_3px_10px_rgb(0,0,0,0.2)] rounded absolute">
                  <div className='p-2' style={{display:'block'}}>
                    <p className="text-gray-400 pt-4 pb-2 hover:text-gray-300">
                      <Person />
                      {userInfo.givenName}
                    </p>
                    <p className="text-gray-400 flex mt-1 hover:text-gray-300 cursor-pointer">
                      <ManageAccountsSharp/>
                      <Link to={'/teacherDashboard'} className='flex'>Teacher Dashboard</Link>
                    </p>
                    <p className="text-gray-400 mt-4 gap-2 ml-1 hover:text-gray-300 flex items-center cursor-pointer">
                       <FaBookOpen />
                      <Link to={'/studentdashboard'}>My Learning</Link>
                    </p>
                    <button className=" rounded-lg mt-4">
                      {userInfo.isAdmin && (
                        <button className='flex text-gray-400 mt-4 font-semibold hover:text-gray-300'>
                          <Link to="/dashboard">
                            <MailRounded /> Dashboard
                          </Link>
                        </button>
                      )}
                    </button>
                    <button onClick={logoutHandler} className="text-gray-400 mt-4 font-semibold hover:text-gray-300">
                      <LogoutOutlined /> Logout
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
            <div></div>
          </div>
        ) : (
          <>
            <Link to='/register'>
              <button  style={{border:'1px solid orange'}} className='rounded-md text-black px-4  '>login</button>
            </Link>
      
          </>
        )}

        <div>
          <p className='mobile-menu-icon' onClick={() => setmobiles(!mobiles)} style={{ fontSize:24, cursor: 'pointer' }}>
            {mobiles ? <AiOutlineClose /> : <AiOutlineMenu />}
          </p>
        </div>
      </div>
    </div>
   
  </div>
  {openDialog &&  <div
  onClick={handlehide}
  className="bg-white ml-16 text-black w-[160px]  mt-16 absolute items-center h-full flex-start border"
  onMouseLeave={handlehide}
  style={{
    position: 'absolute',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    zIndex:'1px'
  }}
  // title={longContent} // Replace 'longContent' with the actual content to be displayed in the tooltip
>
  <DropdownComponent />
</div>}

  </div>
  );
};

export default Header;