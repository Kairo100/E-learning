import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';
import { getAllTeacherFn } from '../Teacher/GetAllTeacher';

interface teachercourceResponse {
  isSuccess: boolean;
  result: teachercource[];
}

interface teachercource {
  teachercourceId: any;
  imageUrl: string;
  catDescription: string;
  courceId:number;
  videoUrl: string;
  createdAt: string;
  updatedAt: string;
  isDeleted: false;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as teachercource[],
};

// extra reducer via createasynthunk

export const GetallteachercourceFn = createAsyncThunk(
  'getall/teachercource',
  async (courceId, { rejectWithValue }) => {
    try {
      var res = await axios.get<teachercourceResponse>(`http://localhost:5000/api/user/get/teachercource/${courceId}`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const GetallcourceTeacherslice = createSlice({
  // name
  name: 'getall/teachercource',

  // initialState
  initialState,
  // reducers

  reducers: {},

});
