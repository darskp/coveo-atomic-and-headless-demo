import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  suggestions: [],
  results: [],
  status: { isLoading: false, hasError: false },
  facet: { values: [] },
  pager: { currentPage: 1, currentPages: [], hasNextPage: false, hasPreviousPage: false },
  sort: { sortCriteria: "relevancy" },
  summary: { hasResults: false },
  controllers: {}, 
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
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setFacet: (state, action) => {
      state.facet = action.payload;
    },
    setPager: (state, action) => {
      state.pager = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSummary: (state, action) => {
      state.summary = action.payload;
    },
    setControllers: (state, action) => {
      state.controllers = action.payload;
    },
    clearAll: () => initialState,
  },
});

export const {
  setQuery,
  setSuggestions,
  setResults,
  setStatus,
  setFacet,
  setPager,
  setSort,
  setSummary,
  setControllers,
  clearAll,
} = searchSlice.actions;

export default searchSlice.reducer;
