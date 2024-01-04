import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcourceFn } from "../../../../redux/Slices/Dashboard/cources/GetAllCources";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./CourceDataList.css";
import { Approval, Close, Delete, Details, Edit, Restore } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import CreateCoursePage from "../../../../Pages/Dashboard/Cource/CreateCource";
import { DialogActions } from "@material-ui/core";
import { FaBackward, FaRecycle, FaTrashRestore } from "react-icons/fa";

export const Recyclecource = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const allcources = useSelector((state: RootState) => state.getallcources);
  const dispatch = useDispatch<AppDispatch>();
  const [open, setopen] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleclose = () => {
    setopen(false);
  };
  const handleopen = () => {
    setopen(true);
  };

  useEffect(() => {
    dispatch(getAllcourceFn());
  }, []);

  const keys = [
    "Id",
    "Title",
    // "Description",
    "Price",
    "TeacherId",
    "CategoryId",
    "Video",
    "Image",
    "Publishment",
    "Register Time",
    // "Update Time",
    "Actions",
  ];
const navigate=useNavigate()
  const handledelete = (id: any) => {
    axios.delete("http://localhost:2000/api/cource/delete/" + id).then(() => {
      navigate('/dashboard/cources')

    }).catch((err)=>{
      console.log(err)
    })
    
  };
  const handlerestore = (id: any) => {
    axios.put("http://localhost:2000/api/cource/restore/" + id)
     dispatch(getAllcourceFn())
     navigate('/dashboard/cources')

  };


  return (
    <div className="parentcource p-3 my-8 mx-4 rounded-5 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
<div className="flex justify-between">
<input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by course name"
      />
  <button style={{color: "",marginRight:'20px'}}><Link to={'/dashboard/cources'}><FaBackward/></Link></button>
</div>
      <table className="courcechild">
        <thead>
          <tr>
            {keys.map((keyItem, indx) => (
              <th key={indx}>{keyItem}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {allcources.data &&
          
            allcources.data
              .filter((course) =>
                course.title.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((mapTeachers) => (
                mapTeachers.isDeleted ?(
                <tr className="border" key={mapTeachers.courceId}>
                  <td className="py-4 px-3">{mapTeachers.courceId}</td>
                  <td className="py-4 px-3">{mapTeachers.title}</td>
                  {/* <td className="py-4 px-3">{mapTeachers.Shortdescription}</td> */}
                  <td className="py-4 px-3">${mapTeachers.price}</td>
                  <td className="py-4 px-3">{mapTeachers.id}</td>
                  <td className="py-4 px-3">{mapTeachers.CategoryId}</td>
                  <td className="py-4 px-3">
                    <video width="70px" height="20px" src={mapTeachers.videoUrl}></video>
                  </td>
                  <td className="py-4 px-3">
                    <img src={mapTeachers.imageUrl} alt="" />
                  </td>
                  <td className="py-4 px-3">
                    {mapTeachers.isPublished ? <p>Published</p> : <p>Unpublished</p>}
                  </td>
                  <td className="py-4 px-3">
                    {dayjs(mapTeachers.createdAt).format("DD/MM/YYYY")}
                  </td>
                  {/* <td className="py-4 px-3">
                    {dayjs(mapTeachers.UpadatedAt).format("DD/MM/YYYY")}
                  </td> */}

                  <td className="btnscource">
                    <button
                      className=""
                      onClick={() => handleOpenDeleteDialog(mapTeachers.courceId)}
                    >
                      <Delete />
                    </button> <br />
                    <button
                      className=""
                      onClick={() => handlerestore(mapTeachers.courceId)}
                    >
                      <Restore/>
                    </button> <br />
                  
                  </td>
                </tr>
              ):null))}
        </tbody>
      </table>
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