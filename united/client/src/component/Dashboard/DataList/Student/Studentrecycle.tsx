import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllStudentFn } from "../../../../redux/Slices/Dashboard/Student/GetAllStudents";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling, Restore } from '@mui/icons-material';
import './studentlist.css'
import {Button, ButtonBase, Dialog,DialogActions,DialogTitle, TextField} from '@mui/material'
import { createStudentFn, resetStudentState } from "../../../../redux/Slices/Dashboard/Student/Createstudent";
import UpdateStudent from "../../../../Pages/Dashboard/Students/update";
import {useQuill} from 'react-quilljs'
import 'quill/dist/quill.snow.css'
import { FaBackward } from "react-icons/fa";
export const Recyclestudent: React.FC = () => {

  const allStudentState = useSelector((state: RootState) => state.getAllstudent);
  const [open, setOpen] = useState(false);
  const[openUpdate,setopenUpdate]=useState(false)
  const [opendailog,setopendailog]=useState(false)
  const [itemId,setitemId]=useState(null)
  const handlechangedailog=(deleteitemId:any)=>{
  setopendailog(!opendailog)
  setitemId(deleteitemId)
  }
  const handlecloseupdae=()=>{
    setopenUpdate(false)
  }
  const handleopenupdate=()=>{
    setopenUpdate(true)
  }
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllStudentFn());
  }, []);

  const [searchPhone, setSearchPhone] = useState('');

  const keys = [
    'ID',
    'Name',
    'Fee',
    'Phone',
    'Email',
    'Created At',
    'Updated At',
    'Actions',
  ];

  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:5000/api/student/delete/${id}`)
    dispatch(getAllStudentFn());
    setopendailog(false)
  };
  const handlerestore = (id: any) => {
    axios.put(`http://localhost:5000/api/student/restore/${id}`)
    dispatch(getAllStudentFn());
    setopendailog(false)
  };
  // const toastId = 'createStudent';
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [Amount, setAmount] = useState<number>(); // Changed to number

  const createStudentStateregister = useSelector((state: RootState) => state.createstudent);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data:any = {
      Name,
      email,
      phone,
      Amount
    };
    if (!Name || !email) {
      return toast.error('Please provide valid data', { id: toastId });
    }
    dispatch(createStudentFn(data)).then((res)=>{
      location.reload()
     
    })
    .catch(()=>[

    ])
  
  };

  const navigate = useNavigate();
  const toastId = 'createStudent';
  useEffect(() => {
    if (createStudentState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createStudentState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/categories');
    }

    if (createStudentState.isError) {
      toast.error(createStudentState.errorMsg, { id: toastId });
    }

    dispatch(resetStudentState());
  }, [

  ]);
  const createStudentState = useSelector((state: RootState) => state.createstudent);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='studentparent shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
<div className="flex justify-between">
<input
  type="text"
  value={searchPhone}
  onChange={(e) => setSearchPhone(e.target.value)}
  placeholder="Search by phone number"
/>
<button className='mr-4 text-blue-500' style={{fontSize:"26px"}} type="button" onClick={handleOpen}>
          <Link to={'/dashboard/students'}><FaBackward/></Link>
        </button>
</div>
      <table className='childtable'>
        <thead className="">
          <tr>
            {keys.map((keyItem, idx) => (
              <th key={idx}>{keyItem}</th>
            ))}
          </tr>
        </thead>
        <tbody >
          {allStudentState.data
            .filter((student) =>
              student.phone?.toString().includes(searchPhone.toLowerCase())
            )
            .map((fetchindata) => (
              fetchindata.isDeleted ?
              <tr className='border' key={fetchindata.Id}>
                <td className='py-4 px-3'>{fetchindata.Id}</td>
                <td className='py-4 px-3'>{fetchindata.Name}</td>
                <td className='py-4 px-3'>${fetchindata.Amount}</td>
                <td className='py-4 px-3'>{fetchindata.phone}</td>
                <td className='py-4 px-3'>{fetchindata.email}</td>
                <td className='py-4 px-3'>
                  {dayjs(fetchindata.createdAt).format('DD/MM/YYYY')}
                </td>
                <td className='py-4 px-3'>
                  {dayjs(fetchindata.UpadatedAt).format('DD/MM/YYYY')}
                </td>
               
                <td className="grid">
                <button  className="">
                  <Link to={`update/${fetchindata.Id}` }><Edit/></Link>
                  {/* <button onClick={()=>handleedit(catItem.catId)}>Edit</button> */}
                </button>
                <button
                  className=""
                  onClick={() =>  handlechangedailog(fetchindata.Id)}
                >
                  <Delete/>
                </button>
                <button
                  className=""
                  onClick={() =>  handlerestore(fetchindata.Id)}
                >
                  <Restore/>
                </button>
              </td>
              </tr>:null
            ))}
        </tbody>
      </table>
      <Dialog open={opendailog} onClose={handlechangedailog}>
        <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this student ?</h3>
    <span>Note:</span>if you delete you will not restore again
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handlechangedailog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handleDelete(itemId)}
      >
        Confirm
      </button>
    </div>
  </div>
        </Dialog>
    </div>
  );
};

