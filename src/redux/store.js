import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import uploadFormReducer from "./uploadFormSlice";
import modalReducer from "./modalSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    uploadForm: uploadFormReducer,
    modal: modalReducer,
  },
});
