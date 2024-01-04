import React from 'react'
import './Widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Person2Outlined } from '@mui/icons-material';
import UserCount from '../../Pages/Dashboard/Users/Count';
import { Link } from 'react-router-dom';
import CategoryCount from '../../Pages/Dashboard/Catogory/Count';
import TeacerCount from '../../Pages/Dashboard/Teacher/Count';
import CourceCount from '../../Pages/Dashboard/Cource/Count';
import StudentCount from '../../Pages/Dashboard/Students/Count';
import ExamCount from '../../Pages/Dashboard/Exam/Count';
const Widget = () => {
  return (
 <div className='continerofwidget'>
     <div className='Widget'>
        <div className="left">
            <span className='title'>Students</span>
            <span className='Counter'><StudentCount/></span>
            <Link to={'students'}><span className='Linkuser'>See all Students</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                <StudentCount/>%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
     <div className='Widget'>
        <div className="left">
            <span className='title'>Payment</span>
            <span className='Counter'><UserCount/></span>
            <Link to={'Payments'}><span className='Linkuser'>See all Payments</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
     <div className='Widget'>
        <div className="left">
            <span className='title'>Fees</span>
            <span className='Counter'><UserCount/></span>
            <Link to={'Fees'}><span className='Linkuser'>See all Fees</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
     <div className='Widget'>
        <div className="left">
            <span className='title'>Exams</span>
            <span className='Counter'><ExamCount/></span>
            <Link to={'users'}><span className='Linkuser'>See all Exams</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
     <div className='Widget'>
        <div className="left">
            <span className='title'>Salaries</span>
            <span className='Counter'><UserCount/></span>
            <Link to={'users'}><span className='Linkuser'>See all Salaries</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
     <div className='Widget'>
        <div className="left">
            <span className='title'>Users</span>
            <span className='Counter'><UserCount/></span>
            <Link to={'users'}><span className='Linkuser'>See all users</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div> 
      <div className='Widget'>
        <div className="left">
            <span className='title'>Cources</span>
            <span className='Counter'><CourceCount/></span>
            <Link to={'cources'}><span className='Linkuser'>See all Cources</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div>
    <div className='Widget'>
        <div className="left">
            <span className='title'>Teachers</span>
            <span className='Counter'><TeacerCount/></span>
            <Link to={'teachers'}><span className='Linkuser'>See all teachers</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div>   <div className='Widget'>
        <div className="left">
            <span className='title'>categories</span>
            <span className='Counter'><CategoryCount/></span>
            <Link to={'categories'}><span className='Linkuser'>See all categories</span></Link>
        </div>
        <div className="right">
            <div className="percentage">
                <KeyboardArrowUpIcon/>
                20%
            </div>
      <Person2Outlined className='iconuser'/>
        </div>
    </div>
 </div>
  )
}

export default Widget