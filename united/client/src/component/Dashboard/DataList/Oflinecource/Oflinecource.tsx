
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
import Createoflincource, { CreateCourceOflinefn } from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog } from '@mui/material';
import Createcource from '../../../../Pages/Dashboard/Oflinecource/Createcource';
import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
import { Close, Delete, Edit, Recycling } from '@mui/icons-material';
// import { GetallOflincourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';

const Oflinecource = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  // const dispatch = useDispatch<AppDispatch>();
  const createcourceofline = useSelector((state: RootState) => state.Createcourceofline);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [OflineCategoryId, setOflineCategoryId] = useState('');
  const [shift, setShift] = useState('');
  const navigate=useNavigate()
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      Description: description,
      Name: name,
      teacherId: teacherId,
      OflineCategoryId: OflineCategoryId,
      shift: shift,
    };
    dispatch(CreateCourceOflinefn(data));
  };
  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const [searchTerm, setSearchTerm] = useState('');
const[show,setshow]=useState(false)
const handleopen=()=>{
  setshow(true)
}
const handleclose=()=>{
  setshow(false)
}
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();
  const getallUsers = useSelector((state: RootState) => state.getalloflinecources);
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

  const handledelete = (id: any) => {
  dispatch(DeleteOflineFn(id))
  dispatch(getAllOflineCourceFn())
  handleCloseDeleteDialog()
  navigate('/dashboard/oflinecources')

  };

  const filteredUsers = getallUsers.data.filter((user:any) =>
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
      {/* <button className='' onClick={handleopen}>Add</button> */}
      <div className="flex">
          <Link to={'recycle'}><Recycling style={{ color: 'blue', fontSize: '40px' }} /></Link>
          <button className="add" onClick={handleopen}>
          {/* <Link to={'new'}>Add</Link> */}
          Add
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
        !mapoflinecource.isDeleted &&    <tr className='border border-gray-500' key={mapoflinecource.Name}>
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
          <button className='mr-2 text-blue-500' title='Edit'>
            <Link to={`update/${mapoflinecource.id}`}>
              <Edit />
            </Link>
          </button>
          <button
            className='text-red-500'
            onClick={() => handleOpenDeleteDialog(mapoflinecource.id)}
            title='Delete'
          >
            <Delete />
          </button>
        </td>
      </tr>
        ))}
      </tbody>
    </table>

    <Dialog open={show} onClose={handleclose}>
      {/* Dialog content */}
    </Dialog>
  </div>

     <Dialog open={show} onClose={handleclose}>

    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[300px] max-w-md p-6 bg-white rounded shadow">
      <div className=" flex justify-between">
      <p>Register Oflinecource</p>
      <p style={{cursor:'pointer',fontSize:'1px'}}  className='text-gray-300' onClick={handleclose}><Close/></p>
    </div>
        <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={name}
              placeholder="Enter course name"
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description"
              value={description}
              placeholder="Enter course description"
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="teacherId"
              value={teacherId}
              placeholder="Enter teacher ID"
              onChange={(e) => setTeacherId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="OflineCategoryId"
              value={OflineCategoryId}
              placeholder="Enter category ID"
              onChange={(e) => setOflineCategoryId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="shift"
              value={shift}
              placeholder="Enter shift"
              onChange={(e) => setShift(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            Save
          </button>
        </form>
      </div>
    </div>
     </Dialog>
     <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleCloseDeleteDialog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handledelete(deleteItemId)}
      >
        Confirm
      </button>
    </div>
  </div>
</Dialog>
    </div>
  );
};

export default Oflinecource;