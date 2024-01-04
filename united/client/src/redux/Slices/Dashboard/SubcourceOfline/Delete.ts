import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const DeleteOflineFn=createAsyncThunk(
    '/delete/id',
    async(id:Number,{})=>{
        try {
            const res =await axios.delete(`http://localhost:5000/api/oflinecource/delete/${id}`)
            .then((response)=>{
                alert('Deleted successfully')
                location.reload()
            })
        } catch (error) {
            
        }
    }
)