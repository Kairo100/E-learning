import React from 'react'
import './Dash.css'
import { Link } from 'react-router-dom'
const Dash = () => {
  return (
    <div className='dashcontinerparent'>
       <div style={{display:'flex',alignItems:'center'}}>
      <div style={{
        display:'block',
        alignItems:'center',
        textAlign:'center',
        justifyContent:'center',
        marginLeft:"36rem",
        gap:'50px'
      }}>
      <Link to={'/'}><img src="/public/assets/logo.png" alt="" style={{width:'90px',height:'90px',marginLeft:'20px'}} /></Link>
       <h1 style={{
        color:'green',
        fontWeight:'bolder',
        fontSize:'25px',
        // wordSpacing
        marginLeft:'-50px',
        letterSpacing:'5px'
       }}>United College</h1>
      </div>
       </div>
            </div>
  )
}

export default Dash