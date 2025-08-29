import { useEffect, useRef, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setQuery,
  setResults,
  setResultsLoading,
  setResultsError,
  clearResults,
  setLastSubmittedQuery,
  clearAll,
} from "../../../reduxTookit/slices/searchSlice";
import {
  setSuggestions,
  setSuggestionsLoading,
  setSuggestionsError,
  clearSuggestions,
} from "../../../reduxTookit/slices/suggestionsSlice";

import {
  buildSearchBox,
  buildResultList,
  buildSearchStatus,
} from "@coveo/headless";

import {
  Box,
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
  IconButton,
  InputAdornment,
  CircularProgress,
  ListItemButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchBoxSection({ engine }) {
  const dispatch = useDispatch();

  const {
    query,
    lastSubmittedQuery,
    results,
    loading: resultsLoading,
    error: resultsError,
  } = useSelector((state) => state.search);
  const {
    suggestions,
    loading: suggestionsLoading,
    error: suggestionsError,
  } = useSelector((state) => state.suggestions);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchBoxRef = useRef(null);
  const resultListRef = useRef(null);
  const searchStatusRef = useRef(null);

  if (!searchBoxRef.current) {
    searchBoxRef.current = buildSearchBox(engine, {
      options: { numberOfSuggestions: 8 },
    });
  }
  if (!resultListRef.current) {
    resultListRef.current = buildResultList(engine, {
      options: {
        fieldsToInclude: [
          "title",
          "excerpt",
          "uri",
          "source",
          "language",
          "collection",
        ],
        numberOfResults: 10,
      },
    });
  }
  if (!searchStatusRef.current) {
    searchStatusRef.current = buildSearchStatus(engine);
  }

  const searchBox = searchBoxRef.current;
  const resultList = resultListRef.current;
  const searchStatus = searchStatusRef.current;

  useEffect(() => {
    const unsubBox = searchBox.subscribe(() => {
      const s = searchBox.state;
      dispatch(setQuery(s.value ?? ""));
      dispatch(setSuggestionsLoading(!!s.isLoading));
      dispatch(setSuggestions(s.suggestions || []));
      dispatch(setSuggestionsError(null));
    });

    const unsubResults = resultList.subscribe(() => {
      const s = resultList.state;
      dispatch(setResults(Array.isArray(s.results) ? s.results : []));
    });

    const unsubStatus = searchStatus.subscribe(() => {
      const s = searchStatus.state;
      dispatch(setResultsLoading(!!s.isLoading));
      dispatch(setResultsError(
        s.hasError ? "A search error occurred." : null
      ));
    });

    return () => {
      unsubBox();
      unsubResults();
      unsubStatus();
    };
  }, [dispatch, searchBox, resultList, searchStatus]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBox.updateText(query);
      dispatch(setResultsLoading(true));
      dispatch(setLastSubmittedQuery(query));
      searchBox.submit();
    }
  };

  const handleSuggestionClick = (val) => {
    dispatch(setQuery(val));
    searchBox.updateText(val);
    dispatch(setResultsLoading(true));
    dispatch(setLastSubmittedQuery(val));
    searchBox.submit();
    setShowSuggestions(false);
  };

  const handleFocus = () => {
    if ((suggestions?.length || 0) > 0 || suggestionsLoading) {
      setShowSuggestions(true);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowSuggestions(false), 150);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    dispatch(setQuery(val));
    searchBox.updateText(val);
    if (val.trim() !== "") setShowSuggestions(true);
    else setShowSuggestions(false);
  };

  const clearEverything = () => {
    dispatch(clearAll());
    dispatch(clearSuggestions());
    searchBox.updateText("");
    dispatch(clearResults());
  };

  const resultsCountText = useMemo(() => {
    if (!results || results.length === 0 || !lastSubmittedQuery) return null;
    return (
      <Typography mt={2} component="div">
        {results.length} results found for{" "}
        <strong>"{lastSubmittedQuery}"</strong>
      </Typography>
    );
  }, [results, lastSubmittedQuery]);

  return (
    <Box p={3} mx="auto">
      <Box maxWidth={700} mx="auto">
        <TextField
          fullWidth
          placeholder="Search…"
          value={query}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          sx={{
            borderRadius: "24px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "24px",
              px: 2,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {suggestionsLoading && (
                  <CircularProgress size={18} sx={{ mr: 1 }} />
                )}
                {query ? (
                  <IconButton size="small" onClick={clearEverything}>
                    <ClearIcon titleAccess="Clear" />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />

        {resultsLoading && (
          <Box mt={2} display="flex" alignItems="center" gap={1}>
            <CircularProgress size={20} />
            <Typography variant="body2" component="span">
              Searching…
            </Typography>
          </Box>
        )}
        {resultsError && (
          <Typography mt={2} color="error" component="div">
            {resultsError}
          </Typography>
        )}

        {showSuggestions && query?.trim()?.length > 0 && (
          <Paper variant="outlined" sx={{ mt: 1, borderRadius: "12px" }}>
            {suggestionsLoading && (!suggestions || suggestions.length === 0) ? (
              <Box p={2} display="flex" gap={1} alignItems="center">
                <CircularProgress size={16} />
                <Typography variant="body2" component="span">
                  Loading suggestions…
                </Typography>
              </Box>
            ) : (
              <List dense>
                {(suggestions || []).map((s, i) => (
                  <ListItemButton
                    key={i}
                    onMouseDown={(e) => e.preventDefault()} // keep focus
                    onClick={() => handleSuggestionClick(s.rawValue)}
                  >
                    <span
                      style={{ width: "100%" }}
                      dangerouslySetInnerHTML={{
                        __html: s.highlightedValue,
                      }}
                    />
                  </ListItemButton>
                ))}
                {(!suggestions || suggestions.length === 0) && (
                  <ListItem disabled>
                    <ListItemText
                      primary={
                        <Typography component="span">
                          No suggestions
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>
            )}
          </Paper>
        )}
      </Box>

      {resultsCountText}

      {Array.isArray(results) && results.length > 0 && (
        <Box>
          <List>
            {results.map((r, i) => (
              <ListItem
                key={i}
                sx={(theme) => ({
                  border: "1px solid",
                  borderColor: theme.palette.divider,
                  mt: 2,
                  borderRadius: "8px",
                  backgroundColor: theme.palette.background.paper,
                  "&:hover": { backgroundColor: theme.palette.action.hover },
                })}
              >
                <ListItemText
                  primary={
                   <Box>
                     <a
                      href={r.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: "#1976d2",
                        fontSize: 16,
                        fontWeight: 500,
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      {r.title || r.raw?.systitle || r.uri || ""}
                    </a>
                      <Box sx={{ mt: 1 }}>
                      <Typography
                        variant="body2"
                        component="div" 
                        sx={{ color: "text.secondary", mb: 1 }}
                      >
                        {r.excerpt || r.raw?.excerpt || ""}
                      </Typography>

                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                        <Typography
                          variant="body2"
                           component="div" 
                          color="text.secondary"
                        >
                          <strong>Source:</strong> {r.raw?.source || ""}
                        </Typography>
                        <Typography
                          variant="body2"
                           component="div" 
                          color="text.secondary"
                        >
                          <strong>Language:</strong>{" "}
                          {Array.isArray(r.raw?.language)
                            ? r.raw.language.join(", ")
                            : r.raw?.language || ""}
                        </Typography>
                        <Typography
                          variant="body2"
                           component="div" 
                          color="text.secondary"
                        >
                          <strong>Collection:</strong> {r.raw?.collection || ""}
                        </Typography>
                        <Typography
                          variant="body2"
                           component="div" 
                          color="text.secondary"
                        >
                          <strong>Score:</strong>{" "}
                          {typeof r.score === "number"
                            ? r.score.toFixed(2)
                            : ""}
                        </Typography>
                      </Box>
                    </Box>
                   </Box>
                    
                  }
                  
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </Box>
  );
}

export default SearchBoxSection;
