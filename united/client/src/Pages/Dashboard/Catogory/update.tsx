import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { CancelRounded, Edit } from '@mui/icons-material'
const Updatecategory = () => {
    const {catId}=useParams()
    const [catName, setCatName] = useState('');
    const [catDescription, setcatDescription] = useState('');
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get('http://localhost:2000/api/category/get/one/'+catId)
  .then(res=>{
    setCatName(res.data.catName)
   setcatDescription(res.data.catDescription)

   console.log(res.data)
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put('http://localhost:2000/api/category/edit/'+catId,{catName,catDescription})
      navigate('/dashboard/categories')
    }
  return (
    <div className='updatecontiner my-8 w-full shadow-[0_3px_30px_rgb(0,0,0,0.2)]'>
        <form className='' onSubmit={handlesubmit}>

             <div className="">
             <label htmlFor="">Name</label> <br />
            <input type="text"  value={catName} onChange={(e)=>setCatName(e.target.value)}/> <br />
        
              <label htmlFor="">Description</label> <br />
             <input type="text" value={catDescription} onChange={(e)=>setcatDescription(e.target.value)}/> <br/>
         
             </div>
       
            
          <div style={{justifyContent:'flex-end'}} className="flex gap-4 justify-right">
          <button className='text-red-400'><Edit/></button>
            <button className='text-blue-400 hover-bg-none' ><Link to={'/dashboard/categories'}><CancelRounded style={{fontSize:"30px"}}/></Link></button>
          </div>
        </form>
        
    </div>
  )
}

export default Updatecategory