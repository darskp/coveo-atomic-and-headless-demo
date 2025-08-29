import { useEffect, useRef, useState } from "react";
import {
  buildSearchBox,
  buildResultList,
  buildSearchStatus,
  buildFacet,
  buildPager,
  buildSort,
  buildQuerySummary,
} from "@coveo/headless";

import {
  Box,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  IconButton,
  InputAdornment,
  CircularProgress,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";

function SearchPage({ engine }) {
  const searchBoxRef = useRef(null);
  const resultListRef = useRef(null);
  const searchStatusRef = useRef(null);
  const facetRef = useRef(null);
  const pagerRef = useRef(null);
  const sortRef = useRef(null);
  const summaryRef = useRef(null);

  if (!searchBoxRef.current) {
    searchBoxRef.current = buildSearchBox(engine, {
      options: { numberOfSuggestions: 5 },
    });
  }
  if (!resultListRef.current) {
    resultListRef.current = buildResultList(engine, {
      options: {
        fieldsToInclude: ["title", "excerpt", "uri", "filetype"],
        numberOfResults: 10,
      },
    });
  }
  if (!searchStatusRef.current) {
    searchStatusRef.current = buildSearchStatus(engine);
  }
  if (!facetRef.current) {
    facetRef.current = buildFacet(engine, {
      options: { field: "filetype", numberOfValues: 5 },
    });
  }
  if (!pagerRef.current) {
    pagerRef.current = buildPager(engine, { options: { numberOfPages: 5 } });
  }
  if (!sortRef.current) {
    sortRef.current = buildSort(engine);
  }
  if (!summaryRef.current) {
    summaryRef.current = buildQuerySummary(engine);
  }

  const searchBox = searchBoxRef.current;
  const resultList = resultListRef.current;
  const searchStatus = searchStatusRef.current;
  const facet = facetRef.current;
  const pager = pagerRef.current;
  const sort = sortRef.current;
  const summary = summaryRef.current;

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState(searchStatus.state);
  const [facetState, setFacetState] = useState(facet.state);
  const [pagerState, setPagerState] = useState(pager.state);
  const [sortState, setSortState] = useState(sort.state);
  const [summaryState, setSummaryState] = useState(summary.state);

  useEffect(() => {
    const unsubs = [
      searchBox.subscribe(() => {
        setQuery(searchBox.state.value ?? "");
        setSuggestions(searchBox.state.suggestions ?? []);
      }),
      resultList.subscribe(() => setResults(resultList.state.results)),
      searchStatus.subscribe(() => setStatus(searchStatus.state)),
      facet.subscribe(() => setFacetState(facet.state)),
      pager.subscribe(() => setPagerState(pager.state)),
      sort.subscribe(() => setSortState(sort.state)),
      summary.subscribe(() => setSummaryState(summary.state)),
    ];
    return () => unsubs.forEach((u) => u());
  }, [searchBox, resultList, searchStatus, facet, pager, sort, summary]);

  useEffect(() => {
  engine.executeFirstSearch();
}, [engine]);

  const handleSubmit = () => {
    searchBox.submit();
  };

  const handleSuggestionClick = (s) => {
    searchBox.updateText(s.rawValue);
    searchBox.submit();
  };

  const toggleFacetValue = (value) => {
    facet.toggleSelect(value);
    engine.executeFirstSearch();
  };

  return (
    <Box p={3} maxWidth={900} mx="auto">
      <TextField
        fullWidth
        placeholder="Search…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          searchBox.updateText(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query && (
                <IconButton size="small" onClick={() => setQuery("")}>
                  <ClearIcon />
                </IconButton>
              )}
            </InputAdornment>
          ),
        }}
      />

      {suggestions.length > 0 && (
        <Paper variant="outlined" sx={{ mt: 1 }}>
          {suggestions.map((s, i) => (
            <Button
              key={i}
              fullWidth
              onClick={() => handleSuggestionClick(s)}
              sx={{ justifyContent: "flex-start" }}
            >
              <span dangerouslySetInnerHTML={{ __html: s.highlightedValue }} />
            </Button>
          ))}
        </Paper>
      )}

      {status.isLoading && (
        <Box mt={2} display="flex" alignItems="center" gap={1}>
          <CircularProgress size={20} />
          <Typography>Loading…</Typography>
        </Box>
      )}
      {status.hasError && (
        <Typography mt={2} color="error">
          Search error occurred.
        </Typography>
      )}

      {summaryState.hasResults && (
        <Typography mt={2} variant="subtitle1">
          {summaryState.firstResult}-{summaryState.lastResult} of{" "}
          {summaryState.total.toLocaleString()} results for{" "}
          <strong>"{summaryState.query}"</strong>
        </Typography>
      )}

      <Box mt={3}>
        <Typography variant="h6">File Type</Typography>
        <FormGroup>
          {facetState.values.map((v) => (
            <FormControlLabel
              key={v.value}
              control={
                <Checkbox
                  checked={v.state === "selected"}
                  onChange={() => toggleFacetValue(v)}
                />
              }
              label={`${v.value} (${v.numberOfResults})`}
            />
          ))}
        </FormGroup>
      </Box>

      <Box mt={3}>
        <Typography variant="h6">Sort By</Typography>
        <Select
          value={sortState.sortCriteria || "relevancy"}
          onChange={(e) => sort.sortBy(e.target.value)}
          sx={{ mt: 1, minWidth: 200 }}
        >
          <MenuItem value="relevancy">Relevance</MenuItem>
          <MenuItem value="date descending">Newest</MenuItem>
          <MenuItem value="date ascending">Oldest</MenuItem>
        </Select>
      </Box>

      <List>
        {results.map((r, i) => (
          <ListItem key={i} sx={{ mt: 2, border: "1px solid #ddd", borderRadius: "8px" }}>
            <ListItemText
              primary={
                <a
                  href={r.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    color: "#1976d2",
                    fontWeight: 500,
                    textDecoration: "none",
                  }}
                >
                  {r.title || r.uri}
                </a>
              }
              secondary={r.excerpt}
            />
          </ListItem>
        ))}
      </List>

      <Box mt={3} display="flex" gap={1}>
        <Button disabled={!pagerState.hasPreviousPage} onClick={() => pager.previousPage()}>
          Previous
        </Button>
        {pagerState.currentPages.map((p) => (
          <Button
            key={p}
            variant={pagerState.currentPage === p ? "contained" : "outlined"}
            onClick={() => pager.selectPage(p)}
          >
            {p}
          </Button>
        ))}
        <Button disabled={!pagerState.hasNextPage} onClick={() => pager.nextPage()}>
          Next
        </Button>
      </Box>
    </Box>
  );
}

export default SearchPage;
