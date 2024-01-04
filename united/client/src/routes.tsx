import { createBrowserRouter, Outlet } from 'react-router-dom';

import NotFound from './component/Utils/NotFound/NotFound';
import { Login } from './Pages/Dashboard/Users/Login';
// import { DashRouter } from './Pages/Dashboard/DashRouter';
import { Category } from './Pages/Dashboard/Catogory/Category';
// import  { Main } from './Pages/Dashboard/Main';
// import { Users } from './Pages/Dashboard/Users';
import Footer from './component/Utils/Footer/Footer';
import HomePage from './component/Utils/Homepage/HomePage';
// import Createsubcatogory from './Pages/Dashboard/createsubcatogory';
import About from './component/Utils/About/About';
// import { CreateCategory } from './Pages/Dashboard/Catogory/CreateCategory';
import { Cource } from './Pages/Dashboard/Cource/Cource'
// import {CreateCategory} from './Pages/Dashboard/Catogory/CreateCategory';
import { User } from './Pages/Dashboard/Users/Users';
import UpdatCategory from './Pages/Dashboard/Catogory/update';

import UpdateCource from './Pages/Dashboard/Cource/update';
import UpdateUser from './Pages/Dashboard/Users/update';


import Register from './Pages/Dashboard/Users/Register';

import DashRouter from './Pages/Dashboard/DashRouter';
// import PaymentForm from './component/Dashboard/DataList/Payment/Payment';

import Main from './Pages/Dashboard/Main';
import Payments from './Payment';

import Home from './TeacherDashboard/Main/Hometeacher';
import CreateCoursePage from './TeacherDashboard/Cource/CreateCource';

import ContactLst from './component/Utils/Contact/Contact';
import Registersection from './TeacherDashboard/Section/Createsection';
import Getallsection from './TeacherDashboard/Section/Getallsection';
import CreateLesson from './TeacherDashboard/Leeson/CreateLeesson';
import OnlineEnrollment from './TeacherDashboard/OnlineEnrollment/OnlineEnrollment';

import Studentdashboard from './Studentdashboard/Studentdashboard';

import Header from './component/Utils/Header/Header';
import UpdateSection from './TeacherDashboard/Section/Update';
import UpdateLesson from './TeacherDashboard/Leeson/update';

import TeacherDashboard from './TeacherDashboard/Dashboard/Dashboard';
import GetAllCoursesTeacher from './TeacherDashboard/Cource/getallcourcesteacher';

import Courcesandcategory from '././component/Dashboard/DataList/Cource/CourceCategory'
import EarningDashboard from './TeacherDashboard/Earning/Earning';
import RequestList from './TeacherDashboard/RequestPayment/getallrequest';
import Recylepinrequest from './TeacherDashboard/RequestPayment/RecycleRequestPayment';
import DetailcourceTeacher from './TeacherDashboard/Cource/Detail';
import UpdateLessons from './TeacherDashboard/Leeson/UpdateLesson';
import QuizList from './TeacherDashboard/Quiz/QuizList';
import Newquiz from './TeacherDashboard/Quiz/newquiz';
import Getonlycource from './component/Dashboard/DataList/Cource/getoneCource';
import Recycleonlinecategory from './component/Dashboard/DataList/Category/Recycle';
import { Recyclecource } from './component/Dashboard/DataList/Cource/Recycle';
import PaymentList from './component/Dashboard/DataList/Payment/PaymentList';
import Restorepayment from './component/Dashboard/DataList/Payment/Recycle';
import UserListRecyclepin from './component/Dashboard/DataList/User/Recyclepinofuser';
import RequestListAccepted from './TeacherDashboard/RequestPayment/accepted';
import CourseDetailAll from './component/Dashboard/DataList/Cource/CourceDetail';
import CourcesandcategoryLink from './component/Dashboard/DataList/Cource/CourceCategoryLnk';
// import PaymentCreate from './Pages/Dashboard/Payment/CreatePayment';



const Router = () => {
  return (
    <div className='flex flex-col  min-h-screen'>
      <div className='headerroute '>
        <Header />
      </div>

      <div className='body flex-grow'>
        <Outlet />
      </div>

      <div className='footer'>
        <Footer/>
      </div>
    </div>
  );
};

export default Router;

