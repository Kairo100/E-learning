import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllStudentFn } from "../../../../redux/Slices/Dashboard/Student/GetAllStudents";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling } from '@mui/icons-material';
import './studentlist.css'
import {Button, ButtonBase, Dialog,DialogActions,DialogTitle, TextField} from '@mui/material'
import { createStudentFn, resetStudentState } from "../../../../redux/Slices/Dashboard/Student/Createstudent";
import UpdateStudent from "../../../../Pages/Dashboard/Students/update";
import {useQuill} from 'react-quilljs'
import 'quill/dist/quill.snow.css'
export const StudentList: React.FC = () => {

  const allStudentState = useSelector((state: RootState) => state.getAllstudent);
  const [open, setOpen] = useState(false);
  const[openUpdate,setopenUpdate]=useState(false)
  const [opendailog,setopendailog]=useState(false)
  const [deleteItemId,setDeleteItemId]=useState(null);
  const handleopenandclosedailog=(itemId:any)=>{
    setopendailog(!opendailog)
    setDeleteItemId(itemId)
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
    axios.put(`http://localhost:5000/api/student/trash/${id}`);
    dispatch(getAllStudentFn());
    setopendailog(false)
  };
  // const toastId = 'createStudent';
  const [Name, setName] = useState('');
  const [email, setemail] = useState('');
  const [phone, setphone] = useState('');
  const [method, setMethod] = useState('');
  const [Amount, setAmount] = useState<number>(); // Changed to number

  const createStudentStateregister = useSelector((state: RootState) => state.createstudent);


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data:any = {
      Name,
      email,
      phone,
      Amount,
      method
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
   
<div className="flex justify-between items-center">
<input
  type="text"
  value={searchPhone}
  onChange={(e) => setSearchPhone(e.target.value)}
  placeholder="Search by phone number"
/>
<div className="flex">
      <Link to={'recycle'}><Recycling style={{color:'blue',fontSize:'30px'}}/></Link>
        <button className='add' type="button" onClick={handleOpen}>
       Add
        </button>
      </div>
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
              !fetchindata.isDeleted &&
              <tr className='border' key={fetchindata.Id}>
                <td className='py-4 px-3'>{fetchindata.Id}</td>
                <td className='py-4 px-3'>{fetchindata.Name}</td>
                <td className='py-4 px-3'>{fetchindata.method}{fetchindata.Amount}</td>
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
                  onClick={()=>handleopenandclosedailog(fetchindata.Id)}
                >
                  <Delete/>
                </button>
              </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
       <div className="btnregistercource" style={{display:'flex',justifyContent:"space-between",alignItems:'center'}}>
       <h1 style={{fontSize:'20px',fontWeight:'bolder'}}>Register Student</h1>
        <button style={{fontSize:'2px',color:'gray'}} onClick={handleClose}> <CloseIcon /></button>
       </div>
      <form onSubmit={handleSubmit} style={{
        paddingLeft:'28px',
    
        paddingRight:'28px'
      }}>
        {/* <div  value={email} ref={quillRef}/> */}
          <div className=''>
            <TextField
           name="Full Name"
           margin="normal"
           label="Full Name"
              type='text'
              fullWidth
              placeholder='Student name'
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
          <label htmlFor="method">Method:</label>
          <select
            id="method"
            value={method}
            onChange={(e) => setMethod(e.target.value)}
          >
            <option value="">Select Method</option>
            <option value="sh">SH</option>
            <option value="$">$</option>
          </select>
        </div>
          <div className=''>
            <TextField
             margin="normal"
               name="Email"
               label="Email"
              type='email'
              placeholder='Student Email'
              value={email}
              fullWidth
              onChange={(e) => setemail(e.target.value)}
             required/>
          </div>
          <div className=''>
            <TextField
           name="phone"
           margin="normal"
           label="phone"
              type='text'
              placeholder='Student phone'
              value={phone}
              fullWidth
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className=''>
            <TextField
           name="Fee"
           label="Fee"
           fullWidth
           margin="normal"
              type='number' // Changed to number type
              placeholder='Student fee Amount'
              value={Amount}
              onChange={(e) => setAmount(Number(e.target.value))} // Convert the input value to a number
            />

          </div>
          <div className='btnscreatestudent'>
          <button className="btncansavest"
          
          >Save</button>

          </div>
       
        </form>
        </Dialog>
        <Dialog open={openUpdate} onClose={handlecloseupdae}>
<UpdateStudent/>
        </Dialog>
        <Dialog open={opendailog} onClose={handleopenandclosedailog}>
        <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this item?</h3>
    <div className="flex justify-end">
      <button
        className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
        onClick={handleopenandclosedailog}
      >
        Cancel
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600"
        onClick={() => handleDelete(deleteItemId)}
      >
        Confirm
      </button>
    </div>
  </div>
        </Dialog>
    </div>
  );
};

