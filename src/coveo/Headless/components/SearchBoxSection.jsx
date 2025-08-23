import { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { buildSearchBox, buildResultList } from "@coveo/headless";

function SearchBoxSection({ engine }) {
  const searchBoxRef = useRef(null);
  if (!searchBoxRef.current) {
    searchBoxRef.current = buildSearchBox(engine, {
      options: { numberOfSuggestions: 5 },
    });
  }
  const searchBox = searchBoxRef.current;

  const resultListRef = useRef(null);
  if (!resultListRef.current) {
    resultListRef.current = buildResultList(engine, {
      options: {
        fieldsToInclude: ["title", "excerpt", "uri", "source"],
        initialState: {
          advancedExpression: '@source=="TestDocs"',
          numberOfResults: 5,
        },
      },
    });
  }
  const resultList = resultListRef.current;

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const unsubBox = searchBox.subscribe(() => {
      setQuery(searchBox.state.value);
    });
    const unsubResults = resultList.subscribe(() => {
      const res = resultList.state.results || [];
      setResults(res);

      const sugg = res.slice(0, 5).map((r) => ({
        highlightedValue: r.title || r.uri,
      }));
      setSuggestions(sugg);
    });

    return () => {
      unsubBox();
      unsubResults();
    };
  }, []);

  useEffect(() => {
    searchBox.updateText(query);
    searchBox.submit();
  }, [query]);

  return (
    <Box p={3} maxWidth={600} mx="auto">
      <TextField
        fullWidth
        placeholder="Search your documents..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {query.trim() && suggestions.length > 0 && (
        <Paper variant="outlined" sx={{ mt: 1 }}>
          <List dense>
            {suggestions.map((s, i) => (
              <ListItem
                key={i}
                onClick={() => {
                  setQuery(s.highlightedValue);
                  searchBox.updateText(s.highlightedValue);
                  searchBox.submit();
                }}
              >
                <span
                  dangerouslySetInnerHTML={{ __html: s.highlightedValue }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {results.length > 0 ? (
        <Box mt={3}>
          <Typography variant="h6">Search Results:</Typography>
          <List>
            {results.map((r, i) => (
              <ListItem key={i}>
                <ListItemText
                  primary={r.title || r.uri}
                  secondary={r.excerpt || r.raw?.uri || ""}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      ) : (
        query.trim() && (
          <Typography mt={2}>No results found for "{query}"</Typography>
        )
      )}
    </Box>
  );
}

export default SearchBoxSection;

