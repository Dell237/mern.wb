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

export const logOut = createAsyncThunk("user/logOut", async () => {
  try {
    const resp = await axios.post(`${url}/logout`);
    localStorage.removeItem("jwt");
    return resp.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(
      "something went wrong, you are not logged!"
    );
  }
});

export const ChangePassword = createAsyncThunk(
  "user/changePassword",
  async ({ userId, oldPassword, newPassword, username }, thunkAPI) => {
    try {
      await userLogged();

      const resp = await axios.post(`${url}/${userId}/updatePassword`, {
        oldPassword,
        newPassword,
        username,
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
      await userLogged();

      const resp = await axios.post(`${url}/${userId}/updateUsername`, {
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
      await userLogged();

      const resp = await axios.post(`${url}/${userId}/updateProfileBild`, {
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
      const resp = await axios.post(`${url}/forgot-password`, {
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
      console.log({ id, token, Password });
      const resp = await axios.post(`${url}/forgot-password/${id}/${token}`, {
        Password,
      });
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue("something went wrong!!");
    }
  }
);

const initialState = {
  user: null,
  isLoading: false,
  userId: null,
  status: "",
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
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.userId = action.payload.user.userId;
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
        console.log(payload);
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
      });
  },
});
export const { registerUser } = apiSlice.actions;
export default apiSlice.reducer;
