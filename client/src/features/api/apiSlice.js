import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1/auth";
export const regUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const resp = await axios.post(`${url}/register`, {
        username,
        email,
        password,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);
export const userLogged = () => {
  let authToken = localStorage.getItem("jwt");
  if (authToken === null) {
    axios.defaults.headers.common.Authorization = null;
  } else {
    axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
  }
};
export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      await userLogged();
      const resp = await axios.post(`${url}/login`, { email, password });
      localStorage.setItem("jwt", resp.data.token);

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong, Please check your email and password!"
      );
    }
  }
);
const initialState = {
  user: null,
  isLoading: false,
};
export const apiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerUser: (state, action) => {
      console.log(action);
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(regUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(regUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(regUser.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        console.log(action);
        state.isLoading = false;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.log(action);
        state.isLoading = false;
      });
  },
});
export const { registerUser } = apiSlice.actions;
export default apiSlice.reducer;
