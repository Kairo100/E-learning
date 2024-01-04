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
import { Add, Close as CloseIcon, Delete, Edit, Add as OpenIcon } from '@mui/icons-material';
import { createCategoryData } from "../../../../redux/Slices/Dashboard/News/CreateNews";
import { createCategoryFn, resetCategoryState } from "../../../../redux/Slices/Dashboard/Category/CreateCategory";
import { BiRecycle } from "react-icons/bi";
interface FormPopupProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

 const CategoryList = () => {
  const [showWARNING,SETshowwarning]=useState(false)
   const openwarning=()=>{
    SETshowwarning(true)
   }
   const closewarning=()=>{
    SETshowwarning(false)
   }
   const [opendailog,setopendailog]=useState(false)
   const [deleteItemId,setDeleteItemId]=useState(null);
   const handleopenandclosedailog=(itemId:any)=>{
     setopendailog(!opendailog)
     setDeleteItemId(itemId)
   }
  
  const allCategoryState = useSelector((state: RootState) => state.getAllCategory);
  const dispatch = useDispatch<AppDispatch>();
  const [searchQuery, setSearchQuery] = useState('');
 
  const[editid,seteditid]=useState(-1)
  
  
  const[data,setdata]=useState([])
  const[catName,setCatName]=useState('')
  const[catDescription,setcatDescription]=useState('')
  
  useEffect(() => {
    dispatch(getAllCategoryFn());
  }, []);

  const keys = ['id', 'Name', 'Description', 'Created At','Upadated At', 'Actions'];

  const handleDelete = (catId: any) => {
    axios.put('http://localhost:2000/api/category/trash/' + catId)
   navigate('/dashboard/categories/recycle')
  };

  const searching = (data: any) => {
    return data.filter((item:any) =>
      item.catName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
const handleedit=(catId:any)=>{
seteditid(catId)
axios.get('http://localhost:2000/api/category/get/one/'+catId)
.then(res=>{
  setCatName(res.data.catName)
  setcatDescription(res.data.catDescription)
console.log(res.data)
})

}
const handleupdate=()=>{
  axios.put('http://localhost:2000/api/category/edit/'+editid,{catId:editid,catName:catName,catDescription:catDescription})
  .then((res) => {
    location.reload();
    seteditid(-1)
  });
}
//creating
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
    <div className="parentcategory my-8 ml-4 p-4 shadow-[0_3px_30px_rgb(0,0,0,0.2)]">
      <div className="flex justify-between">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by category name"
      />
      <span className="flex items-center gap-4">
      <Link  to={`recycle`}><button style={{cursor:'pointer',fontSize:'20px'}} className="hover:bg-black text-white rounded py-2 px-4 bg-black" ><BiRecycle/></button></Link>
      <button style={{cursor:'pointer',fontSize:'20px'}}  className="bg-black hover:bg-black py-1 text-white rounded px-2" type="button" onClick={handleOpen}>
        <Add/>
        </button>
      </span>
      
      </div>

   

<table className="categorychild rounded-md">
  <tr>
    {keys.map((keyItem, idx) => (
      <th key={idx}>{keyItem}</th>
    ))}
  </tr>

  <tbody>
    {searching(allCategoryState.data).map((catItem: any) => (
      !catItem.isDeleted ? (
        catItem.catId == editid ? (
          <tr>
            <td>{catItem.catId}</td>
            <td>
              <input
                style={{ color: "yellow", background: "blue" }}
                onChange={(e) => setCatName(e.target.value)}
                type="text"
                value={catName}
              />
            </td>
            <td>
              <input
                style={{ color: "yellow", background: "blue" }}
                onChange={(e) => setcatDescription(e.target.value)}
                type="text"
                value={catDescription}
              />
            </td>
            <td>
              <button onClick={handleupdate}>Update</button>
            </td>
          </tr>
        ) : (
          <tr className="border" key={catItem.catId}>
            <td className="tdcategory border">{catItem.catId}</td>
            <td className="tdcategory border">{catItem.catName}</td>
            <td className="tdcategory border">{catItem.catDescription}</td>
            <td className="tdcategory border">
              {dayjs(catItem.createdAt).format("DD/MM /YYYY")}
            </td>
            <td className="tdcategory border">
              {dayjs(catItem.UpadatedAt).format("DD/MM /YYYY")}
            </td>
            <td className="grid">
              <button className="text-blue-400">
                <Link to={`update/${catItem.catId}`}>
                  <Edit />
                </Link>
                {/* <button onClick={()=>handleedit(catItem.catId)}>Edit</button> */}
              </button>
              <button
                className="text-red-400"
                onClick={() => handleopenandclosedailog(catItem.catId)}
              >
                <Delete />
              </button>
            </td>
          </tr>
        )
      ) : null
    ))}
  </tbody>
</table>

<Dialog open={open} onClose={handleClose}>
      <div className="pare bg-white p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">Register Category</p>
            <p className="text-gray-500 cursor-pointer" onClick={handleDelete}>
              <CloseIcon />
            </p>
          </div>
          <div className="input-group">
            <TextField
              fullWidth
              label="Category Name"
              name="Category Name"
              className="input-field"
              type="text"
              placeholder="Category Name"
              value={catName}
              onChange={(e) => setCatName(e.target.value)}
            />
          </div>
          <div className="input-group">
            <TextField
              fullWidth
              label="Category Description"
              name="Category Description"
              type="text"
              placeholder="Category Description"
              value={catDescription}
              onChange={(e) => setcatDescription(e.target.value)}
            />
          </div>
          <div className="btns-category">
            <Button
              type="submit"
              disabled={createCategoryState.isLoading}
              fullWidth
              style={{background:'black'}}
              variant="contained"
              // color="success"
            >
              {createCategoryState.isLoading ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
        <Dialog open={showWARNING} onClose={closewarning}>
          <div>
            <p>Warning ⚠️</p>
            <p>If you delete you can Never restore</p>
       
            <button>Cancel</button>
          </div>
        </Dialog>
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
export default CategoryList
