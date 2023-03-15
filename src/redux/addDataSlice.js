import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addData: {},
};

const addDataSlice = createSlice({
  name: "additionalData",
  initialState,
  reducers: {
    setAdditonalData: (state, action) => {
      state.addData = action.payload;
    },
  },
});

export const { setAdditonalData } = addDataSlice.actions;

export const selectAddData = (state) => state.addData.addData;

export default addDataSlice.reducer;
