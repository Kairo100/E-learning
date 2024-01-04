
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UserList.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Delete, Edit, Recycling } from '@mui/icons-material';
import { Dialog } from '@mui/material';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
 const [opendailog,setopenDailog]=useState(false)
 const [deleteid,setdeleteid]=useState(null)
 const navigate =useNavigate()
 const handleopenandclosedailog=(itemid:any)=>{
  setopenDailog(!opendailog)
  setdeleteid(itemid)

 }
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const dispatch = useDispatch<AppDispatch>();
  const getallUsers = useSelector((state: RootState) => state.getAllusers);
  useEffect(() => {
    dispatch(getAlluserFn());
  }, []);

  const keys = [
    'id',
    'Name',
    'username',
    'email',
    'Role',
    'Created At',
    'Actions',
  ];

  const handledelete = (id: any) => {
    axios.put('http://localhost:2000/api/user/trash/' + id);
      dispatch(getAlluserFn())
      navigate('/dashboard/users/recycle')
      setopenDailog(false)

      setdeleteid(null)
  };

  const filteredUsers = getallUsers.data.filter((user) =>
    user.givenName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='usercontiner mt-16 p-4 rounded-lg mx-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
    <div className="flex justify-between">
    <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={handleSearch}
      />
     <Link to={'recycle'}><Recycling style={{ color: '', fontSize: '40px' }} /></Link>
    </div>
      <TableContainer>
        <Table className='border rounded'>
          <TableHead>
            <TableRow>
              {keys.map((keyItem, idx) => (
                <TableCell className='border ' key={idx}>{keyItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((mapuser) => (
            !mapuser.IsDeleted &&  <TableRow className='border' key={mapuser.id}>
            <TableCell className='py-4 px-3 border'>{mapuser.id}</TableCell>
            <TableCell className='py-4 px-3 border'>{mapuser.givenName}</TableCell>
            <TableCell className='py-4 px-3 border'>{mapuser.username}</TableCell>
            <TableCell className='py-4 px-3 border'>{mapuser.email}</TableCell>
            {/* <TableCell  className='py-4 px-3 border'>{mapuser.password}</TableCell> */}
            <TableCell>
              {mapuser.isAdmin ? <p>Admin</p> : <p>User</p>}
            </TableCell>
            <TableCell className='py-4 px-3 border'>
              {dayjs(mapuser.createdAt).format('DD/MM /YYYY')}
            </TableCell>
            <TableCell className='actionsofusers'>
              <button className=''>
                <Link to={`update/${mapuser.id}`}><Edit/></Link>
              </button>
              <button
                className=''
                onClick={() => handleopenandclosedailog(mapuser.id)}
              >
                <Delete/>
              </button>
            </TableCell>
          </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={opendailog} onClose={handleopenandclosedailog}>
        <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this user?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleopenandclosedailog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handledelete(deleteid)}
      >
        Confirm
      </button>
    </div>
  </div>
        </Dialog>
    </div>
  );
};

export default UserList;