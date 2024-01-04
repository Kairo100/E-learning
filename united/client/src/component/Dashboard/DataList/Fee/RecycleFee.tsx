
import{ useEffect, useState } from 'react';
import {useReactToPrint} from 'react-to-print'
import axios from 'axios'
import './Feelist.css'
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/store';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { getAllFeeFn } from '../../../../redux/Slices/Dashboard/fee/GetAllFee';
import { Dialog } from '@mui/material';
import CreateFee from '../../../../Pages/Dashboard/Fees/CreateFees';
import { Delete, Restore } from '@mui/icons-material';
import { FaBackward } from 'react-icons/fa';
export const Feerecycle = () => {
   const navigate=useNavigate()
  const [ustudentId, usetStudentId] = useState('');
  const [ubalance, usetBalance] = useState('');
  const [uamountPaid, usetAmountPaid] = useState('');
  const [utotal, usetTotal] = useState('');
  const allFeeState = useSelector((state: RootState)=>state.getAllFee);
  const [id,setid]=useState(-1)
  const dispatch=useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
//  const navigate=useNavigate
  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  useEffect(() => {
    dispatch(getAllFeeFn());
  }, []);
  const keys = [
    'Id',
    'Amountneed',
    'Balance',
     'amount paid',
     'StudentId',
    'studentName',
    'studentPhone',
    'Pay Date',
    'Update Date',
    // 'Is Deleted',
    'Actions',
  ];

const hanleupdate =()=>{
  axios.put('http://localhost:5000/api/fee/update/'+id,{amountPaid:uamountPaid,total:utotal,balance:ubalance,studentId:ustudentId})
  .then(res=>{
    navigate('/dashboard/fees')
    setid(-1)
  }).catch(err=>(console.log(err)))
}
const handledelete =(id:any)=>{
  axios.delete('http://localhost:5000/api/fee/delete/'+id)
navigate('/dashboard/fees')
}
const handlerestore =(id:any)=>{
  axios.put('http://localhost:5000/api/fee/restore/'+id)
  navigate('/dashboard/fees')
}
const [show,setshow]=useState(false)
const handleshow=()=>{
  setshow(!show)
}
  return (
    <div className='Feelistcontiner shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-2 p-2 rounded'>
         <div className='categ'>
        <p>Fees</p>
       <button className='text-blue-600' style={{fontSize:"20px"}}><Link to={'/dashboard/fees'}><FaBackward/></Link></button> 
       </div>
      <table className='tablefee'>
        <tr>
          {keys.map((keyItem, indx) => (
            <th key={indx}>{keyItem}</th>
          ))}
        </tr>

        <tbody>
          { allFeeState.data && allFeeState.data.map((mapFee) => (
            mapFee.id ==id ? 
            <tr>
        <td>{mapFee.id}</td>
        {/* <td><input type="text" style={{color:'red'}}  value={uamountPaid} /></td> */}
        <td><input type="text"  style={{background:'red'}} value={uamountPaid} onChange={(e)=>usetAmountPaid(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}  value={utotal} onChange={(e)=>usetTotal(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}  value={ustudentId} onChange={(e)=>usetStudentId(e.target.value)}/></td>
        <td><input type="text" style={{background:'red'}}   value={ubalance} onChange={(e)=>usetBalance(e.target.value)}/></td>
        <td><button onClick={hanleupdate}>Update</button></td>
            </tr>
              
            :mapFee.isDeleted ? <tr className='border' key={mapFee.id}>
              <td className='py-4 px-3'>{mapFee.id}</td>
              <td className='py-4 px-3'>{mapFee.method}{mapFee.Amountneed}</td>
              <td className='py-4 px-3'>{mapFee.method}{mapFee.Balance}</td>
              <td className='py-4 px-3'>{mapFee.method}{mapFee.amountPaid}</td>
              <td className='py-4 px-3'>{mapFee.studentId}</td>
              <td className='py-4 px-3'>{mapFee.studentName}</td>
              <td className='py-4 px-3'>{mapFee.studentPhone}</td>
              <td className='py-4 px-3'>
                {dayjs(mapFee.PaidAt).format('DD/MM /YYYY')}
              </td>
              <td className='py-4 px-3'>
                {dayjs(mapFee.UpdatedAt).format('DD/MM /YYYY')}
              </td>
    
              <td className='grid'>
              <button className='text-blue-500' onClick={()=>handlerestore(mapFee.id)}><Restore/></button>
                <button className='text-red-600 text:hover-red-300' onClick={()=>handleOpenDeleteDialog(mapFee.id)}><Delete/></button>
              </td>
            </tr>:null
          ))}
        </tbody>
      </table>
      <Dialog open={show} onClose={handleshow}>
        <CreateFee/>
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold">Are you sure you want to delete this Fee?</h3>
   <div className="flex"> <span className="text-blue-700">Note:</span><span>if you delete you will restore !!!</span></div>
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
