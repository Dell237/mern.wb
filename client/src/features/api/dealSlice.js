import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLogged } from "./apiSlice";

const url = "http://localhost:5000/api/v1/all";
// axios.defaults.withCredentials = true;
export const createDeal = createAsyncThunk(
  "deals/create",

  async ({ headline, preis }, thunkAPI) => {
    try {
      await userLogged();
      const resp = await axios.post(url, { headline, preis });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

const initialState = {
  dealItem: [],
  isLoading: true,
};
export const dealSlice = createSlice({
  name: "deal",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createDeal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dealItem = action.payload;
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default dealSlice.reducer;
