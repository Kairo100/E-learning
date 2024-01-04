import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { Dialog } from "@mui/material";
import { Delete, Restore } from "@mui/icons-material";
import { getAllexamFn } from "../../../../redux/Slices/Dashboard/Exam/Getallexams";
import { FaBackward } from "react-icons/fa";
import './ExamList.css';
const RecyclePinexam = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allexamState = useSelector((state: RootState) => state.getAllExam);
  const dispatch = useDispatch<AppDispatch>();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleDelete = (id:any) => {
    axios.delete(`http://localhost:5000/api/exam/delete/${id}`)
    dispatch(getAllexamFn());
    setOpenDeleteDialog(false)
  };

  const handleRestore = (id:any) => {
    axios.put(`http://localhost:5000/api/exam/restore/${id}`)
    dispatch(getAllexamFn());
    setOpenDeleteDialog(false)
    
  };

  useEffect(() => {
    dispatch(getAllexamFn());
  }, []);

  const keys = [
    "id",
    "studentId",
    "Studentname",
    "studentPhone",
    "SubcourceId",
    "CourceName",
    "Total",
    "TakeDate",
    "UpdateDate",
    "Actions"
  ];

  const searching = (data:any) => {
    return data.filter((item:any) =>
      item.studentPhone.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  return (
    <div className="continterexamlist m-2 mt-4 p-4 rounded-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="categ">
        <p>Exams</p>
        <button className="" style={{color:'blue',fontSize:'30px'}}>
          <Link to={`/dashboard/exams`}><FaBackward/></Link>
        </button>
      </div>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by student phone"
        className="p-2 mb-4 border border-gray-300 rounded-md sm:w-64"
      />

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              {keys.map((keyItem, idx) => (
                <th key={idx} className="py-2 px-4">
                  {keyItem}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bodytableexam">
            {searching(allexamState.data).map((exmafn:any) => (
              exmafn.isDeleted ? (
                <tr className="border" key={exmafn.id}>
                  <td className="py-2 px-4">{exmafn.id}</td>
                  <td className="py-2 px-4">{exmafn.studentId}</td>
                  <td className="py-2 px-4">{exmafn.Studentname}</td>
                  <td className="py-2 px-4">{exmafn.studentPhone}</td>
                  <td className="py-2 px-4">{exmafn.SubcourceId}</td>
                  <td className="py-2 px-4">{exmafn.CourceName}</td>
                  <td className="py-2 px-4">{exmafn.Total}</td>
                  <td className="py-2 px-4">
                    {dayjs(exmafn.TakeDate).format("DD, MMM YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    {dayjs(exmafn.UpdateDate).format("DD, MMM YYYY")}
                  </td>
                  <td className="py-2 px-4">
                    <button onClick={() => handleOpenDeleteDialog(exmafn.id)}>
                      <Delete />
                    </button>
                    <button onClick={() => handleRestore(exmafn.id)}>
                      <Restore />
                    </button>
                  </td>
                </tr>
              ) : null
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold">Are you sure you want to delete this item?</h3>
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

export default RecyclePinexam;