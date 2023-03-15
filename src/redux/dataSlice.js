import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

const dataSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    storeData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { storeData } = dataSlice.actions;

export const selectData = (state) => state.data.data;

export default dataSlice.reducer;
