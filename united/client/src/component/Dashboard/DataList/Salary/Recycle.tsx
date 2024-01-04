import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useEffect, useState } from "react";
import { getAllSalaryFn } from "../../../../redux/Slices/Dashboard/salary/GetAllsalry";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import './SalaryList.css'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { CreateSalary } from "../../../../Pages/Dashboard/Salaries/CreateSalary";
import { CloseOutlined, Delete, Edit, Recycling, Restore } from "@mui/icons-material";
import { FaBackward } from "react-icons/fa";

export const RecycleSalary: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedSalary, setSelectedSalary] = useState<any>(null);

  const handleOpen = (salary: any) => {
    setSelectedSalary(salary);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const allSalaryState = useSelector((state: RootState) => state.getAllsalaries);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllSalaryFn());
  }, []);

  const [searchteacherphone, setsearchteacherphone] = useState('');

  const keys = [
    'Id',
    'TeacherId',
    'TeacherName',
    'TeacherPhone',
    'Amount',
    'Pay Date',
    'Actions',
  ];

  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:5000/api/salary/delete/${id}`)
      .then(() => {
        handleClose();
        dispatch(getAllSalaryFn());
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRestore = (id: any) => {
    axios.put(`http://localhost:5000/api/salary/restore/${id}`)
    dispatch(getAllSalaryFn());
  };

  return (
    <div className='salaryparent shadow-[0_3px_30px_rgb(0,0,0,0.2)]'>
      <div className='categ'>
        
      
      </div>
<div className="flex justify-between">
<input
        type="text"
        value={searchteacherphone}
        onChange={(e) => setsearchteacherphone(e.target.value)}
        placeholder="Search by teacherphone"
      />
        <div className="flex">
          <Link to={'/dashboard/salary'}><FaBackward style={{ color: 'blue', fontSize: '40px' }} /></Link>
         
        </div>
</div>
      <table className='salarychild w-full'>
        <thead>
          <tr>
            {keys.map((keyItem, idx) => (
              <th key={idx}>{keyItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {allSalaryState.data
            .filter((salary) =>
              salary.TeacherPhone
                ?.toString()
                .includes(searchteacherphone.toLowerCase())
            )
            .map((mapSalary) =>
              mapSalary.isDeleted ? (
                <tr className='border' key={mapSalary.id}>
                  <td className='py-4 px-3'>{mapSalary.id}</td>
                  <td className='py-4 px-3'>{mapSalary.teacherId}</td>
                  <td className='py-4 px-3'>{mapSalary.TeacherName}</td>
                  <td className='py-4 px-3'>{mapSalary.TeacherPhone}</td>
                  <td className='py-4 px-3'>${mapSalary.Amount}</td>
                  <td className='py-4 px-3'>
                    {dayjs(mapSalary.createdAt).format('DD/MM/YYYY')}
                  </td>
                  <td className='btnssalary'>
                    <button
                      className='deletesalarybtn text-blue-400'
                      onClick={() => handleRestore(mapSalary.id)}
                    >
                      <Restore />
                    </button>
                    <button
                      className='deletesalarybtn text-red-400'
                      onClick={() => handleOpen(mapSalary)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              ) : null
            )}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleClose}>
  <DialogTitle>Warning</DialogTitle>
  <DialogContent>
    <p>Are you sure you want to delete this salary?</p>
    <span>this salary will delete permanent</span>
  </DialogContent>
  <DialogActions>
    <Button variant="contained" onClick={handleClose}>
      Cancel
    </Button>
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        handleDelete(selectedSalary?.id);
        setSelectedSalary(null);
      }}
    >
      Confirm
    </Button>
  </DialogActions>
</Dialog>
    </div>
  );
};