export const router = createBrowserRouter([
  {   
    path: '/',
    element: <Router />,
    children: [
      {
        index: true,
        element: <HomePage/>,
      },
      {
        path: 'cource/:id',
        element: <Getonlycource/>,
      },
      {
        path: 'cource/:Id/purchase',
        element: <Payments/>,
      },
      {
        path: 'exam',
        // element: <SearchForm/>,
      },
      {
        path: 'studentdashboard',
        element: <Studentdashboard/>,
      },
   
    
      {
        path: '/cource/:id/enrollment/new/:id',
        element: <OnlineEnrollment/>,
      },

      {
        path: 'about',
        element:<About/>,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'cources',
        element: <CourcesandcategoryLink/>,
      },
      {
        path: 'Contact',
        element: <ContactLst/>,
      },


      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },

{
  path:'/TeacherDashboard',
 element:<Home/>,
 children:[
  {
    index:true,
    path:'/TeacherDashboard',
    element:<TeacherDashboard/>
  },
  {

    path:'/TeacherDashboard/Cources',
    element:<GetAllCoursesTeacher/>
  },
  {

    path:'quiz',
    element:<QuizList/>
  },
  {

    path:'quiz/new/:courceId',
    element:<Newquiz/>
  },
  {

    path:'/TeacherDashboard/Cources/detail/:id',
    element:<DetailcourceTeacher/>
  },
  {
 
    path:'Cource',
    element:<CreateCoursePage/>
  },
  {
 
    path:'Section',
    element:<Getallsection/>
  },
  {
 
    path:'Cources/section/new/:id',
    element:<Registersection/>
  },
  {
 
    path:'Cources/update/:id',
    element:<UpdateSection/>
  },
  // {
 
  //   path:'/lesson/:id',
  //   element:<UpdateLessons/>
  // },

  {
 
    path:'Cources/detail/:id/lesson/:id',
    element:<UpdateLesson/>
  },
  {
 
    path:'Cources/Lesson/new/:id',
    element:<CreateLesson/>
  },
  {
 
    path:'EarningDashboard',
    element:<EarningDashboard/>
  },
 ]
},
  {
    path: '/dashboard',
    element: <DashRouter />,
    children: [
      {  index:true, 
        path:'/dashboard',
        element: <Main/>,
      },
      {
        path: 'categories',
        children: [
          {
            index: true,
            element: <Category />,
          },
          {
            path: 'new',
            // element: <CreateCategory/>,
            // element:<CreateCategory/>
          },
          {
            path:'update/:catId',
            element:<UpdatCategory/>
          },
          {
            path:'Recycle',
            element:<Recycleonlinecategory/>
          },
          {
            path:'delete',
            // element:<ParentComponent/>
          }


        ],
      },
      {
        path:'Requestpayment',
        children:[
          {
            index:true,
            element:<RequestList/>
          },
          {
            path:'recycle',
            element:<Recylepinrequest/>
          },
          {
            path:'accpted',
            element:<RequestListAccepted/>
          }
        ]
      },
    
      {
        path: 'Contact',
        children: [
          {
            index: true,
            // element: <ContactList />,
          },
          {
            path: 'new',
            // element: <CreateCategory/>,
            // element:<CreateCategory/>
          },
          {
            path:'update/:catId',
            element:<UpdatCategory/>
          },
          {
            path:'recycle',
            // element:<Recylecontact/>
          },
          {
            path:'delete',
            // element:<ParentComponent/>
          }


        ],
      },
      {
        path: 'Cources',
        children: [
          {
            index: true,
            element: <Cource/>,
          },
          {
            path: 'new',
            // element: <CreateCoursePage/>,
          },
          {
            path: 'update/:id',
            element: <UpdateCource/>,
          },
          {
            path: 'details/:id',
            element: <CourseDetailAll/>,
          },
          {
            path: 'recycle',
            element: <Recyclecource/>,
          },
      

        ],
      },
      {
        path:'payment',
        children:[
          {
            index:true,
            element:<PaymentList/>
          },
          {
            path:'recycle',
            element:<Restorepayment/>
          }
        ]
      }
      ,

     
      {
        path:'Users',
        children:[
          {
            index:true,
            element:<User/>
          }
          ,{
            path:'update/:id',
            element:<UpdateUser/>
          }
        ]
      },
      {
        path:'Users',
        children:[
          
          {
            index:true,
            element:<User/>
          },
          {
             path:"recycle",
            element:<UserListRecyclepin/>
          },
    
        ]
      },
     
    
     
    ],
  },

]);

