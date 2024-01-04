import './Widgetsm.css';
import React, { useEffect } from 'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { AppDispatch, RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getAlluserFn } from '../../redux/Slices/Dashboard/User/GetAllUsers';
import { Link } from 'react-router-dom';
const WidgetSm = () => {
   const dispatch =useDispatch<AppDispatch>()
   const getallUsers =useSelector((state:RootState)=>state.getAllusers)
   useEffect(()=>{
       dispatch(getAlluserFn())
   },[])
  return (
    <div className='WidgetSm'>
      <h1 className="widgetSmTitle">Admin Members</h1>
        
<div className="contineradmins">
    
{getallUsers.data.map((items)=>(
<table>
<tr className='adminandbtn'>
          {items.isAdmin ? <span className='spannandbtn'><h1>{items.givenName}</h1>   <Link className='BTNICONWLG' to={'users'}><button >
         {/* <VisibilityIcon /> */}
         {/* Display */}
         </button> 
         </Link>
         </span>:null
         }
      </tr>
</table>
))}
</div>
     

  

    </div>
  )
}

export default WidgetSm