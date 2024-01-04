import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getAllOflineCourceFn } from '../../../../redux/Slices/Dashboard/Oflinecource/getall';
import Createoflincource from '../../../../redux/Slices/Dashboard/Oflinecource/CreateOflinecource';
import { Dialog, Button } from '@mui/material';
import Createcource from '../../../../Pages/Dashboard/Oflinecource/Createcource';
import { DeleteOflineFn } from '../../../../redux/Slices/Dashboard/Oflinecource/Delete';
import CreateOflineenrollment from '../../../../Pages/Dashboard/Oflineenrollment/CreaeOflineenrollment';
import { getAllOflineEnrollmentFn } from '../../../../redux/Slices/Dashboard/OflineEnrollment.ts/Getalloflineenrolment';
import { Delete, Edit, Recycling } from '@mui/icons-material';
import { createOflineenrollmentFn } from '../../../../redux/Slices/Dashboard/OflineEnrollment.ts/CreateEnrollment';
import './Oflineenrollment.css'
const Oflineenrollment = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [show, setshow] = useState(false);
  const [deleteId, setDeleteId] = useState('');
  const [studentId,setstudentId]=useState('')
  const [OflinecourceId,setOflinecourceId]=useState('')
  const [StudentName,setStudentName]=useState('')
  const handlesubmit=()=>{
  const data:any ={
    studentId,
    OflinecourceId,
    StudentName
  }
  dispatch(createOflineenrollmentFn(data))
  }
 
  const handlestudenteIdchange=(e:React.ChangeEvent<HTMLInputElement>)=>{
    try {
      const id=(e.target.value)
      setstudentId(id)
      axios.get(`http://localhost:5000/api/student/get/one/`+id).then((response)=>{
        const {Name}=response.data;
        setStudentName(Name)
      })
    } catch (error) {
      
    }
  }
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

  const handledelete = (id: any) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    axios.put('http://localhost:5000/api/ofllinenrollment/trash/' + deleteId)
  setDeleteId('')
  dispatch(getAllOflineEnrollmentFn())
  };

  const handleCancelDelete = () => {
    setDeleteId('');
  };

  return (
    <div className='oflineenrollmentcontiner mt-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] p-4 rounded-lg   '>
      <div className='flex sm:flex-row items-center justify-between mb-4'>
        <input
          type='text'
          placeholder='Search by name'
          value={searchTerm}
          onChange={handleSearch}
          className='mb-4 sm:mb-0 sm:w-60 p-2 border border-gray-300 rounded-lg'
        />
        <div className="flex">
          <Link to={'recycle'}><Recycling style={{ color: 'blue', fontSize: '40px' }} /></Link>
          <button className='bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg' onClick={handleopen}>
            Add
          </button>
        </div>
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
              !mapoflineEnrollment.isDeleted ? <TableRow className='border' key={mapoflineEnrollment.id}>
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
                  <button className=''>
                    <Link to={`update/${mapoflineEnrollment.id}`}>
                      <Edit />
                    </Link>
                  </button>
                  <button className='' onClick={() => handledelete(mapoflineEnrollment.id)}>
                    <Delete />
                  </button>
                </TableCell>
              </TableRow> : null
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={deleteId !== ''} onClose={handleCancelDelete}>
        <div className="p-4">
          <h2 className="text-xl mb-2">Are you sure you want to delete this item?</h2>
          <div className="flex justify-end">
            <Button variant="outlined" onClick={handleCancelDelete}>Cancel</Button>
            <Button variant="contained" onClick={handleConfirmDelete} className="ml-2">Confirm</Button>
          </div>
        </div>
      </Dialog>
      <Dialog open={show} onClose={handleclose}>
        
    <div className="flex justify-center items-center bg-gray-100">
      <div className="w-[300px] max-w-md p-6 bg-white rounded shadow">
        <h1 className="mb-6 w-100 text-2xlfont-bold text-center"></h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              value={studentId}
              placeholder="Enter studentId"
              onChange={handlestudenteIdchange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="description" 
              value={OflinecourceId}
              placeholder="Enter OflinecourceId"
              onChange={(e) => setOflinecourceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="teacherId"
              value={StudentName}
              placeholder="Enter StudentName"
              onChange={(e) => setStudentName(e.target.value)}
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

    </div>
  );
};

export default Oflineenrollment;