import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, createPost, toggleLike, addComment } from "./postThunks";

const initialState = {
  posts: [],
  loading: false,
  error: null,
};

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.loading = false;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create post
    builder
      .addCase(createPost.pending, (state) => {
        state.loading = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Toggle like
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { postId, likes } = action.payload;

        const post = state.posts.find((p) => p._id === postId);
        if (post && likes) {
          post.likes = likes; // ✅ keep Redux in sync
        }
      })

      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const { postId, comments } = action.payload;
        const post = state.posts.find((p) => p._id === postId);
        if (post) {
          post.comments = comments;
        }
      });
  },
});

export default postSlice.reducer;
