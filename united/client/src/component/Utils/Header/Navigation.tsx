import React from 'react'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Navigation = () => {
    const [ismenuOpnen,setismenuOpnen]=useState(false)
    const [isSticky,setisSticky]=useState(false)
    const toglemenu=()=>{
        setismenuOpnen(!ismenuOpnen)
    }
    useEffect(()=>{
    const handlescroll=()=>{
        if(window.scrollY >100){
            setisSticky(true)
        }
        else{
            setisSticky(false)
        }
    }
    window.addEventListener('scroll',handlescroll)
    return()=>{
        window.addEventListener('scroll',handlescroll)
    }
    },[])
    const navitems=[
        {link:'Home',path:'Home'},
        {link:'Home',path:'Home'},
        {link:'Home',path:'Home'},
    ]
  return (
<header className={`${isSticky ? ' w-full bg-white md:bg-trasparent fixed top-0 left-0 right-0':'bg-red-500'}`}>
<nav>
    <div className='flex items-center'>
        <Link  to={'/'}> <img className='w-10 inline-block items-center'  src="../assets/logo.png" alt="" /></Link>
        <ul className='md:flex space-x-12 hidden'>
          {navitems.map((link,path)=><Link spy={true}  to={path}>{link.link}</Link>)}
        </ul>
    </div>
</nav>
</header>
  )
}

export default Navigation