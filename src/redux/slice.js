import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "isLogged",
  initialState,
  reducers: {
    setIsLogged: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsLogged } = counterSlice.actions;

export default counterSlice.reducer;
