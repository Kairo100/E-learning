
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { FormEvent, useEffect, useState } from "react";
import { getAllTeacherFn } from "../../../../redux/Slices/Dashboard/Teacher/GetAllTeacher";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";
import './Teacherlist.css'
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling, Restore } from '@mui/icons-material';

import { createTeacherData, createTeacherFn, resetTeacherState } from "../../../../redux/Slices/Dashboard/Teacher/CreateTeacher";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import { FaBackward } from "react-icons/fa";

export const RecycelTeacher: React.FC = () => {
  const toastId = 'createTeacCreateTeacher';
  const [Name, setName] = useState('');
  const [open, setOpen] = useState(false);
  const [Amount, setAmount] = useState<number>();
  const [phone, setphone] = useState('');
  const allTeacherState = useSelector((state: RootState) => state.getallteachers);
  const createTeacCreateTeacherState = useSelector((state: RootState) => state.createTeacher);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [searchPhone, setSearchPhone] = useState('');
  const [deleteItemId, setDeleteItemId] = useState('');

  useEffect(() => {
    dispatch(getAllTeacherFn());
  }, []);

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
    setDeleteItemId(id);
    setOpen(true);
  };

  const handleDeleteConfirm = (id: any) => {
    axios.delete(`http://localhost:5000/api/teacher/delete/${id}`)
      .then(() => {
        setOpen(false);
        location.reload();
      })
      .catch((error) => {
        console.error(error);
        setOpen(false);
      });
  };

  const handleDeleteCancel = () => {
    setOpen(false);
  };

  const handlerestore = (id: any) => {
    axios.put(`http://localhost:5000/api/teacher/restore/${id}`)
    navigate('/dashboard/teachers')
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const data: createTeacherData = {
      Name,
      phone,
      Amount,
    };

    if (!Name || !Amount) {
      return toast.error('Please provide valid data', { id: toastId });
    }

    dispatch(createTeacherFn(data)).then((res) => {
      location.reload();
    });
  };

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

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className='teacherListContiner shadow-[0_3px_10px_rgb(0,0,0,0.2)]'>
      <div className="flex justify-between">
        <input
          type="text"
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
          placeholder="Search by phone number"
        />
        <Link style={{marginRight:'20px',color:'blue',fontSize:'25px'}} to={'/dashboard/teachers'}><FaBackward/></Link>
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
            .filter((teacher) =>
              teacher.phone?.toLowerCase().includes(searchPhone.toLowerCase())
            )
            .map((mappingdata) => (
              mappingdata.isDeleted ? (
                <tr key={mappingdata.Id}>
                  <td> {mappingdata.Id}</td>
                  <td>{mappingdata.Name}</td>
                  <td>{mappingdata.phone}</td>
                  <td>${mappingdata.Amount}</td>
                  <td>{dayjs(mappingdata.createdAt).format('DD/MM/YYYY')}</td>
                  <td>{dayjs(mappingdata.UpadatedAt).format('DD/MM/YYYY')}</td>
                  <td className='grid'>
                    <button
                      className='text-red-600'
                      onClick={() => handleDelete(mappingdata.Id)}
                    >
                      <Delete/>
                    </button>
                    <button
                      className='text-blue-600'
                      onClick={() => handlerestore(mappingdata.Id)}
                    >
                      <Restore/>
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
        </tbody>
      </table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Delete Teacher</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this teacher?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={() => handleDeleteConfirm(deleteItemId)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};