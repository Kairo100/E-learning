import React, { useEffect, useState } from 'react';
import contactImage from './conatact.svg';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../../../redux/store';
import { useNavigate } from 'react-router-dom';
import { ResetcontactState, contactFn } from '../../../redux/Slices/contactSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import axios from 'axios';

const ContactLst = () => {
  const toastId: string = 'contactingtoast';
  const [Name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const ContactsState = useSelector((state: RootState) => state.contact);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      email,
      Name,
      message
    }
   

    if (!Name || !email || !message) {
      return toast.error('Please fill in all the required information', { id: toastId });
    }

    dispatch(contactFn(data));
    toast.loading('Sending', { id: toastId });
  }

  useEffect(() => {
    if (ContactsState.isSuccess) {
      toast.success('Sent Successfully', { id: toastId });
      navigate('/');
    }
    if (ContactsState.isError)
      toast.error(ContactsState.errorMsg, { id: toastId });
    dispatch(ResetcontactState());
  }, [ContactsState.isSuccess, ContactsState.isError]);

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      navigate('/');
    }
  }, []);

  return (
    <div className="max-w-full bg-gainsboro-300 mx-auto rounded-md p-6">
     
      <div className="flex flex-wrap items-center">
        <div className=" w-[800px] md:w-1/2 mb-4 md:mb-0">
        {/* <h2 className="text-2xl font-bold mb-4">Tell us evrything</h2> */}
          <img src={contactImage} alt="Contact" className="w-[700px]  h-[30rem] rounded-md" />
        </div>
        <div className="w-full md:w-1/2 md:pl-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
         
              <input
                type="text"
                id="name"
                name="name"
                style={{border:'2px solid blueviolet',background:'white'}}
                value={Name}
                onChange={(e)=>setName(e.target.value)}
                className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="what is your full Name "
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                id="text"
                name="email"
                style={{border:'2px solid blueviolet',background:'white'}}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                className="w-full border border-black-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="what is your your Email "
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                id="message"
                name="message"
                style={{border:'2px solid blueviolet',background:'white'}}
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black-500"
                placeholder="what is your Message"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactLst;