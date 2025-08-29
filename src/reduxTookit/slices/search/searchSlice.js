import { createSlice } from "@reduxjs/toolkit";
import { submitSearch, updateSearchQuery } from "./searchThunks";

const initialState = {
  query: "",
  suggestions: [],
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setSuggestions: (state, action) => {
      state.suggestions = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearSearch: () => initialState,
  },
});

export const {
  setQuery,
  setSuggestions,
  setResults,
  setLoading,
  setError,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer;
