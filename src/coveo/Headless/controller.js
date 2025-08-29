// searchController.js
export function setupSearchSubscriptions({ searchBox, resultList, searchStatus, dispatch, actions }) {
  const {
    setQuery,
    setSuggestions,
    setSuggestionsLoading,
    setSuggestionsError,
    setResults,
    setResultsLoading,
    setResultsError,
  } = actions;

  // Subscribe searchBox
  const unsubBox = searchBox.subscribe(() => {
    const s = searchBox.state;
    dispatch(setQuery(s.value ?? ""));
    dispatch(setSuggestionsLoading(!!s.isLoading));
    dispatch(setSuggestions(s.suggestions || []));
    dispatch(setSuggestionsError(null));
  });

  // Subscribe resultList
  const unsubResults = resultList.subscribe(() => {
    const s = resultList.state;
    dispatch(setResults(Array.isArray(s.results) ? s.results : []));
  });

  // Subscribe searchStatus
  const unsubStatus = searchStatus.subscribe(() => {
    const s = searchStatus.state;
    dispatch(setResultsLoading(!!s.isLoading));
    dispatch(setResultsError(s.hasError ? "A search error occurred." : null));
  });

  // return cleanup
  return () => {
    unsubBox();
    unsubResults();
    unsubStatus();
  };
}
