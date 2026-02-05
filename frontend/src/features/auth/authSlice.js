import { createSlice } from "@reduxjs/toolkit";
import {
  signup,
  signin,
  logout,
  fetchProfile,
  checkMe,
  updateProfile,
} from "./authThunks";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false, // for signin/signup/etc
  authChecked: false, // 👈 ONLY for checkMe
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // SIGNUP
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })

      // SIGNIN
      .addCase(signin.pending, (state) => {
        state.loading = true;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(signin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔐 CHECK ME (IMPORTANT PART)
      .addCase(checkMe.pending, (state) => {
        state.authChecked = false;
      })
      .addCase(checkMe.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.authChecked = true;
      })
      .addCase(checkMe.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.authChecked = true;
      })

      //updateProfile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGOUT
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
