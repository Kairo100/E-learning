import React, { useEffect, useState } from "react";
import axios from "axios";
import './Payment.css'
import { Delete, Restore } from "@mui/icons-material";
import dayjs from "dayjs";
import { Dialog } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { FaBackward } from "react-icons/fa";

interface Data {
  id: number;
  amount: number;
  status: string;
  token: string;
  enrolmentId: number;
  createdAt: any;
  isDeleted: boolean;
}

const Restorepayment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<Data[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemId, setItemId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleOpenDialog = (deleteItemId: number) => {
    setItemId(deleteItemId);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Data[]>("http://localhost:5000/api/payment/get/all");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/payment/delete/${id}`);
    fetchData();
    setItemId(null);
    setOpenDialog(false);
    navigate('/dashboard/payment');
  };

  const handleRestore = async (id: number) => {
    await axios.put(`http://localhost:5000/api/payment/restore/${id}`);
    fetchData();
    setItemId(null);
    setOpenDialog(false);
    navigate('/dashboard/payment');
  };

  const fetchData = async () => {
    try {
      const response = await axios.get<Data[]>("http://localhost:5000/api/payment/get/all");
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((item) =>
    dayjs(item.createdAt).format("DD/MM/YYYY").includes(searchQuery)
  );

  return (
    <div className="paymentlist mx-4 overflow-x-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-2 rounded-md my-8 p-2">
      <div className="flex justify-between">
      <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by date..."
        />
        <Link className="mr-2 " style={{ fontSize: '30px' }} to={'/dashboard/payment'}><FaBackward /></Link>
      </div>
      <div className="">

        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-50">
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Enrolment ID</th>
              <th className="py-2 px-4 border-b">Pay Date</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              item.isDeleted && (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{item.id}</td>
                  <td className="py-2 px-4 border-b">{item.amount}</td>
                  <td className="py-2 px-4 border-b">{item.status}</td>
                  <td className="py-2 px-4 border-b">{item.enrolmentId}</td>
                  <td className="py-2 px-4 border-b">{dayjs(item.createdAt).format('DD/MM/YYYY')}</td>
                  <td className="py-2 px-4 border-b">
                    <button style={{ color: 'red', fontSize: '39px' }} onClick={() => handleOpenDialog(item.id)}>
                      <Delete />
                    </button> <br/>
                    <button style={{ color: 'blue' }} onClick={() => handleRestore(item.id)}>
                      <Restore />
                    </button>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-lg font-semibold">Are you sure you want to delete this payment?</h3> <br />
          <p className="mb-4"><span className="text-blue-600 ">Note:</span> if you delete, you will never be able to restore it.</p>
          <div className="flex justify-end">
            <button
              className="mr-2 px-4 py-2 text-gray-500 hover:text-gray-700 font-medium rounded-md border border-gray-300 hover:border-gray-500"
              onClick={handleCloseDialog}
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

export default Restorepayment;