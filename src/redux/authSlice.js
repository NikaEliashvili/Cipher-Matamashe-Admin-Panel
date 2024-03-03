// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: JSON.parse(localStorage.getItem("jwt")) || null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setNewJWT: (state, action) => {
      state.jwt = action.payload;
      localStorage.setItem("jwt", JSON.stringify(action.payload));
    },
    clearJWT: (state) => {
      state.jwt = null;
      localStorage.removeItem("jwt");
      state.user = null; // Clear user data when JWT is cleared
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const authToken = (state) => state.auth.jwt;
export const selectUser = (state) => state.auth.user; // Selector to get user data

export const { setNewJWT, setUser, clearJWT } = authSlice.actions;

export default authSlice.reducer;
