import { Typography } from "@mui/material";
import { useSelector } from "react-redux";

function Summary() {
  const summary = useSelector((state) => state.search.summary);

  if (!summary.hasResults) return null;

  return (
    <Typography my={2} variant="subtitle1">
      {summary.firstResult}-{summary.lastResult} of{" "}
      {summary.total.toLocaleString()} results for <strong>"{summary.query}"</strong>
    </Typography>
  );
}

export default Summary;