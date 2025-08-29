
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./slices/searchSlice";

import suggestionsReducer from "./slices/suggestionsSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    suggestions: suggestionsReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(), // default is fine
});

export default store;
