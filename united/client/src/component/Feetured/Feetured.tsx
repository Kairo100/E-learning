import React from 'react'
import './Feetured.css'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import UserCount from '../../Pages/Dashboard/Users/Count'
import CategoryCount from '../../Pages/Dashboard/Catogory/Count'
import { Link } from 'react-router-dom'
import CourceCount from '../../Pages/Dashboard/Cource/Count'
import TeacerCount from '../../Pages/Dashboard/Teacher/Count'
import CountFee from '../../Pages/Dashboard/Fees/Count'
const Feetured = () => {
  return (
    <div className='Featured'>
<div className="FeaturedItem">
  <span className="FeaturedTitle" style={{color:'rebeccapurple'}}>
Categories
  </span>
  <div className="FeaturedMoneycontiner">
    <span className="Featuredmoney"><CategoryCount/></span>
    <span className="FeaturedmoneyRate"></span>
  
  </div>
  <Link to={'categories'}><span className="Featuredsub">View all the Categories</span></Link>
</div>
<div className="FeaturedItem">
  <span className="FeaturedTitle" style={{color:'rebeccapurple'}}>
payamentfees
  </span>
  <div className="FeaturedMoneycontiner">
    <span className="Featuredmoney"><CountFee/></span>
    <span className="FeaturedmoneyRate"></span>
  
  </div>
  <Link to={'fees'}><span className="Featuredsub">View all the PaymentFee</span></Link>
</div>
<div className="FeaturedItem">
  <span className="FeaturedTitle" style={{color:'greenyellow'}}>
Cources
  </span>
  <div className="FeaturedMoneycontiner">
    <span className="Featuredmoney"><CourceCount/></span>
    <span className="FeaturedmoneyRate">-4.1 <ArrowDownward className='Featuredicon'/></span>
  </div>
  <Link to={'cources'}><span className="Featuredsub">View all the cources</span></Link>
</div>
<div className="FeaturedItem">
  <span className="FeaturedTitle">
Teachers
  </span>
  <div className="FeaturedMoneycontiner">
    <span className="Featuredmoney"><TeacerCount/></span>
    <span className="FeaturedmoneyRate">-34.1 <ArrowUpward className='Featuredicon'/></span>
  </div>
 <Link to={'teachers'}> <span className="Featuredsub">View all teachers</span></Link>
</div>
    </div>
  )
}

export default Feetured