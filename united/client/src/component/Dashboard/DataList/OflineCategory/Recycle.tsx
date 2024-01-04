import { FormEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../redux/store";
import axios from "axios";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// import  './OflineCategoryList.css'
import { toast } from 'react-hot-toast';
import {  useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, ButtonBase } from '@mui/material';
import { Close as CloseIcon, Delete, Edit, Add as OpenIcon, Restore } from '@mui/icons-material';
import { getAllOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/GetAllOflineCategories";
import { createOflineCategoryFn } from "../../../../redux/Slices/Dashboard/OflineCategory/CreateOflineCategory";
import { BiRecycle } from "react-icons/bi";
import { FaBackward } from "react-icons/fa";
interface FormPopupProps {
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

 const OflineCategoryRestore = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [catItemId, setCatItemId] = useState('');

  const openWarningDialog = (catId:any) => {
    setCatItemId(catId);
    setShowWarning(true);
  };

  const closeWarningDialog = () => {
    setShowWarning(false);
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
    axios.delete('http://localhost:5000/api/OflineCategory/delete/'+OflineCatId)
    setCatItemId('');
    setShowWarning(false);
    dispatch(getAllOflineCategoryFn());
  };
  const handlerestore = (OflineCatId: any) => {
    axios.put('http://localhost:5000/api/OflineCategory/retore/'+OflineCatId)
    dispatch(getAllOflineCategoryFn());
  };

  const searching = (data: any) => {
    return data.filter((item:any) =>
      item.OflineCatName.toLowerCase().includes(searchQuery.toLowerCase())
    );
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
     
<div className="flex justify-between">
<input
      type="text"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      placeholder="Search by category name"
    />
 <Link to={'/dashboard/OflineCategory'}><FaBackward style={{ color: 'blue', fontSize: '40px' }} /></Link>

</div>
<div className="overflow-x-auto">
    <table className="OflinecategoryTable w-full">
      <tr>
        {keys.map((keyItem, idx) => (
          <th key={idx}>{keyItem}</th>
        ))}
      </tr>

      <tbody>
        {searching(allOflineCategoryState.data).map((catItem:any) => (
        catItem.catId==editid ? 
      <tr>
        <td>{catItem.catId}</td>
        <td><input style={{color:'yellow',background:'blue'}} onChange={(e)=>setOflineCatName(e.target.value)}  type="text" value={OflineCatName}/></td>
        <td><input style={{color:'yellow',background:'blue'}} onChange={(e)=>setoflineCatDescription(e.target.value)}  type="text" value={oflineCatDescription}/></td>
        <td><button onClick={handleupdate}>Update</button></td>
      </tr>:
       catItem.isDeleted &&   <tr className="border" key={catItem.catId}>
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
        <button onClick={()=>handlerestore(catItem.OflineCatId)}><Restore/></button>
        {/* Delete button */}
        <button onClick={() => openWarningDialog(catItem.OflineCatId)}>
             <Delete />
           </button>
       </td>
     </tr>
        ))}
      </tbody>
    </table>
    </div>
    <Dialog open={showWarning} onClose={closeWarningDialog}>
        <DialogTitle>Warning</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this ofline categry ?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeWarningDialog}>Cancel</Button>
          <Button onClick={() => handleDelete(catItemId)}>Confirm</Button>
        </DialogActions>
      </Dialog>
  </div>
  );
};
export default OflineCategoryRestore;
