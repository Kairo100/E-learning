import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Oflineenrollment.css';

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
import CreateOflineenrollment from '../../../../Pages/Dashboard/Oflineenrollment/CreaeOflineenrollment';
import { getAllOflineEnrollmentFn } from '../../../../redux/Slices/Dashboard/OflineEnrollment.ts/Getalloflineenrolment';
import { Delete, Edit, Restore } from '@mui/icons-material';
import { FaBackward } from 'react-icons/fa';

const RecycleOflineenrollment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setshow] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deletedItemId, setDeletedItemId] = useState('');

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
  const getalloflinenrolments = useSelector(
    (state: RootState) => state.getalloflineEnrollment
  );

  useEffect(() => {
    dispatch(getAllOflineEnrollmentFn())
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const keys = [
    'id',
    'studentId',
    'OflinecourceId',
    'StudentName',
    'Created At',
    'Updated At',
    'Actions',
  ];

  const handleDelete = () => {
    // Perform deletion logic here
    axios
      .delete('http://localhost:5000/api/ofllinenrollment/delete/' + deletedItemId)
      .then((res) => {
        location.reload();
        setDeleteConfirmation(false);
      });
  };

  const handleDeleteConfirmation = (id: any) => {
    setDeletedItemId(id);
    setDeleteConfirmation(true);
  };

  const handleRestore = (id: any) => {
    axios
      .put('http://localhost:5000/api/ofllinenrollment/restore/' + id)
     location.reload()
  };

  return (
    <div className='oflineenrollmentcontiner shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg   '>
      <div className='flex sm:flex-row items-center justify-between mb-4'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={handleSearch}
          className='mb-4 sm:mb-0 sm:w-60 p-2 border border-gray-300 rounded-lg'
        />
        <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'>
          <Link to={'/dashboard/OFlineenrollment'}><FaBackward/> </Link>
        </button>
      </div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((keyItem, idx) => (
                <TableCell key={idx}>{keyItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {getalloflinenrolments.data.map((mapoflineEnrollment) => (
              mapoflineEnrollment.isDeleted && (
                <TableRow className='border' key={mapoflineEnrollment.id}>
                  <TableCell className='py-4 px-3'>{mapoflineEnrollment.id}</TableCell>
                  <TableCell className='py-4 px-3'>{mapoflineEnrollment.studentId}</TableCell>
                  <TableCell className='py-4 px-3'>{mapoflineEnrollment.OflinecourceId}</TableCell>
                  <TableCell className='py-4 px-3'>{mapoflineEnrollment.StudentName}</TableCell>
                  <TableCell className='py-4 px-3'>
                    {dayjs(mapoflineEnrollment.createdAt).format('DD/MM /YYY')}
                  </TableCell>
                  <TableCell className='py-4 px-3'>
                    {dayjs(mapoflineEnrollment.UpadatedAt).format('DD/MM /YYYY')}
                  </TableCell>
                  <TableCell className='block'>
                    <button
                      className='text-red-500'
                      onClick={() => handleDeleteConfirmation(mapoflineEnrollment.id)}
                    >
                      <Delete />
                    </button>
                    <button
                      className='text-blue-500'
                      onClick={() => handleRestore(mapoflineEnrollment.id)}
                    >
                      <Restore />
                    </button>
                  </TableCell>
                </TableRow>
              )
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteConfirmation} onClose={() => setDeleteConfirmation(false)}>
        <div className='p-8'>
          <h2 className='text-2xl mb-4'>Confirm Delete</h2>
          <p className='mb-4'>Are you sure you want to delete this item?</p>
          <div className='flex justify-end'>
            <button
              className='bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg mr-4'
              onClick={handleDelete}
            >
              Confirm
            </button>
            <button
              className='bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-lg'
              onClick={() => setDeleteConfirmation(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default RecycleOflineenrollment;