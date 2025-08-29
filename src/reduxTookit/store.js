import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "../reduxTookit/slices/search/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});

export default store;
