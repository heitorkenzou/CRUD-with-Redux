import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = [];

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await fetch("https://dev.codeleap.co.uk/careers/");
    const data = await response.json();
    return data.results;
  } catch {}
});

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action) {
      state.push(action.payload);
    },
    editPost(state, action) {
      const { id, title, content } = action.payload;
      const existingPost = state.find((post) => post.id === id);
      if (existingPost) {
        existingPost.title = title;
        existingPost.content = content;
      }
    },
    postDeleted(state, action) {
      const { id } = action.payload;
      const existingPost = state.some((post) => post.id === id);
      if (existingPost) {
        return state.filter((post) => post.id !== id);
      }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });
  }
});

export const { addPost, editPost, postDeleted } = postsSlice.actions;

export default postsSlice;
