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
    Title:string
    Description:string
    oflinecourceId:any;
}
export const CreatesubcourceFn=createAsyncThunk(
    '/create/cource',
    async(data:Respnsedata,{rejectWithValue})=>{
    try {
        const res=axios.post('http://localhost:5000/api/subcource/new',data)
        alert('Saved Successfully')
    } catch (error) {
        if(error instanceof AxiosError){
            return {
                message:"Something went wrong please contact the adminstration"
            }
        }
    }
    }
)
const CreateOflineSubcourceSlice=createSlice({
    initialState,
    name:'CreateofliSubceource',
    reducers:{

    }
})
export default CreateOflineSubcourceSlice