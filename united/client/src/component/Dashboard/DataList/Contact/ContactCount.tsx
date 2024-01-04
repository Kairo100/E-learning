import axios from 'axios'
import React, { useEffect, useState } from 'react'

const ContactCount = () => {
    const[contactlenght,setcontactlength]=useState()
    useEffect(()=>{
const fetchcountcontact=async()=>{
    const response=await axios.get('http://localhost:5000/api/contact/get/all');
    // console.log(response.data.result)
    setcontactlength(response.data.result.length)
}
fetchcountcontact()
    },[])
  return (
    <div>
        {contactlenght}

    </div>
  )
}

export default ContactCount