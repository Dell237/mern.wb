import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { userLogged } from "./apiSlice";

const url = "http://localhost:5000/api/v1";
// axios.defaults.withCredentials = true;
export const createDeal = createAsyncThunk(
  "deals/create",

  async ({ headline, preis, link, selectedFile }, thunkAPI) => {
    try {
      await userLogged();
      const resp = await axios.post(`${url}/all`, {
        headline,
        preis,
        link,
        selectedFile,
      });

      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const getDeals = createAsyncThunk("deals/getDeals", async () => {
  try {
    const resp = await axios.get(`${url}/getDeals`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});
export const likeDeal = createAsyncThunk("deals/Like", async (id, thunkAPI) => {
  try {
    await userLogged();
    const resp = await axios.patch(`${url}/all/${id}/likeDeal`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});

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
        const { payload } = action;
        state.dealItem = [...state.dealItem, payload];
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getDeals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDeals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.dealItem = action.payload;
      })
      .addCase(getDeals.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeDeal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeDeal.fulfilled, (state, action) => {
        state.isLoading = false;

        state.dealItem.map((deal) =>
          deal._id === action.payload._id ? action.payload : deal
        );
      })
      .addCase(likeDeal.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default dealSlice.reducer;
