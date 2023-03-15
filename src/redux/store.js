import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import addDataReducers from "./addDataSlice";

export default configureStore({
  reducer: {
    data: dataReducer,
    addData: addDataReducers,
  },
});
