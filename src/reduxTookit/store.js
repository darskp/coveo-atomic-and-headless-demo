
import searchReducer from "./slices/searchSlice";

import { configureStore } from "@reduxjs/toolkit";

 const store = configureStore({
  reducer: {
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
