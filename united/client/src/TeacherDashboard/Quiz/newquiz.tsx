import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const Newquiz = () => {
    const[title,settitle]=useState('')
    const[description,setdescription]=useState('')
    // const[courseId,setcourseId]=useState<number>(Number)
     const {courseId}=useParams()
     useEffect(()=>{
     const fetchcource=async()=>{
        const res=await axios.get(`http://localhost:5000/api/cource/get/one/${courseId}`)
        console.log(res.data)
     }
     fetchcource()
     },[])

  return (
    <div>Newquiz</div>
  )
}

export default Newquiz