import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import { getAllCategoryFn } from "../../../../redux/Slices/Dashboard/Category/GetAllCategories";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import  './CategoryList.css'
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, ButtonBase } from '@mui/material';
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Restore, RestoreFromTrash } from '@mui/icons-material';
import { createCategoryData } from "../../../../redux/Slices/Dashboard/News/CreateNews";
import { createCategoryFn, resetCategoryState } from "../../../../redux/Slices/Dashboard/Category/CreateCategory";
import { FaBackward } from "react-icons/fa";
interface FormPopupProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

 const Recycleonlinecategory = () => {
  const [showWARNING,SETshowwarning]=useState(false)
   const openwarning=()=>{
    SETshowwarning(true)
   }
   const closewarning=()=>{
    SETshowwarning(false)
   }
  const allCategoryState = useSelector((state: RootState) => state.getAllCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
 
  const[editid,seteditid]=useState(-1)
  
  
  const[data,setdata]=useState([])
  const[catName,setCatName]=useState('')
  const[catDescription,setcatDescription]=useState('')
  const [opendailog,setopendailog]=useState(false)
  const [deleteItemId,setDeleteItemId]=useState(null);
  const handleopenandclosedailog=(itemId:any)=>{
    setopendailog(!opendailog)
    setDeleteItemId(itemId)
  }

  useEffect(() => {
    dispatch(getAllCategoryFn());
  }, []);

  const keys = ['id', 'Name', 'Description', 'Created At','Actions'];

  const handleDelete = (catId: any) => {
    axios.delete('http://localhost:2000/api/category/delete/' + catId)
    dispatch(getAllCategoryFn());
    navigate('/dashboard/categories')
  };
  const handlerestore = (catId: any) => {
    axios.put('http://localhost:2000/api/category/recycle/' + catId)
   navigate(`/dashboard/categories`)
  };
  const handledeletecategory = (catId: any) =>{
    axios.delete('http://localhost:2000/api/category/delete/' + catId)
     location.reload()
  };

  const searching = (data: any) => {
    return data.filter((item:any) =>
      item.catName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

const toastId = 'createcategory';
const [open, setOpen] = useState(false);


const createCategoryState = useSelector(
  (state: RootState) => state.createcatogrySlice
);


const handleSubmit = (e: FormEvent) => {
  e.preventDefault();
  const data: any = {
    catName,
    catDescription,
  };
  if (!catName || !catDescription) {
    return toast.error('Please provide valid data', { id: toastId });
  }
  dispatch(createCategoryFn(data)).then(()=>{
    location.reload()
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
    <div className="parentcategory my-8 border shadow-[0_3px_30px_rgb(0,0,0,0.2)]">
      <div className="categ">
      </div>
      <div className="flex justify-between">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by category name"
      />
         <Link to={`/dashboard/categories`}><p style={{cursor:'pointer',fontSize:"30px",}} className="mr-2"><FaBackward/></p></Link>
      </div>
<table className="w-full border">
  <thead>
    <tr>
      {keys.map((keyItem, idx) => (
        <th className="py-2 px-4 border bg-200 text-gray-700" key={idx}>
          {keyItem}
        </th>
      ))}
    </tr>
  </thead>

  <tbody>
    {searching(allCategoryState.data).map((catItem: any) => (
      catItem.isDeleted ? (
        catItem.catId == editid ? (
          <tr className="border" key={catItem.catId}>
            <td className="py-2 px-4 border">
              <input
                className="py-1 px-2 text-yellow-500 bg-blue-500 focus:outline-none"
                onChange={(e) => setCatName(e.target.value)}
                type="text"
                value={catName}
              />
            </td>
            <td className="py-2 px-4 border">
              <input
                className="py-1 px-2 text-yellow-500 bg-blue-500 focus:outline-none"
                onChange={(e) => setcatDescription(e.target.value)}
                type="text"
                value={catDescription}
              />
            </td>
         
          </tr>
        ) : (
          <tr className="border" key={catItem.catId}>
            <td className="py-2 px-4 border">{catItem.catId}</td>
            <td className="py-2 px-4 border">{catItem.catName}</td>
            <td className="py-2 px-4 border">{catItem.catDescription}</td>
            <td className="py-2 px-4 border">
              {dayjs(catItem.createdAt).format("DD/MM/YYYY")}
            </td>
            <td className="grid py-2 px-4 border">
              <button
                className="text-blue-700 hover:text-blue-500 focus:outline-none"
                onClick={() => handlerestore(catItem.catId)}
              >
                <Restore/>
              
              </button>
              <button className="text-red-500" onClick={()=>handleopenandclosedailog(catItem.catId)}>
                <Delete/>
              </button>
            </td>
          </tr>
        )
      ) : null
    ))}
  </tbody>
</table>

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
export default Recycleonlinecategory