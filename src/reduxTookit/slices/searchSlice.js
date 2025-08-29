import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  lastSubmittedQuery: "",   
  results: [],
  loading: false,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload ?? "";
    },
    setLastSubmittedQuery(state, action) {
      state.lastSubmittedQuery = action.payload ?? "";
    },
    setResults(state, action) {
      state.results = Array.isArray(action.payload) ? action.payload : [];
    },
    setResultsLoading(state, action) {
      state.loading = !!action.payload;
    },
    setResultsError(state, action) {
      state.error = action.payload ?? null;
    },
    clearResults(state) {
      state.results = [];
      state.loading = false;
      state.error = null;
      state.lastSubmittedQuery = ""; 
    },
    clearAll(state) {
      state.query = "";
      state.lastSubmittedQuery = "";
      state.results = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setLastSubmittedQuery,
  setResults,
  setResultsLoading,
  setResultsError,
  clearResults,
  clearAll,
} = searchSlice.actions;

export default searchSlice.reducer;

