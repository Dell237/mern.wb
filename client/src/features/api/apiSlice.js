import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { apiPrivat } from "../../api/axios";

export const regUser = createAsyncThunk(
  "user/register",
  async ({ username, email, password }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `/auth/register`,
        JSON.stringify({
          username,
          email,
          password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong");
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      localStorage.setItem("jwt", resp.data.accessToken);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong, Please check your email and password!"
      );
    }
  }
);

export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    await axios.post(`/auth/logout`);
    localStorage.removeItem("jwt");
    return;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "something went wrong, you are not logged!"
    );
  }
});

export const ChangePassword = createAsyncThunk(
  "user/changePassword",

  async ({ userId, oldPassword, newPassword }, thunkAPI) => {
    try {
      const resp = await apiPrivat.post(`/auth/${userId}/updatePassword`, {
        oldPassword,
        newPassword,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);
export const updateUsername = createAsyncThunk(
  "user/updateUsername",
  async ({ userId, username }, thunkAPI) => {
    try {
      const resp = await apiPrivat.post(`/auth/${userId}/updateUsername`, {
        username,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);
export const updateProfileBild = createAsyncThunk(
  "user/updateProfileBild",
  async ({ userId, profileBild }, thunkAPI) => {
    try {
      const resp = await apiPrivat.post(`/auth/${userId}/updateProfileBild`, {
        profileBild,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "user/Forgot-Password",
  async ({ email }, thunkAPI) => {
    try {
      const resp = await axios.post(`/auth/forgotPassword`, {
        email,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);
export const resetPassword = createAsyncThunk(
  "user/Reset-Password",
  async ({ id, token, Password }, thunkAPI) => {
    try {
      const resp = await axios.post(
        `/auth/forgotPassword/${id}?token=${token}`,
        {
          Password,
        }
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);
export const checkSignUp = createAsyncThunk(
  "user/checkSignUp",
  async ({ id: userId, token }, thunkAPI) => {
    try {
      console.log({ userId, token });
      const { data } = await axios.post(
        `/auth/signup/${userId}?token=${token}`
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        "something went wrong, Please check your email and password!"
      );
    }
  }
);

export const deleteAccount = createAsyncThunk(
  "user/deleteAccount",
  async ({ userId }, thunkAPI) => {
    try {
      await apiPrivat.delete(`/auth/${userId}/delete`);
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!");
    }
  }
);

const initialState = {
  user: null,
  accessToken: null,
  isLoading: false,
  userId: null,
  status: "",
};
export const apiSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.accessToken = accessToken;
      state.userId = user.userId;
    },
    log_Out: (state, action) => {
      state.user = null;
      state.token = null;
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload.user;
        state.accessToken = payload.accessToken;
        state.userId = payload.user.userId;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.userId = null;
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(ChangePassword.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(ChangePassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = "Password erfolgreich geändert!";
        console.log(action);
      })
      .addCase(ChangePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "Change Password, Fehler geschlagen!!";
      })
      .addCase(updateUsername.pending, (state, { payload }) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(updateUsername.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = " username, erfolgreich geändert!";
        state.user.username = payload.user.username;
        console.log(payload);
      })
      .addCase(updateUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.status = "update username, Fehler geschlagen!!";
      })
      .addCase(updateProfileBild.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(updateProfileBild.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = " updateProfileBild, erfolgreich geändert!";
        state.user = payload.user;
      })
      .addCase(updateProfileBild.rejected, (state, action) => {
        state.isLoading = false;
        state.status = " updateProfileBild, Fehler geschlagen!!";
      })
      .addCase(forgotPassword.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = " Email erfolgreich gesendet!";
        console.log(payload);
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.status = " Kein Benutzer mit diese Email gefunden!!";
      })
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = " Password erfolgreich geändert!";
        console.log(payload);
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.status = " Password ändern, Fehler geschlagen!!";
      })
      .addCase(checkSignUp.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(checkSignUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.status = payload;
        console.log(payload);
      })
      .addCase(checkSignUp.rejected, (state, action) => {
        state.isLoading = false;
        state.status = " check Email, Fehler geschlagen!!";
      })
      .addCase(deleteAccount.pending, (state) => {
        state.isLoading = true;
        state.status = "";
      })
      .addCase(deleteAccount.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = null;
        state.userId = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.status = " check Email, Fehler geschlagen!!";
      });
  },
});
export const { setCredentials, log_Out } = apiSlice.actions;
export default apiSlice.reducer;
