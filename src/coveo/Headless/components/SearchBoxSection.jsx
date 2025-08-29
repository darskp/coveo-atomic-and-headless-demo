import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  ListItemText,
} from "@mui/material";
import { buildSearchBox, buildResultList } from "@coveo/headless";

function SearchBoxSection({ engine }) {
  // --- Controllers ---
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
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    const unsubBox = searchBox.subscribe(() => {
      setQuery(searchBox.state.value);
      setSuggestions(searchBox.state.suggestions || []);
    });
    const unsubResults = resultList.subscribe(() => {
      setResults(resultList.state.results || []);
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
    setQuery(val);
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
    setQuery(val);
    searchBox.updateText(val);

    if (val.trim() !== "") {
      setShowSuggestions(true);
    }
  };

  return (
    <Box p={3} maxWidth={700} mx="auto">
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
      />

      {query.trim() && suggestions.length > 0 && showSuggestions && (
        <Paper sx={{ mt: 1, borderRadius: "12px" }}>
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

      {results.length > 0 && (
        <Box mt={3}>
          <List>
            {results.map((r, i) => (
              <ListItem
                key={i}
                sx={{
                  borderBottom: "1px solid #eee",
                  alignItems: "flex-start",
                }}
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
                        textDecoration: "none",
                      }}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.textDecoration = "underline")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.textDecoration = "none")
                      }
                    >
                      {r.title || r.uri}
                    </a>
                  }
                  secondary={
                    <Typography
                      component="span"
                      sx={{ fontSize: "14px", color: "#555" }}
                    >
                      {r.excerpt || r.raw?.uri || ""}
                    </Typography>
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
