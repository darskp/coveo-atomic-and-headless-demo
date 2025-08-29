import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
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
                      {r.title || r.raw?.systitle || r.uri || "-"}
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
                      <strong>Source:</strong> {r.raw?.source || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <strong>Language:</strong>{" "}
                      {Array.isArray(r.raw?.language)
                        ? r.raw.language.join(", ")
                        : r.raw?.language || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <strong>Collection:</strong> {r.raw?.collection || "-"}
                    </Typography>
                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <strong>Score:</strong>{" "}
                      {typeof r.score === "number" ? r.score.toFixed(2) : "-"}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            }
          />
        </ListItem>
      ))}
    </List>
  );
}

export default Results;
