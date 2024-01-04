import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
interface cource{
  CategoryId: number;
  content: string;
  imageUrl: string;
  videoUrl: string;
  courceId: number;
}
interface userInfo{
  id:Number
}
const getallcourcesteacher = () => {
  const[cources,setcources]=useState<cource[]>([])
  useEffect(()=>{
  const fetchCourses=async()=>{
    const userStored=localStorage.getItem('id')
    if(userStored){
      const response=await axios.get(`http://localhost:5000/api/user/get/teachercource/${userStored}`)
      setcources(response.data)
    }
 else{
  const userInfoString=localStorage.getItem('userInfo')
  if(userInfoString){
    const userInfo:userInfo=JSON.parse(userInfoString)
    const response=await axios.get(`http://localhost:5000/api/user/get/teachercource/${userInfo.id}`)
    setcources(response.data)
  }
 }
  }
  fetchCourses()
  },[])
  return (
    <div>
      {cources.map((cource)=>(
        <tr key={cource.courceId}>
          <td>{cource.content}</td>
        </tr>
      ))}
    </div>
  )
}

export default getallcourcesteacher