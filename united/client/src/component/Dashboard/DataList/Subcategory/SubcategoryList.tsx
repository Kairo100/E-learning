
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './Ofliencource.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {getAllOflineCourceFn} from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import Createoflincource from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog } from '@mui/material';
import Createcource from '../../../../Pages/Dashboard/Oflinecource/Createcource';
import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
// import { GetallOflincourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';

const Subcategories = () => {

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
  const getallUsers = useSelector((state: RootState) => state.getallsubcategory);
  useEffect(() => {
    dispatch(getAllOflineCourceFn());
  }, []);

  const keys = [
    'id',
    'Cource Name',
    'Description',
    'Created At',
    'Actions',
  ];

  const handledelete = (id: any) => {
  dispatch(DeleteOflineFn(id))

  };

  const filteredUsers = getallUsers.data.filter((user:any) =>
    user.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='userlistcontiner'>
   <div className='flex justify-between'>
   <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={handleSearch}
      />
      <button className='' onClick={handleopen}>Add</button>
   </div>

      <TableContainer >
        <Table>
          <TableHead>
            <TableRow>
              {keys.map((keyItem, idx) => (
                <TableCell key={idx}>{keyItem}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((mapoflinecource) => (
              <TableRow className='border' key={mapoflinecource.SubCatName}>
                <TableCell className='py-4 px-3'>{mapoflinecource.Subcatid}</TableCell>
                <TableCell className='py-4 px-3'>{mapoflinecource.SubCatName}</TableCell>
                <TableCell className='py-4 px-3'>{mapoflinecource.SubcatDescription}</TableCell>
                <TableCell className='py-4 px-3'>{mapoflinecource.categoryId}</TableCell>
                {/* <TableCell className='py-4 px-3'>{mapoflinecource.password}</TableCell> */}
                <TableCell>
         
                </TableCell>
                <TableCell className='py-4 px-3'>
                  {/* {dayjs(mapoflinecource.createdAt).format('DD/MM /YYYY')} */}
                </TableCell>
                <TableCell className='actionsofusers'>
                  <button className='edituserlist'>
                    <Link to={`update/${mapoflinecource.Subcatid}`}>Edit</Link>
                  </button>
                  <button
                    className='deleteuserlist'
                    onClick={() => handledelete(mapoflinecource.Subcatid)}
                  >
                    Delete
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <Dialog open={show} onClose={handleclose}>
     <Createcource/>
     </Dialog>
    </div>
  );
};

export default Subcategories;