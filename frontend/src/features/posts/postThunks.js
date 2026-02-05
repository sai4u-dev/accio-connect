import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getPostsAPI,
  createPostAPI,
  toggleLikeAPI,
  addCommentAPI,
} from "./postAPI";

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getPostsAPI();
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Create new post
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (postData, { rejectWithValue }) => {
    try {
      const res = await createPostAPI(postData);
      return res.data.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Like / Unlike post
export const toggleLike = createAsyncThunk(
  "posts/toggleLike",
  async (postId, { rejectWithValue }) => {
    try {
      const res = await toggleLikeAPI(postId);
      return { postId, likes: res.data.data.likes };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// Add comment
export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const res = await addCommentAPI({ postId, comment });
      return { postId, comments: res.data.data.comments };
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
