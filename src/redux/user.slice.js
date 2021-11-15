import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: "",
  users: []
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser(state, action) {
      state.currentUser = action.payload;
      state.users = Array.from(new Set([...state.users, action.payload]));
    },
    replaceUsers: (state, action) => action.payload
  }
});

export const { saveUser } = userSlice.actions;

export default userSlice;
