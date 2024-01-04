import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosError } from "axios"




const initialState={
    isLoading:false,
    isError:false,
    errorMsg:'',
    data:[],
    isSuccuss:false
}
interface Respnsedata{
    OflineCategoryId:any;
    shift:any;
    teacherId:any;
    Description:any;
    Name:any;
}
export const CreateCourceOflinefn=createAsyncThunk(
    '/create/cource',
    async(data:any,{rejectWithValue})=>{
    try {
        const res=axios.post('http://localhost:5000/api/oflinecource/new',data)
    .then((loc)=>{
        location.reload()
    })
    } catch (error) {
        if(error instanceof AxiosError){
            return {
                message:"Something went wrong please contact the adminstration"
            }
        }
    }
    }
)
const Createoflincource=createSlice({
    initialState,
    name:'Createofliceource',
    reducers:{

    }
})
export default Createoflincource