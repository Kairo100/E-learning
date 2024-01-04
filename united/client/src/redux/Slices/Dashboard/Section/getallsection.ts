import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

interface SectionResponse {
  isSuccess: boolean;
  result: Section[];
}

interface Section {
    id:any,
    title: any,
    description:any;
    courseId:any
    
}

// initial state

const initialState = {
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
  data: [] as Section[],
};

// extra reducer via createasynthunk

export const getallsectionFn = createAsyncThunk(
  'getall/Section',
  async (_, { rejectWithValue }) => {
    try {
      var res = await axios.get<SectionResponse>(`http://localhost:5000/api/section/get/all`);
      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const getallsetionSlice = createSlice({
  // name
  name: 'getall/Section',

  // initialState
  initialState,
  // reducers

  reducers: {},

  // extrareducers
  extraReducers: (builder) => {
    // pending
    builder.addCase(getallsectionFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(getallsectionFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(getallsectionFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});
