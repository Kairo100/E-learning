import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Url, errorMsg } from '../../../../interfaces';


interface UserLoginData {
  username: string;
  givenName: string;
  joinedAt: string;
  isAdmin:boolean
  token: string;
}

const initialState = {
  data: {},
  isLoading: false,
  isError: false,
  isSuccess: false,
  errorMsg: '',
};

export const LoginFn = createAsyncThunk(
  'user/login',
  async (data: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`http://localhost:2000/api/user/login`, data);
      return res.data;
    } catch (error) {
      if (error instanceof AxiosError)
        return rejectWithValue(error.response?.data.message || errorMsg);

      return rejectWithValue(errorMsg);
    }
  }
);

export const LoginSlice = createSlice({
  // name
  name: 'login',
  // reducers
  reducers: {
    reset: () => initialState,
  },
  // initialState
  initialState,
  //   extra reducers

  extraReducers: (builder) => {
    // case - pending
    builder.addCase(LoginFn.pending, () => ({
      ...initialState,
      isLoading: true,
    }));

    // case - fullfilled
    builder.addCase(LoginFn.fulfilled, (_, action) => ({
      ...initialState,
      data: action.payload,
      isSuccess: true,
    }));

    // case - rejected

    builder.addCase(LoginFn.rejected, (_, action) => ({
      ...initialState,
      isError: true,
      errorMsg: String(action.payload),
    }));
  },
});

export const { reset } = LoginSlice.actions;
