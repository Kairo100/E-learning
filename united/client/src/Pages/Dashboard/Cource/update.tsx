import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import './update.css'
import { Cancel, Edit } from '@mui/icons-material'
const UpdateCource = () => {
    const {id}=useParams()
    const [CategoryId, setCategoryId] = useState<number>();
    const [title, setName] = useState('');
    const [Shortdescription, setShortdescription] = useState('');
    const [price, setprice] = useState('');
    const [image, setimage] = useState('');
    const [courceId, setcourceId] = useState<number>();
   
const navigate =useNavigate()
  
    useEffect(()=>{
  axios.get('http://localhost:2000/api/cource/get/one/'+id)
  .then(res=>{
    setCategoryId(res.data.CategoryId)
    setcourceId(res.data.courceId)
    setimage(res.data.image)
    setprice(res.data.price)
    setName(res.data.title)
    setShortdescription(res.data.Shortdescription)
  console.log(res.data)
  // alert("successeded")
  })
  .catch(err=>console.log(err))
    },[])
    const handlesubmit =(e:React.FormEvent)=>{
      e.preventDefault();
      axios.put('http://localhost:2000/api/cor/update/'+id,{Shortdescription,price,title,CategoryId,courceId})
   
       navigate('/dashboard/Cources')
     
    }
  return (
    <div className='courceContiner rounded-lg w-full mt-8 shadow-[0_3px_30px_rgb(0,0,0,0.2)] m-4 p-2'>
        <form  onSubmit={handlesubmit} >

            <label htmlFor="">CategoryId:</label> <br />
            <input type="number" value={CategoryId} onChange={(e)=>setCategoryId(Number(e.target.value))}/> <br />
            <label htmlFor="">Name:</label> <br />
            <input type="text" value={title} onChange={(e)=>setName(e.target.value)}/> <br />
            <label htmlFor="">Short Description:</label> <br />
            <input type="text"  value={Shortdescription} onChange={(e)=>setShortdescription(e.target.value)}/> <br />
            <label htmlFor="">courceId:</label> <br />
            <input type="text"  value={courceId} onChange={(e)=>setShortdescription(e.target.value)}/> <br />
            <label htmlFor="">price:</label> <br />
            <input type="text"  value={price} onChange={(e)=>setShortdescription(e.target.value)}/> <br />
            <label htmlFor="">Image Preview:</label> <br />
            <input type="file" value={image} accept='image/*' /> <br />
            <label htmlFor="">Video Preview:</label> <br />
            <input type="file" accept='video/*' /> <br />
            <div className="mt-2 mb-2 text-right">
              <button className=''><Edit/></button>
              <Link className='' to={'/dashboard/cources'}><button><Cancel/></button></Link>
            </div>
        </form>
    </div>
  )
}

export default UpdateCource