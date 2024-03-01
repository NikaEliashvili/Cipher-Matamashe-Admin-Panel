import { configureStore } from "@reduxjs/toolkit";
import isLoggedReducer from "./slice";
export const store = configureStore({
  reducer: {
    isLogged: isLoggedReducer,
  },
});
