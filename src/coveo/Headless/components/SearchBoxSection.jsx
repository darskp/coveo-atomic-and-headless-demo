import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSuggestions,
  setResults,
  setQuery,
} from "../../../reduxTookit/slices/search/searchSlice";
import {
  submitSearch,
  updateSearchQuery,
} from "../../../reduxTookit/slices/search/searchThunks";
import {
  initControllers,
  searchBox,
  resultList,
} from "../../../reduxTookit/slices/search/controllers";
import { buildSearchBox, buildResultList } from "@coveo/headless";
import { IconButton, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

import {
  Box,
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
} from "@mui/material";

function SearchBoxSection({ engine }) {
  const dispatch = useDispatch();
  const { query, suggestions, results, loading, error } = useSelector(
    (state) => state.search
  );

  const searchBoxRef = useRef(null);
  if (!searchBoxRef.current) {
    searchBoxRef.current = buildSearchBox(engine, {
      options: { numberOfSuggestions: 8 },
    });
  }
  const searchBox = searchBoxRef.current;

  const resultListRef = useRef(null);
  if (!resultListRef.current) {
    resultListRef.current = buildResultList(engine, {
      options: {
        fieldsToInclude: ["title", "excerpt", "uri", "source"],
        numberOfResults: 10,
      },
    });
  }
  const resultList = resultListRef.current;

  useEffect(() => {
    const unsubBox = searchBox.subscribe(() => {
      dispatch(setQuery(searchBox.state.value));
      dispatch(setSuggestions(searchBox.state.suggestions || []));
    });
    const unsubResults = resultList.subscribe(() => {
      dispatch(setResults(resultList.state.results || []));
    });

    return () => {
      unsubBox();
      unsubResults();
    };
  }, [searchBox, resultList]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      searchBox.updateText(query);
      searchBox.submit();
    }
  };

  const handleSuggestionClick = (val) => {
    dispatch(setQuery(val));
    searchBox.updateText(val);
    searchBox.submit();
  };
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleFocus = () => {
    if (suggestions.length > 0) {
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

    if (val.trim() !== "") {
      setShowSuggestions(true);
    }
  };

  return (
    <Box p={3} mx="auto">
      <Box maxWidth={700} mx="auto">
        <TextField
  fullWidth
  placeholder="Search..."
  value={query}
  onBlur={handleBlur}
  onFocus={handleFocus}
  onChange={handleInputChange}
  onKeyDown={handleKeyDown}
  sx={{
    borderRadius: "24px",
    "& .MuiOutlinedInput-root": {
      borderRadius: "24px",
      paddingX: 2,
    },
  }}
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <SearchIcon color="action" />
      </InputAdornment>
    ),
    endAdornment: (
      query && (
        <InputAdornment position="end">
          <IconButton
            size="small"
            onClick={() => {
              dispatch(setQuery(""));
              searchBox.updateText("");
              dispatch(setResults([])); 
            }}
          >
            <ClearIcon />
          </IconButton>
        </InputAdornment>
      )
    ),
  }}
/>

        {loading && <Typography mt={2}>Loading...</Typography>}
        {error && (
          <Typography mt={2} color="error">
            {error}
          </Typography>
        )}

        {query.trim() && suggestions.length > 0 && showSuggestions && (
          <Paper variant="outlined" sx={{ mt: 1, borderRadius: "12px" }}>
            <List dense>
              {suggestions.map((s, i) => (
                <ListItem
                  key={i}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionClick(s.rawValue)}
                >
                  <span
                    dangerouslySetInnerHTML={{ __html: s.highlightedValue }}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        )}
      </Box>

      {results && results.length > 0 && (
  <Typography mt={2}>
    {results.length} results found for <strong>"{query}"</strong>
  </Typography>
)}

      {results.length > 0 && (
        <Box>
        <List>
  {results.map((r, i) => (
    <ListItem
      key={i}
      sx={(theme) => ({
        border: "1px solid",
        borderColor: theme.palette.divider,
        marginTop: "20px",
        borderRadius: "8px",
        backgroundColor: theme.palette.background.paper,
        "&:hover": {
          backgroundColor: theme.palette.action.hover,
        },
      })}
    >
      <ListItemText
        primary={
          <a
            href={r.uri}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1976d2",
              fontSize: "16px",
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
        }
        secondary={
          <Box sx={{ mt: 1 }}>
            {/* excerpt */}
            <Typography
              variant="body2"
              sx={{ color: "text.secondary", mb: 1 }}
            >
              {r.excerpt || r.raw?.excerpt || ""}
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              <Typography variant="caption" color="text.secondary">
                <strong>Source:</strong> {r.raw?.source || ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <strong>Language:</strong>{" "}
                {Array.isArray(r.raw?.language) ? r.raw.language.join(", ") : r.raw?.language || ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <strong>Collection:</strong> {r.raw?.collection || ""}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                <strong>Score:</strong> {r.score ?? ""}
              </Typography>
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
