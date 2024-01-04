import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Delete, Restore } from '@mui/icons-material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { BiRecycle } from 'react-icons/bi';
import  './getallrequest.css'
interface Request {
  Requstpaymentid: number;
  chanel: string;
  Description: string;
  Amount: number;
  isDeleted: boolean;
  isAccepted:Boolean;
  courceId: number;
  AccountNumber: string;
  id: number;
}

const RequestListAccepted: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [requestToDelete, setRequestToDelete] = useState<Request | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('http://localhost:2000/api/Request/get/all');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  const handleDelete = async (request: Request) => {
    setRequestToDelete(request);
    setDeleteConfirmationOpen(true);
  };

  const handlereject = async (request: Request) => {
    try {
      await axios.put(`http://localhost:2000/api/Request/unconfirm/${request.id}`);
      setRequests((prevRequests) =>
        prevRequests.map((prevRequest) =>
          prevRequest.id === request.id ? { ...prevRequest, isAccepted: false } : prevRequest
        )
      );
    } catch (error) {
      console.error('Error rejecting request:', error);
    }
  };
  const confirmDelete = async () => {
    if (!requestToDelete) {
      return;
    }

    try {
      await axios.delete(`http://localhost:2000/api/request/delete/${requestToDelete.Requstpaymentid}`);
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.Requstpaymentid === requestToDelete.Requstpaymentid
            ? { ...request, isDeleted: true }
            : request
        )
      );
    } catch (error) {
      console.error('Error deleting request:', error);
    }

    setRequestToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const cancelDelete = () => {
    setRequestToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const filteredRequests = requests.filter((request) =>
    request.chanel.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='RequestlistAcceptedcontiner  shadow-[0_3px_10px_rgb(0,0,0,0.2)] w-full my-8 mx-4 p-4 rounded-lg overflow-x-auto'>
      {/* <h1>Request List</h1> */}
      <div className='mb-4 flex justify-between items-center'>
        <input
          type='text'
          placeholder='Search by Channel'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='border border-gray-500 px-4 py-2'
        />
        {/* <Link to={`recycle`}><p style={{cursor:'pointer',fontSize:"40px"}}><BiRecycle/></p></Link> */}
      </div>
      <table className='w-full'>
        <thead>
          <tr>
            <th className='border border-gray-500 px-4 py-2'>id</th>
            <th className='border border-gray-500 px-4 py-2'>Channel</th>
            <th className='border border-gray-500 px-4 py-2'>Description</th>
            <th className='border border-gray-500 px-4 py-2'>Amount</th>
            <th className='border border-gray-500 px-4 py-2'>Course ID</th>
            <th className='border border-gray-500 px-4 py-2'>Account Number</th>
            <th className='border border-gray-500 px-4 py-2'>ID</th>
            <th className='border border-gray-500 px-4 py-2'>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            !request.isDeleted &&request.isAccepted && (
              <tr key={request.Requstpaymentid}>
                <td className='border border-gray-500 px-4 py-2'>{request.Requstpaymentid}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.chanel}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.Description}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.Amount}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.courceId}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.AccountNumber}</td>
                <td className='border border-gray-500 px-4 py-2'>{request.id}</td>
                <td className='border block border-gray-500 px-4 py-2'>
                  <button onClick={() => handleDelete(request)}>
                    <Delete />
                  </button>

                </td>
              </tr>
            )
          ))}
        </tbody>
      </table>

      <Dialog open={deleteConfirmationOpen} onClose={cancelDelete} className="fixed inset-0 flex items-center justify-center z-50">
  <div className="bg-white rounded-lg shadow-lg p-8">
    <DialogTitle className="text-xl font-bold mb-4">Delete Request</DialogTitle>
    <DialogContent>
      <p className="text-gray-700">Are you sure you want to delete this request?</p>
    </DialogContent>
    <DialogActions className="flex justify-end mt-6">
      <button onClick={cancelDelete} className="mr-4 px-8 py-2 rounded-lg bg-purple-400 text-white">Cancel</button>
      <button onClick={confirmDelete} className="px-8 py-2 rounded-lg bg-red-500 text-white">Delete</button>
    </DialogActions>
  </div>
</Dialog>
    </div>
  );
};

export default RequestListAccepted;