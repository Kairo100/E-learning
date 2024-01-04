import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlayCircle } from 'react-icons/fi';
import { RiAdminLine, RiBookOpenLine } from 'react-icons/ri';
import { BsCalendar } from 'react-icons/bs';
import { AiFillStar } from 'react-icons/ai';
import ChartYear from '../../component/Chart/Chartyear';
import { BiBookOpen, BiUser } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import ChartCources from '../../component/Chart/Chartcource';
import z from '../../component/Dashboard/DataList/Cource/Chart';
import './Mian.css'
import online from './undraw_Online_learning_re_qw08 (1).png'
import EnrollmentsChart from '../../component/Dashboard/DataList/Cource/Chart';
import { Category } from '@mui/icons-material';
import CourceCount from './Cource/Count';
import CategoryCount from './Catogory/Count';
import UserCount from './Users/Count';
interface users{
  id:number;
  givenName:String;
  email:String;
  username:String;
  isAdmin:Boolean;
}
const Main = () => {
  const [userList, setUserList] = useState<users[]>([]);
  useEffect(() => {
    fetch('http://localhost:2000/api/user/get/all')
      .then(response => response.json())
      .then(data => {
        setUserList(data.result);
      })
      .catch(error => {
        // Handle error
      });
  }, []);

  return (
    <div className="container mx-auto pt-8">
 <div className='bg-white flex justify-between mx-4 text-white p-4 text-xl rounded-md mx-4 h-[200px] shadow-[4px_3px_30px_rgb(0,0,0,0.2)] text my-4 rounded' style={{fontWeight:'bolder'}}>
  <div>
    <h1 className='text-xl text-blue-700'>Welcome to SeAsom College !</h1>
    <p className='text-gray-300' style={{fontSize:'12px'}}>We offer exceptional education and a supportive learning environment.</p>
    {/* <p className='text-gray-300' style={{fontSize:'12px'}}>Our experienced faculty and modern facilities ensure a quality learning experience.</p> */}
    <p className='text-gray-300' style={{fontSize:'12px'}}>Join us and unlock your potential for a successful future.</p>
  </div>
  <div>
    <img className='w-[400px] h-[180px] text-white mt-[-2px]' src={online} alt="" />
  </div>
</div>
      <div className="md:flex sm:block gap-5">
        <div style={{ flex: '4' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white ml-4 rounded-xl shadow-[0_3px_30px_rgb(0,0,0,0.2)] p-6">
              <div className="flex shadow-[0_3px_30px_rgb(0,0,0,0.2)] items-center justify-center rounded-full bg-blue-500 text-white w-12 h-12">
                <BiBookOpen className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mt-4">cources</h3>
              <p className="text-gray-300  style={{fontSize:'12px'}}mt-2">
                This cources is important us
              </p>
              <Link
                to="cources"
                className="text-blue-500 underline font-medium mt-4 hover:underline"
              >
                View All Courses
              </Link>
              <p className='flex items-center'> cources <CourceCount/></p>
            </div>
            <div className="bg-white ml-4 rounded-xl shadow-[0_3px_30px_rgb(0,0,0,0.2)] p-6">
              <div className="flex shadow-[0_3px_30px_rgb(0,0,0,0.2)] items-center justify-center rounded-full bg-blue-500 text-white w-12 h-12">
                <Category className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mt-4">categories</h3>
              <p className="text-gray-300  style={{fontSize:'12px'}}mt-2">
                our categories
              </p>
              <Link
                to="categories"
                className="text-blue-500 font-medium mt-4 hover:underline"
              >
                View All Categories
              </Link>
              <p className='flex'> categories:<CategoryCount/></p>
 
            </div>
         

            <div className="bg-white ml-4 rounded-xl shadow-[0_3px_30px_rgb(0,0,0,0.2)] p-6">
              <div className="flex shadow-[0_3px_30px_rgb(0,0,0,0.2)] items-center justify-center rounded-full bg-blue-500 text-white w-12 h-12">
                <FaUser className="text-3xl" />
              </div>
              <h3 className="text-xl font-semibold mt-4">Users</h3>
              <p className="text-gray-300  style={{fontSize:'12px'}}mt-2">
              you can see easy users
              </p>
              <Link
                to="users"
                className="text-blue-500 font-medium mt-4 hover:underline"
              >
                View All users
              </Link>
              <p className='flex'> users :<UserCount/></p>
            </div>

   

          
<div className='w-full'>
<EnrollmentsChart />
</div>
          </div>
        </div>
        <div className='Adminpanel' style={{ flex: '1' , overflow:'auto'}}>
          <div className="bg-blue-600 text-white rounded-xl w h-screen  shadow-[0_3px_30px_rgb(0,0,0,0.2)]">
            <div className="flex justify-between items-center px-4 py-2">
              <p className='text-xl text-white'>Admin users</p>
              <RiAdminLine />
            </div>
            {userList.map((user) => (
       <div>   <li key={user.id}>
       {user.isAdmin &&<div className='m-2 tex shadow w-full p-2 rounded '>
       <p className='text-gray-300' style={{fontSize:'12px'}}> {user.givenName} </p><br/>
        <p className='text-gray-300' style={{fontSize:'12px'}}> {user.email} </p><br/>
        <p className='text-gray-300' style={{fontSize:'12px'}}> {user.username} </p><br/>
        </div>}
      </li> 
        
          </div>
        ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;