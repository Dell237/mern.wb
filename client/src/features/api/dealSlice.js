import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { apiPrivat } from "../../api/axios";

export const createDeal = createAsyncThunk(
  "deals/create",

  async ({ headline, preis, link, message, selectedFile }, thunkAPI) => {
    try {
      const resp = await apiPrivat.post(`/all`, {
        headline,
        preis,
        link,
        message,
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
    const resp = await axios.get(`/getDeals`);
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue("something went wrong");
  }
});
export const likeDeal = createAsyncThunk(
  "deals/Like",
  async ({ dealId, userId }, thunkAPI) => {
    try {
      const resp = await apiPrivat.post(`/all/likeDeal`, { dealId, userId });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "Benutzer hat bereits auf den Beitrag geklickt."
      );
    }
  }
);

export const getLikedDeals = createAsyncThunk(
  "deals/LikedDeals",
  async ({ userId }, thunkAPI) => {
    try {
      const resp = await apiPrivat.get(`/all/liked-deals/${userId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Benutzer hat Keins Likes .");
    }
  }
);
export const getPostsBySearch = createAsyncThunk(
  "deals/search",
  async ({ searchQuery }, thunkAPI) => {
    try {
      const { data } = await axios.get(`/search?searchQuery=${searchQuery}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Ergebnisse: 0");
    }
  }
);
export const disLikeDeals = createAsyncThunk(
  "deal/dislike",
  async ({ userId, dealId }) => {
    try {
      const { data } = await apiPrivat.delete(
        `/all/disliked/${userId}/${dealId}`
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue("Fehler");
    }
  }
);
export const getAllUserDeal = createAsyncThunk("deal/UserDeals", async () => {
  try {
    const { data } = await apiPrivat.get(`/all/deals`);
    return data;
  } catch (error) {
    return console.log(error);
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
      .addCase(getDeals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dealItem = payload;
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
      })
      .addCase(getLikedDeals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getLikedDeals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getLikedDeals.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getPostsBySearch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPostsBySearch.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dealItem = payload.data;
      })

      .addCase(getPostsBySearch.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(disLikeDeals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(disLikeDeals.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.dealItem = payload.data;
      })

      .addCase(disLikeDeals.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getAllUserDeal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUserDeal.fulfilled, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(getAllUserDeal.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export default dealSlice.reducer;
