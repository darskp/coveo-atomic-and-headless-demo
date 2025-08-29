import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  suggestions: [],
  loading: false,
  error: null,
};

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {
    setSuggestions(state, action) {
      state.suggestions = Array.isArray(action.payload) ? action.payload : [];
    },
    setSuggestionsLoading(state, action) {
      state.loading = !!action.payload;
    },
    setSuggestionsError(state, action) {
      state.error = action.payload ?? null;
    },
    clearSuggestions(state) {
      state.suggestions = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setSuggestions,
  setSuggestionsLoading,
  setSuggestionsError,
  clearSuggestions,
} = suggestionsSlice.actions;

export default suggestionsSlice.reducer;
