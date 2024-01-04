import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const DeleteOflineFn=createAsyncThunk(
    '/delete/id',
    async(id:Number,{})=>{
        try {
            const res =await axios.put(`http://localhost:5000/api/oflinecource/trash/${id}`)
             location.reload()
        } catch (error) {
            
        }
    }
)