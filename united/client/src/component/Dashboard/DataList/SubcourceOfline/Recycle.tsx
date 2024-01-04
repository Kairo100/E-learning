import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './subcourcecontiner.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

import CreatesubcourceOfline from '../../../../Pages/Dashboard/SubocurceOfline/Createcource';
import { getAllOflineSubCourceFn } from '../../../../redux/Slices/Dashboard/SubcourceOfline/getall';
import { Delete, Edit, Restore } from '@mui/icons-material';
import { FaBackward } from 'react-icons/fa';

const Recyclesubcource = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setshow] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

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
  const getallUsers = useSelector((state: RootState) => state.getallsubcource);
  useEffect(() => {
    dispatch(getAllOflineSubCourceFn());
  }, []);

  const keys = [
    'id',
    'SubCource Name',
    'Description',
    'subcourceId',
    'Created At',
    'Updated At',
    'Actions',
  ];

  const handledelete = (id: any) => {
    setSelectedItem(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:5000/api/subcource/delete/${selectedItem}`);
    setOpenDialog(false);
    location.reload()
  };

  const handleCancelDelete = () => {
    setSelectedItem(null);
    setOpenDialog(false);
  };

  const filteredUsers = getallUsers.data.filter((user: any) =>
    user.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );
const handlestore = (id: any) => {
    axios.put(`http://localhost:5000/api/subcource/restore/${id}`)
    location.reload()
  };

  return (
    <div className='subcourcecontiner m-2 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
      <div className='flex items-center justify-between'>
        
        <input
          type='text'
          className=''
          placeholder='Search by name'
          value={searchTerm}
          onChange={handleSearch}
        />
        <Link style={{color:'blue',fontSize:'36px'}} to={`/dashboard/Subcource`}><FaBackward/></Link>
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
            {filteredUsers.map((mapsubcource) => (
              mapsubcource.isDeleted ? (
                <TableRow className='border' key={mapsubcource.subcourceId}>
                  <TableCell className='py-4 px-3'>{mapsubcource.subcourceId}</TableCell>
                  <TableCell className='py-4 px-3'>{mapsubcource.Title}</TableCell>
                  <TableCell className='py-4 px-3'>{mapsubcource.Description}</TableCell>
                  <TableCell className='py-4 px-3'>{mapsubcource.subcourceId}</TableCell>

                  <TableCell className='py-4 px-3'>
                    {dayjs(mapsubcource.CreatedAt).format('DD/MM /YYYY')}
                  </TableCell>
                  <TableCell className='py-4 px-3'>
                    {dayjs(mapsubcource.UpdatedAt).format('DD/MM /YYYY')}
                  </TableCell>
                  <TableCell className=''>
                    <button onClick={() => handlestore(mapsubcource.subcourceId)} className=''>
                      <Restore />
                    </button>
                    <button className='delete-button' onClick={() => handledelete(mapsubcource.subcourceId)}>
                      <Delete />
                    </button>
                  </TableCell>
                </TableRow>
              ) : null
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={openDialog} onClose={handleCancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this item?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Recyclesubcource;