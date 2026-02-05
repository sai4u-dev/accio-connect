import { createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, signinAPI, logoutAPI, profileAPI, meAPI } from "./authAPI";

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const res = await signupAPI(data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const signin = createAsyncThunk(
  "auth/signin",
  async (data, thunkAPI) => {
    try {
      const res = await signinAPI(data);
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    await logoutAPI();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response.data.message);
  }
});

export const fetchProfile = createAsyncThunk(
  "auth/profile",
  async (_, thunkAPI) => {
    try {
      const res = await profileAPI();
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, thunkAPI) => {
    try {
      const res = await profileAPI(formData, { method: "PUT" });
      thunkAPI.dispatch(checkMe()); // refresh user state
      return res.data.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Update failed"
      );
    }
  }
);

export const checkMe = createAsyncThunk("auth/me", async (_, thunkAPI) => {
  try {
    const res = await meAPI();
    return res.data.data;
  } catch {
    return thunkAPI.rejectWithValue("Not authenticated");
  }
});
