import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';

export interface createStudentData {
  Name:string
  email:string  
  phone:string
  Amount:number
}

const initialState = {
  data: {} as createStudentData,
  isSuccess: false,
  isError: false,
  isLoading: false,
  errorMsg: '',
};

// async thunk

export const createStudentFn = createAsyncThunk(
  'create/Student',
  async (data: createStudentData, { rejectWithValue }) => {
    try {
      const token = JSON.parse(localStorage.getItem('userInfo')!).token;
      const res = await axios.post('http://localhost:5000/api/student/create', data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data.result;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message ||errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

// slice

export const createstudentSlice = createSlice({
  // name
  name: 'create/Student',
  reducers: {
    resetStudentState: () => initialState,
  },
  initialState,
  extraReducers(builder) {
    // pending
    builder.addCase(createStudentFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // fulfilled

    builder.addCase(createStudentFn.fulfilled, (_, action) => ({
      ...initialState,
      isSuccess: true,
      data: action.payload,
    }));

    // rejected

    builder.addCase(createStudentFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export const { resetStudentState } = createstudentSlice.actions;
