import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uploadFormReducer from "./uploadFormSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadForm: uploadFormReducer,
  },
});
