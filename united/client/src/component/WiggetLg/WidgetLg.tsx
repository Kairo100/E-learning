import React, { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import './WidgetLg.css';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluserFn } from '../../redux/Slices/Dashboard/User/GetAllUsers';
import { Link } from 'react-router-dom';
const WidgetLg = () => {

  const dispatch =useDispatch<AppDispatch>()
  const getallUsers =useSelector((state:RootState)=>state.getAllusers)
  useEffect(()=>{
      dispatch(getAlluserFn())
  },[])
  return (
    <div className='WidgetLg'>
      <h1 className="widgetLgTitle">User Members</h1>
      <table className="widgetLgtable">
        <tr className="widgetLgr">
     {getallUsers.data.map((items)=>(
      <tr>{!items.isAdmin ? <span className='usersforwidgetList'><h1>{items.givenName}</h1> <Link className='BTNICONWLG' to={'users'}>
        {/* <button>
          <VisibilityIcon className='iconvisibaleuser'/>Display</button> */}
          </Link> </span>:null}</tr>
     ))}
        </tr>
        
      </table>
    </div>
  )
}

export default WidgetLg