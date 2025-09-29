import { loadClickAnalyticsActions } from "@coveo/headless";
import {
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Box,
  Typography,
} from "@mui/material";
import { useSelector } from "react-redux";

function Results({handleLinkClick}) {
  const results = useSelector((state) => state.search.results);
  const status = useSelector((state) => state.search.status);

  // const handleClick = (e, item, position = 1) => {
  //   e.preventDefault();

  //   console.log("🟢 Click logged:", item);

  //   const { logCustomDocumentOpen } = loadClickAnalyticsActions(engine);

  //   engine.dispatch(
  //     logCustomDocumentOpen({
  //       documentUri: item.uri,
  //       documentUriHash: item.id,
  //       documentTitle: item.title,
  //       collectionName: "Flights",
  //       sourceName: "flightSearchApp",
  //       documentPosition: position,
  //     })
  //   );
  // };

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
                  onClick={(e) => handleLinkClick(e, r,)}
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
                  {r.title || "-"}
                </a>

                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <strong>Duration:</strong>{" "}
                      {r.raw?.duration_hours != null &&
                      r.raw?.duration_minutes != null
                        ? `${r.raw.duration_hours}h ${r.raw.duration_minutes}m`
                        : "-"}
                    </Typography>

                    <Typography
                      variant="body2"
                      component="div"
                      color="text.secondary"
                    >
                      <strong>Price:</strong>{" "}
                      {r.raw?.price ? `₹${r.raw.price}` : "-"}
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
