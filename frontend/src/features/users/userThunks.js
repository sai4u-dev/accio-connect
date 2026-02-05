import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllUsers } from "./userApi";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, thunkAPI) => {
    try {
      const res = await getAllUsers();
      console.log(res);
      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);
