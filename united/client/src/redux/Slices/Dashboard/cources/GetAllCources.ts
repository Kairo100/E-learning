import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface courceResponse {
  isSuccess: boolean;
  result: cource[];
}

interface cource {
  courceId: number;
 videoUrl:any;
  Name: string;
  price: number;
  TeacherId: number;
  isDeleted:Boolean;
  imageUrl:any;
  isPublished:Boolean;
  UpadatedAt:any;
  Shortdescription:String;
 content:String;
 title:String;
   id:any;
   createdAt:string;
    CategoryId:String;
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as cource[],
};

// extra reducer via createasynthunk

export const getAllcourceFn = createAsyncThunk(
  'getall/cource',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<courceResponse>('http://localhost:2000/api/cource/get/all');
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getAllcourceSlice = createSlice({
  // name
  name: 'getall/cource',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getAllcourceFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getAllcourceFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getAllcourceFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
