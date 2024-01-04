
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { getAlluserFn } from '../../../../redux/Slices/Dashboard/User/GetAllUsers';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Ofliencource.css';
import { BiRecycle } from "react-icons/bi";
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
import CreatesubcourceOfline from '../../../../Pages/Dashboard/SubocurceOfline/Createcource';
import { getAllOflineSubCourceFn } from '../../../../redux/Slices/Dashboard/SubcourceOfline/getall';
import { Close, Delete, Edit } from '@mui/icons-material';
// import { GetallOflincourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import  './subcourcecontiner.css'
const SubcourceOflineList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

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
  const getallUsers = useSelector((state: RootState) => state.getallsubcource);
  useEffect(() => {
    dispatch(getAllOflineSubCourceFn());
  }, []);

  const keys = [
    'id',
    'SubCource Name',
    'Description',
    'OflinecourceId',
    'Created At',
    'Updated At',
    'Actions',
  ];

  const handledelete = (id: any) => {
    axios.put(`http://localhost:5000/api/subcource/trash/${id}`);
    dispatch(getAllOflineSubCourceFn());
     setOpenDeleteDialog(false)
     setDeleteItemId(null)
  };

  const filteredUsers = getallUsers.data.filter((user:any) =>
    user.Title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='subcourcecontiner m-2 p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] '>
   <div className='flex justify-between'>
   <input
        type='text'
        placeholder='Search by name'
        value={searchTerm}
        onChange={handleSearch}
      />
       <div className="flex">
       <Link to={`recycle`}><p style={{cursor:'pointer',fontSize:"40px",color:'blue',}}><BiRecycle/></p></Link>

       
      <button className='add' onClick={handleopen}>Add</button>
       </div>
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
             !mapoflinecource.isDeleted &&  <TableRow className='border' key={mapoflinecource.subcourceId}>
             <TableCell className='py-4 px-3'>{mapoflinecource.subcourceId}</TableCell>
             <TableCell className='py-4 px-3'>{mapoflinecource.Title}</TableCell>
             <TableCell className='py-4 px-3'>{mapoflinecource.Description}</TableCell>
             <TableCell className='py-4 px-3'>{mapoflinecource.oflinecourceId}</TableCell>
           
             <TableCell className='py-4 px-3'>
               {dayjs(mapoflinecource.CreatedAt).format('DD/MM /YYYY')}
             </TableCell>
             <TableCell className='py-4 px-3'>
               {dayjs(mapoflinecource.UpdatedAt).format('DD/MM /YYYY')}
             </TableCell>
             <TableCell className=''>
               <button className=''>
                 <Link to={`update/${mapoflinecource.subcourceId}`}><Edit/></Link>
               </button>
               <button
                 className=''
                 onClick={() => handleOpenDeleteDialog(mapoflinecource.subcourceId)}
               >
                 <Delete/>
               </button>
             </TableCell>
           </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     <Dialog open={show} onClose={handleclose}>
  <div className="flex justify-between m-4">
  <p>subcource</p>
      <p><Close/></p>
  </div>
     <CreatesubcourceOfline/>
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

export default SubcourceOflineList;