import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  signOut,
  checkAuth,
  resetPasswordRequst,
  resetPassword,
} from "./authAPI";

const initialState = {
  loggedInUserToken: null,
  status: "idle",
  error: null,
  mailSend: null,
  passwordReset: false,
  userChecked: false,
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkAuthUserAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    const response = await checkAuth();
    return response.data;
  }
);

export const loginUserUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo) => {
    const response = await loginUser(loginInfo);
    return response.data;
  }
);

export const signOutAsync = createAsyncThunk(
  "user/signOut",
  async () => {
    const response = await signOut();
    return response.data;
  }
);

export const resetPasswordRequstAsync = createAsyncThunk(
  "user/resetPasswordRequst",
  async (email) => {
    const response = await resetPasswordRequst(email);
    return response.data;
  }
);

export const resetPasswordAsync = createAsyncThunk(
  "user/resetPassword",
  async (resetData) => {
    const response = await resetPassword(resetData);
    return response.data;
  }
);

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        console.log(action.payload , "dfddfdkndfj");
      })
      .addCase(loginUserUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log(action);
        state.loggedInUserToken = null;
      })
      .addCase(checkAuthUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkAuthUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      })
      .addCase(resetPasswordRequstAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPasswordRequstAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mailSend = action.payload.message;
      })
      .addCase(resetPasswordRequstAsync.rejected, (state, action) => {
        state.status = "idle";
        state.mailSend = action.error.message;
      })
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.passwordReset = true;
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error.message;
        console.log(action);
      });
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectMailSend = (state) => state.auth.mailSend;
export const selectPasswordReset = (state) => state.auth.passwordReset;

export default authSlice.reducer;
