import { List, ListItem, ListItemText, CircularProgress, Box } from "@mui/material";
import { useSelector } from "react-redux";

function Results() {
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);

  if (status.isLoading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!status.isLoading && results.length === 0) {
    return (
      <Box textAlign="center" mt={4} color="gray">
        No results found
      </Box>
    );
  }

  return (
    <List>
      {results.map((r, i) => (
        <ListItem
          key={i}
          sx={{ mt: 2, border: "1px solid #ddd", borderRadius: "8px" }}
        >
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
  );
}

export default Results;
