import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllcourceFn } from "../../../../redux/Slices/Dashboard/cources/GetAllCources";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "./CourceDataList.css";
import { Add, Approval, Close, Delete, Details, Edit } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import CreateCoursePage from "../../../../Pages/Dashboard/Cource/CreateCource";
import { DialogActions } from "@material-ui/core";
import { FaRecycle, FaTrashRestore } from "react-icons/fa";

export const CourcesListsData = () => {
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
const navigate =useNavigate()
  const keys = [
    "Id",
    "Title",
    // "Description",
    "Price",
    "Image",
    "confirmation",
    "Register Time",
    "Update Time",
    "Actions",
  ];

  const handledelete = (id: any) => {
    axios.put("http://localhost:2000/api/cource/trash/" + id)
    navigate('/dashboard/cources/recycle')
  };

  const handlepublish = (courceId: any) => {
    axios
      .put(`http://localhost:2000/api/cource/puplish/` + courceId)
      location.reload()
  };

  return (
    <div className="parentcource  p-3 m-8 rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
      <div className="categ">

      </div>
<div className="flex justify-between">
  
<input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by course name"
      />
<div className="flex mr-2 items-center">
  <Link to={'recycle'} style={{fontSize:'30px',color:""}}><FaRecycle/></Link>
        {/* <button className="" onClick={handleopen}>
          <Add className="" style={{fontSize:'40px'}}/>
        </button> */}
</div>
</div>
      <table className="courcechild rounded-lg">
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
                !mapTeachers.isDeleted ?(
                <tr className="border" key={mapTeachers.courceId}>
                  <td className="py-4 px-3">{mapTeachers.courceId}</td>
                  <td className="py-4 px-3">{mapTeachers.title}</td>
                  {/* <td className="py-4 px-3">{mapTeachers.Shortdescription}</td> */}
                  <td className="py-4 px-3">${mapTeachers.price}</td>
                  {/* <td className="py-4 px-3">{mapTeachers.id}</td> */}
                  {/* <td className="py-4 px-3">{mapTeachers.CategoryId}</td> */}
                  <td className="py-4 px-3">
                    <img src={mapTeachers.imageUrl} alt="" />
                  </td>
                  <td className="py-4 px-3">
                    {mapTeachers.isPublished ? <p>comfirmed</p> : <p>unconfirm</p>}
                  </td>
                  <td className="py-4 px-3">
                    {dayjs(mapTeachers.createdAt).format("DD/MM/YYYY")}
                  </td>
                  <td className="py-4 px-3">
                    {dayjs(mapTeachers.UpadatedAt).format("DD/MM/YYYY")}
                  </td>

                  <td className="btnscource">
                    <button className="bg-orange-500 px-4 rounded py-1 mx-2 text-white">
                      <Link to={`update/${mapTeachers.courceId}`}>
                        Edit
                      </Link>
                    </button> <br />
                    <button
                      className="bg-blue-600 text-white px-2 py-1 mx-2 rounded mt-2"
                      onClick={() => handleOpenDeleteDialog(mapTeachers.courceId)}
                    >
                      Delete
                    </button> <br />
                    <button
                      className=""
                      onClick={() => handlepublish(mapTeachers.courceId)}
                    >
                      {mapTeachers.isPublished ? '' : "Publish"}
                    </button> <br />
                    <button className="rounded text-white px-1 py-1 mx-2 bg-black">
                      <Link to={`details/${mapTeachers.courceId}`}>Details</Link>
                    </button>
                  </td>
                </tr>
              ):null))}
        </tbody>
      </table>
      <Dialog open={open} onClose={handleclose}>
        <DialogActions>
          <span style={{}} onClick={handleclose}>
            <Close />
          </span>
        </DialogActions>
        <CreateCoursePage />
      </Dialog>
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
  <div className="bg-white rounded-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this cource?</h3>
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