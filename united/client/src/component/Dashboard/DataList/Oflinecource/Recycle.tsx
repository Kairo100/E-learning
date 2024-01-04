import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Ofliencource.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAllOflineCourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import Createoflincource from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog } from '@mui/material';
import Createcource from '../../../../Pages/Dashboard/Oflinecource/Createcource';
import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
import { Close, Delete, Edit, Recycling, Restore } from '@mui/icons-material';
import { FaBackward } from 'react-icons/fa';

const Recycleoflinecource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setshow] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState('');

  const handleopen = () => {
    setshow(true);
  };

  const handleclose = () => {
    setshow(false);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();
  const getallUsers = useSelector((state: RootState) => state.getalloflinecources);
  const navigate=useNavigate()
  
  useEffect(() => {
    dispatch(getAllOflineCourceFn());
  }, []);

  const keys = [
    'id',
    'Cource Name',
    'Description',
    'teacherId',
    'shift',
    'OflineCategoryId',
    'Created At',
    'Updated At',
    'Actions',
  ];

  const handleDeleteConfirmation = (id: any) => {
    setDeleteItemId(id);
    setDeleteConfirmation(true);
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/oflinecource/delete/${deleteItemId}`).then(() => {
      // Handle successful deletion
      // Reload the data or update the state
      dispatch(getAllOflineCourceFn());
    }).catch((error) => {
      // Handle error
      console.log(error);
    });

    setDeleteConfirmation(false);
  };

  const handleStore = (id: any) => {
    axios.put(`http://localhost:5000/api/oflinecource/retore/${id}`).then(() => {
      // Handle successful restoration
      // Reload the data or update the state
      navigate('/dashboard/oflinecources/recycle')
      dispatch(getAllOflineCourceFn());
  })
  };

  const filteredUsers = getallUsers.data.filter((user: any) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='Oflinecource shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg w-full overflow-x-auto'>
      <div className='flex justify-between'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={handleSearch}
        />
        <div className="flex">
          <button className="">
            <Link to={'/dashboard/oflinecources'} style={{marginRight:'40px',color:'blue',fontSize:'25px'}}><FaBackward/></Link>
          </button>
        </div>
      </div>

      <div className='Oflinecource '>
        <div className='flex flex-col sm:flex-row items-center justify-between mb-4'>
          {/* Search input code */}
        </div>

        <table>
          <thead>
            <tr className='border border-gray-500'>
              {keys.map((keyItem, idx) => (
                <th className='border border-gray-500 px-4 py-2' key={idx}>
                  {keyItem}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((mapoflinecource) => (
              mapoflinecource.isDeleted && (
                <tr className='border border-gray-500' key={mapoflinecource.Name}>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.id}</td>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.Name}</td>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.Description}</td>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.teacherId}</td>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.shift}</td>
                  <td className='border border-gray-500 px-4 py-2'>{mapoflinecource.OflineCategoryId}</td>
                  <td className='border border-gray-500 px-4 py-2'>
                    {dayjs(mapoflinecource.createdAt).format('DD/MM /YYYY')}
                  </td>
                  <td className='border border-gray-500 px-4 py-2'>
                    {dayjs(mapoflinecource.UpadatedAt).format('DD/MM /YYYY')}
                  </td>
                  <td className='border border-gray-500 px-4 py-2'>
                    <button
                      className='text-red-500'
                      onClick={() => handleDeleteConfirmation(mapoflinecource.id)}
                      title='Delete'
                    >
                      <Delete />
                    </button>
                    <button
                      className='text-blue-500'
                      onClick={() => handleStore(mapoflinecource.id)}
                      title='Restore'
                    >
                      <Restore />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>

        <Dialog open={show} onClose={handleclose}>
          {/* Dialog content */}
        </Dialog>
      </div>

      <Dialog open={show} onClose={handleclose}>
        <div className="m-5 flex justify-between">
          <p>Register Oflinecource</p>
          <p style={{ cursor: 'pointer' }} onClick={handleclose}><Close /></p>
        </div>
        <Createcource />
      </Dialog>

      <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div className="m-5">
          <p>Are you sure you want to delete this item?</p>
          <span className='flex'><h1 className='text-blue-500'>Note:</h1><p>if you delete you will not restore!</p></span>
          <div className="flex justify-end mt-4">
            <button className="mr-2 p-1 rounded-md text-white bg-blue-600" onClick={() => setDeleteConfirmation(false)}>Cancel</button>
            <button className="text-red-500 bg-red-200 p-1 m-1 rounded-md" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Recycleoflinecource;