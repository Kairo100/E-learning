import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import  './oflinecategory.css'
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, ButtonBase } from '@mui/material';
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Recycling, Restore } from '@mui/icons-material';
import { getAllOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/GetAllOflineCategories";
import { createOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/CreateOflineCategory";
import { BiRecycle } from "react-icons/bi";
interface FormPopupProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

 const OflineCategoryList = () => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  const handleOpenDeleteDialog = (itemId:any) => {
    setDeleteItemId(itemId);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

   
  const allOflineCategoryState = useSelector((state: RootState) => state.getalloflineCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
 
  const[editid,seteditid]=useState(-1)
  
  
  const[data,setdata]=useState([])
  const[OflineCatName,setOflineCatName]=useState('')
  const[oflineCatDescription,setoflineCatDescription]=useState('')
  
  useEffect(() => {
    dispatch(getAllOflineCategoryFn());
  }, []);

  const keys = ['id', 'OflineCategoryName', 'OflineCategoryDescription', 'Created At','Upadated At', 'Actions'];

  const handleDelete = (OflineCatId: any) => {
    axios.put('http://localhost:5000/api/OflineCategory/trash/'+OflineCatId)
    dispatch(getAllOflineCategoryFn())
    setOpenDeleteDialog(false)
    setDeleteItemId(null)
  };

  const searching = (data: any) => {
    return data.filter((item:any) =>
      item.OflineCatName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
const handleedit=(OflineCatId:any)=>{
seteditid(OflineCatId)
axios.get('http://localhost:5000/api/OflineCategory/get/one/'+OflineCatId)
.then(res=>{
  setOflineCatName(res.data.OflineCatName)
  setoflineCatDescription(res.data.oflineCatDescription)
console.log(res.data)
})

}
const handleupdate=()=>{
  axios.put('http://localhost:5000/api/OflineCategory/edit/'+editid,{OflineCatId:editid,OflineCatName:OflineCatName,oflineCatDescription:oflineCatDescription})
  .then((res) => {
    location.reload();
    seteditid(-1)
  });
}
//creating
const toastId = 'createOflineCategory';
const [open, setOpen] = useState(false);


const createOflineCategoryState = useSelector(
  (state: RootState) => state.createcatogrySlice
);


const handleSubmit = (e: FormEvent) => {

  const data: any = {
    OflineCatName,
    oflineCatDescription,
  };
  if (!OflineCatName || !oflineCatDescription) {
    return toast.error('Please provide valid data', { id: toastId });
  }
  dispatch(createOflineCategoryFn(data)).then(()=>{
    location.reload()
    // console.log(createOflineCategoryFn.)
  }).catch((err)=>{
    console.log(err)
  });
};

const navigate = useNavigate();
const handleClose=()=>{
  setOpen(false)
}
const handleOpen=()=>{
  setOpen(true)
}


  return (
    <div className="Oflinecategorylist p-4 shadow-[0_3px_10px_rgb(0,0,0,0.2)] m-4 p-2 rounded-lg">
    <div className="categ">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by category name"
      />
      <div className="flex gap-4">
        <Link to={'recycle'}>
          <Recycling className="text-blue-500 text-2xl" />
        </Link>
        <button className="add" type="button" onClick={handleOpen}>
          <OpenIcon />
        </button>
      </div>
    </div>
  
    <div className="overflow-x-auto">
      <table className="OflinecategoryTable w-full">
        <thead>
          <tr>
            {keys.map((keyItem, idx) => (
              <th key={idx}>{keyItem}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {searching(allOflineCategoryState.data).map((catItem:any) => (
            catItem.catId == editid ? (
              <tr key={catItem.catId}>
                <td>{catItem.catId}</td>
                <td>
                  <input
                    style={{ color: 'yellow', background: 'blue' }}
                    onChange={(e) => setOflineCatName(e.target.value)}
                    type="text"
                    value={OflineCatName}
                  />
                </td>
                <td>
                  <input
                    style={{ color: 'yellow', background: 'blue' }}
                    onChange={(e) => setoflineCatDescription(e.target.value)}
                    type="text"
                    value={oflineCatDescription}
                  />
                </td>
                <td>
                  <button onClick={handleupdate}>Update</button>
                </td>
              </tr>
            ) : (
              !catItem.isDeleted && (
                <tr className="border" key={catItem.catId}>
                  <td className="tdcategory">{catItem.OflineCatId}</td>
                  <td className="tdcategory">{catItem.OflineCatName}</td>
                  <td className="tdcategory">{catItem.oflineCatDescription}</td>
                  <td className="tdcategory">
                    {dayjs(catItem.createdAt).format('DD/MM /YYYY')}
                  </td>
                  <td className="tdcategory">
                    {dayjs(catItem.UpadatedAt).format('DD/MM /YYYY')}
                  </td>
                  <td className="grid">
                    <button className="">
                      <Link to={`update/${catItem.OflineCatId}`}>
                        <Edit />
                      </Link>
                    </button>
                    <button
                      className=""
                      onClick={() => handleOpenDeleteDialog(catItem.OflineCatId)}
                    >
                      <Delete />
                    </button>
                  </td>
                </tr>
              )
            )
          ))}
        </tbody>
      </table>
    </div>
  
    <Dialog open={open} onClose={handleClose}>
      <div className="pare">
        <form onSubmit={handleSubmit} className="p-8">
          <div className="flex justify-between items-center mb-4">
            <p>Register category</p>
            <p
              className="text-gray-500 cursor-pointer"
              onClick={handleDelete}
            >
              <CloseIcon />
            </p>
          </div>
          <div className="input-group mb-4">
            <TextField
              fullWidth
              label="Category Name"
              name="Category Name"
              className="input-field"
              type="text"
              placeholder="Category Name"
              value={OflineCatName}
              onChange={(e) => setOflineCatName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <TextField
              fullWidth
              label="Category Description"
              name="Category Description"
              type="text"
              placeholder="Category Description"
              value={oflineCatDescription}
              onChange={(e) => setoflineCatDescription(e.target.value)}
            />
          </div>
          <div className="btns-category mt-4">
            <ButtonBase
              className="svbtn"
              type="submit"
              disabled={createOflineCategoryState.isLoading}
              style={{ width: '100%', backgroundColor: 'green' }}
            >
              {createOflineCategoryState.isLoading ? 'Loading...' : 'Save'}
            </ButtonBase>
          </div>
        </form>
      </div>
    </Dialog>
  
    <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
      <div className="bgwhite rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">
          Are you sure you want to delete this item?
        </h3>
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
export default OflineCategoryList
