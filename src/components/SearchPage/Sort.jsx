import { Box, Typography, Select, MenuItem } from "@mui/material";
import { useSelector } from "react-redux";

function Sort() {
  const sort = useSelector((state) => state.search.sort);
  const controllers = useSelector((state) => state.search.controllers);

  if (!controllers.sort) return null;

  const handleChange = (e) => {
    const value = e.target.value;
    let criterion;

    if (value === "relevancy") {
      criterion = { by: "relevancy" };
    } else if (value === "date descending") {
      criterion = { by: "date", order: "descending" };
    } else if (value === "date ascending") {
      criterion = { by: "date", order: "ascending" };
    }

    controllers.sort.sortBy(criterion);
  };

  return (
    <Box
      mt={3}
      display="flex"
      justifyContent={{ xs: "flex-start", sm: "space-between" }}
      alignItems="center"
      flexDirection={{ xs: "column", sm: "row" }}
      gap={1}
    >
      <Typography variant="h6">Results</Typography>
      <Select
        value={sort.sortCriteria || "relevancy"}
        onChange={handleChange}
        sx={{
          mt: 1,
          minWidth: { xs: 120, sm: 200 },
          fontSize: { xs: "0.875rem", sm: "1rem" },
        }}
        MenuProps={{
          PaperProps: {
            elevation: 4,
          },
        }}
      >
        <MenuItem value="relevancy">Relevance</MenuItem>
        <MenuItem value="date descending">Newest</MenuItem>
        <MenuItem value="date ascending">Oldest</MenuItem>
      </Select>
    </Box>
  );
}

export default Sort;
