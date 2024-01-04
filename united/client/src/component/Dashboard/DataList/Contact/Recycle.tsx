import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { useSelector } from "react-redux";
import { getAllContactFn } from "../../../../redux/Slices/Dashboard/Contact/Getallcontact";
import {
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Delete, Recycling, Restore } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { FaBackward } from "react-icons/fa";
import './ContactList.css'
interface Contact {
  id: number;
  Name: any;
  email: any;
  message: any;
}

const Recylecontact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const allContacts = useSelector((state: RootState) => state.getAllContact);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  useEffect(() => {
    dispatch(getAllContactFn());
  }, []);

  const keys = ["id", "Name", "email", "Message", "Created At", "Actions"];

  const searching = (data: any) => {
    return data.filter((item: any) =>
      item.Name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDelete = (id: any) => {
    axios.delete(`http://localhost:5000/api/contact/delete/${id}`);
    dispatch(getAllContactFn());
    setOpenDeleteDialog(false)
    setDeleteItemId(null)
    navigate('/dashboard/contact')
  };
  const handlerestore = (id: any) => {
    axios.put(`http://localhost:5000/api/contact/restore/${id}`);
    dispatch(getAllContactFn());
    navigate('/dashboard/contact')
    
  };
const navigate=useNavigate()
  return (
    <div className="Contactcontiner p-4 w-full rounded-lg shadow-[0_3px_10px_rgb(0,0,0,0.2)]">

<div className="flex justify-between">
<input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className=" p-2 mb-4 border border-gray-300 rounded-md"
      />
   <Link to={'/dashboard/contact'}><FaBackward style={{ color: 'blue', fontSize: '40px' }} /></Link>

</div>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="bg-gray-100">
              {keys.map((keyItem, idx) => (
                <TableCell
                  key={idx}
                  className="px-4 py-2 border border-gray-500"
                >
                  {keyItem}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searching(allContacts.data).map((mapContact: any) => (
              mapContact.isDeleted ?   <TableRow key={mapContact.id} className="border">
              <TableCell className="px-4 py-2 border border-gray-500">
                {mapContact.id}
              </TableCell>
              <TableCell className="px-4 py-2 border border-gray-500">
                {mapContact.Name}
              </TableCell>
              <TableCell className="px-4 py-2 border border-gray-500">
                {mapContact.email}
              </TableCell>
              <TableCell className="px-4 py-2 border border-gray-500">
                {mapContact.message}
              </TableCell>
              <TableCell className="px-4 py-2 border border-gray-500">
                {dayjs(mapContact.createdAt).format("DD/MM/YYYY")}
              </TableCell>
              <TableCell className="px-4 py-2 border border-gray-500">
                <button
                  onClick={() => handleOpenDeleteDialog(mapContact.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Delete />
                </button>
                <button
                  onClick={() => handlerestore(mapContact.id)}
                  className="text-green-500 hover:text-blue-700"
                >
                  <Restore/>
                </button>
              </TableCell>
            </TableRow>:null
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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

export default Recylecontact;