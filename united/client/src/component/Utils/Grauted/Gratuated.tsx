import React from 'react';
import image from './G.jpg'
import image1 from './e.jpg'
import image2 from './r.jpg'
import image3 from './t.jpg'
import image4 from './w.jpg'
const Gratuated = () => {
  return (
    <div className="bg-gray-100 py-12 mt-5">
      <div className="container ">
        <h1 className="text-4xl font-bold text-center mb-12"><span style={{ color:'#c20dff'}} className='grtued text-4xl font-bold ' >Graduated</span> <span style={{color:'lightslategray'}} className='grtued text-4xl font-bold ' >Students</span></h1>
        <div className="grid gap-[70px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div style={{height:'17rem'}} className="gratuteddev  transform transition duration-300 hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
             style={{height:"17rem",marginLeft:'-1px',width:'20rem',textAlign:'center'}}
            src={image}
               alt=""
              className=" cursor-pointer "
            />
          </div>
          <div style={{height:'17rem'}} className="gratuteddev transform transition duration-300 hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
             style={{height:"17rem",marginLeft:'-1px',width:'20rem',textAlign:'center'}}
            src={image}
               alt=""
              className="  cursor-pointer "
            />
          </div>
          <div style={{height:'17rem'}} className="gratuteddev transform transition duration-300 hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
             style={{height:"17rem",marginLeft:'-1px',width:'20rem',textAlign:'center'}}
            src={image1}
              alt=""
              className="  cursor-pointer "
            />
          </div>
          <div style={{height:'17rem'}} className="gratuteddev transform transition duration-300 hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
             style={{height:"17rem",marginLeft:'-1px',width:'20rem',textAlign:'center'}}
            src={image2}
              alt="" 
              className="  cursor-pointer "
            />
          </div>
          <div style={{height:'17rem'}} className="gratuteddev transform transition duration-300 hover:scale-105 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
            <img
             style={{height:"17rem",marginLeft:'-1px',width:'20rem',textAlign:'center'}}
            src={image3}
              alt=""
              className="  cursor-pointer "
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gratuated;