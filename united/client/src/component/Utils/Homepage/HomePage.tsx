import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './HomePage.css';
import { Link } from 'react-router-dom';
import undraw from './Were.png';
import image from './Were.png';
import LatestCourses from '../../Dashboard/DataList/Cource/LatestCource';
import Courcesandcategory from '../../Dashboard/DataList/Cource/CourceCategory';
import CourceList from '../../Dashboard/DataList/Cource/clickcategory';
import Top from '../Top/Top';

const HomePage = () => {
  const swiperParams = {
    // slidesPerView: 1,
    // spaceBetween: 10,
    // navigation: {
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // },
    autoplay: {
    
      delay: 30, // Delay between slides in milliseconds
      disableOnInteraction: true, // Allow autoplay to continue even when user interacts with the swiper
    },
  };

  return (
    <div className="bg-white">
      <div className="mt-[90px]">
        <Swiper {...swiperParams}>
          <SwiperSlide>
            <div className={`Mainsection rounded-xl ml-8`}>
              <div className="content h-[300px]">
              <h1>Get Quality Education From Anywhere</h1> <p> Top-notch instructors and comprehensive courses available at your convenience. <br /> Gain knowledge and skills in various subjects. Best educators &<br /> comprehensive courses all at your service. </p>
                <button className="p-3 rounded-xl bg-blue-700 text-white shadow-[0_3px_30px_rgb(0,0,0,0.2)] m-2">
                  <Link to={'/Cources'}>View courses</Link>
                </button>
              </div>
              <div
                // style={{ maxWidth: '400px', maxHeight: '500px'}}
                className="imgcontiner bg-white m-8 bg-blue-300"
              >
                <img src={undraw} alt="" className='w-full' style={{ minHeight: '400px' }} />
              </div>
            </div>
          </SwiperSlide>
{/* 
          <SwiperSlide>
            <div className={`Mainsection rounded-xl`}>
              <div className="content" style={{ maxHeight: '300px' }}>
                <h1>Learn quality Education From AnyTime</h1>
                <p>
                  Best Education and best quality guys all at your service.
                  <br />
                  Hot tasty food will reach you in 20 minutes. Best cooks&<br />
                  best delivery guys all at your service.
                </p>
                <button className="p-3 rounded-xl bg-blue-700 text-white shadow-[0_3px_30px_rgb(0,0,0,0.2)] m-2">
                  <Link to="/cources">View courses</Link>
                </button>
              </div>
              <div className="imgcontiner m-8">
                <img src={image} alt="" style={{ minHeight: '200px', maxHeight: '400px' }} />
              </div>
            </div>
          </SwiperSlide> */}
        </Swiper>
        <div className="bg-gray-100 p-1">
        <LatestCourses />
        <div className="mt-32">
          <CourceList/>
        </div>
        <div className="py-8">
          <Courcesandcategory />
        </div>
        </div>
        <Top />
      </div>
    </div>
  );
};

export default HomePage;