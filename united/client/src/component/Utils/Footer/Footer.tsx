import { Facebook, Instagram } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            {/* <img src="/logo.png" alt="SeAsom College" className="w-12 h-12 mb-4" /> */}
            <h1 className='' style={{fontSize:'20px',color:'blue',fontWeight:'bolder'}}>SeAsom College</h1>
            <p className="text-gray-300">
              SeAsom College is committed to providing quality education and empowering students for success in their careers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              {/* <li>
                <Link to="/about" className="text-gray-300 hover:text-white">About</Link>
              </li> */}
              <li>
                <Link to="/cources" className="text-gray-300 hover:text-white">Cources</Link>
              </li>
              {/* <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
              </li> */}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li>
                <i className="fas fa-map-marker-alt text-gray-300 mr-2"></i>
                High way canter, Hargeisa, Somaliland
              </li>
              <li>
                <i className="fas fa-envelope text-gray-300 mr-2"></i>
                info@seasomcollege.com
              </li>
              <li>
                <i className="fas fa-phone-alt text-gray-300 mr-2"></i>
                +252637484493
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"><Facebook/></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter">< Instagram/></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} SeAsom College. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;