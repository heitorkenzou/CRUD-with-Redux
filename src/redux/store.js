import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import postsSlice from "./posts.slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    loadPosts: postsSlice.reducer
  }
});

export default store;
