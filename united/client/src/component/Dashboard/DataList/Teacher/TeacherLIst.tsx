import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllTeacherFn } from "../../../../redux/Slices/Dashboard/Teacher/GetAllTeacher";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import './Teacherlist.css'
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling } from '@mui/icons-material';

import { createTeacherData, createTeacherFn, resetTeacherState } from "../../../../redux/Slices/Dashboard/Teacher/CreateTeacher";
import { Dialog, TextField } from "@mui/material";
export const TeacherList: React.FC = () => {
  const toastId = 'createTeacCreateTeacher';
  const [Name, setName] = useState('');
  const [method, setMethod] = useState('');
  const [open,setOpen]=useState(false)
  const [Amount, setAmount] = useState<number>();
  const [phone, setphone] = useState('');
  const allTeacherState = useSelector((state: RootState) => state.getallteachers);
  const [opendailog,setopendailog]=useState(false)
  const [deleteItemId,setDeleteItemId]=useState(null);
  const handleopenandclosedailog=(itemId:any)=>{
    setopendailog(!opendailog)
    setDeleteItemId(itemId)
  }


  useEffect(() => {
    dispatch(getAllTeacherFn());
  }, []);

  const [searchPhone, setSearchPhone] = useState('');

  const keys = [
    'Id',
    'Name',
    'phone',
    'Amount',
    'createdAt',
    'updatedAt',
    'Actions',
  ];

  const handleDelete = (id: any) => {
    axios
      .put(`http://localhost:5000/api/teacher/trash/${id}`)
       location.reload()
  };
  const createTeacCreateTeacherState = useSelector(
    (state: RootState) => state.createTeacher
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: any = {
      Name,
      phone,
      Amount,
      method
    //  courceId,
       
     
    };
    if(!Name ||!Amount){
      return toast.error('please provide valid data',{id:toastId})
    }
    dispatch(createTeacherFn(data)).then((res)=>{
      location.reload()
    });
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (createTeacCreateTeacherState.isLoading)
      toast.loading('Saving...', { id: toastId });

    if (createTeacCreateTeacherState.isSuccess) {
      toast.success('Successfully created.', { id: toastId });
      navigate('/dashboard/Teachers');
    }

    if (createTeacCreateTeacherState.isError) {
      toast.error(createTeacCreateTeacherState.errorMsg, { id: toastId });
    }

    dispatch(resetTeacherState());
  }, [
    createTeacCreateTeacherState.isLoading,
    createTeacCreateTeacherState.isSuccess,
    createTeacCreateTeacherState.isError,
  ]);
const handleclose=()=>{
  setOpen(false)
}
const handleopen=()=>{
  setOpen(true)
}
  return (
    <div className='teacherListContiner shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
 <div className="flex justify-between">

      <input
  type="text"
  value={searchPhone}
  onChange={(e) => setSearchPhone(e.target.value)}
  placeholder="Search by phone number"
/>
<div className=''>
      <Link to={'recycle'}><Recycling style={{color:'blue',fontSize:'40px'}}/></Link>
        <button className='add' onClick={handleopen}>
          Add
        </button>
      </div>
 </div>
      <table className='teachercont'>
        <thead>
          <tr>
            {keys.map((keying, indx) => (
              <th key={indx}>{keying}</th>
            ))}
          </tr>
        </thead>
        <tbody className='tbodyteacher'>
          {allTeacherState.data
            .filter((teacher:any) =>
              teacher.phone?.toLowerCase().includes(searchPhone.toLowerCase())
            )
            .map((mappingdata:any) => (
              !mappingdata.isDeleted ?(
              <tr key={mappingdata.Id}>
                <td> {mappingdata.Id}</td>
                <td>{mappingdata.Name}</td>
                <td>{mappingdata.phone}</td>
                <td>{mappingdata.method}{mappingdata.Amount}</td>
                <td>{dayjs(mappingdata.createdAt).format('DD/MM/YYYY')}</td>
                <td>{dayjs(mappingdata.UpadatedAt).format('DD/MM/YYYY')}</td>
                <td className='grid'>
                  <button className='text-blue-400'>
                    <Link to={`update/${mappingdata.Id}`}><Edit/></Link>
                  </button>
                  <button
                    className='text-red-400'
                    onClick={() => handleopenandclosedailog(mappingdata.Id)}
                  >
                    <Delete/>
                  </button>
                </td>
              </tr>
              ):null
            ))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleclose}>
        <div style={{display:'flex',justifyContent:'space-between'}}>
         <h1 style={{}}>Register Teacher</h1>
          <p><CloseIcon/></p>
        </div>
      <form onSubmit={handleSubmit} style={{
        padding:'20px'
      }}>
            <div>
              <TextField
                name="Full Name"
                label="Full Name"
                fullWidth
                type='text'
                placeholder='Teacher name'
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
            <div className='teachersalary' style={{marginTop:20}}>
              <TextField
                   name="Salary"
                   label="Salary"
                   fullWidth
                type='number'
                placeholder='teacher salary'
                value={Amount}
                onChange={(e) => setAmount(Number(e.target.value))}
              />
            </div>
            {/* <div className='' style={{marginTop:20}}>
              <input
               
                type='text'
                placeholder='cource Id'
                value={courceId}
                onChange={(e) => setcourceId(Number(e.target.value))}
              />
            </div> */}
            <div>
              <TextField
               name="Teacher phone"
               label="Teacher phone"
                type='text'
                placeholder='phone'
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
            </div>

          
       <div className='btntcontiner'>
       <button className='svbtnt'>
                {createTeacCreateTeacherState.isLoading ? 'Loading...' : 'Save'}
              </button>
            
       </div>

        </form>
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
