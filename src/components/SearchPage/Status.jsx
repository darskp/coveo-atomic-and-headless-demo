import { Box, Typography, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";

function Status() {
  const status = useSelector((state) => state.search.status);

  if (status.isLoading) {
    return (
      <Box mt={2} display="flex" alignItems="center" gap={1}>
        <CircularProgress size={20} />
        <Typography>Loading…</Typography>
      </Box>
    );
  }

  if (status.hasError) {
    return (
      <Typography mt={2} color="error">
        Search error occurred.
      </Typography>
    );
  }

  return null;
}

export default Status;
