import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Pager() {
  const pager = useSelector((state) => state.search.pager);
  const controllers = useSelector((state) => state.search.controllers);

  if (!controllers.pager) return null;

  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      <Button
        disabled={!pager.hasPreviousPage}
        onClick={() => controllers.pager.previousPage()}
      >
        Previous
      </Button>
      {pager.currentPages.map((p) => (
        <Button
          key={p}
          variant={pager.currentPage === p ? "contained" : "outlined"}
          onClick={() => controllers.pager.selectPage(p)}
        >
          {p}
        </Button>
      ))}
      <Button
        disabled={!pager.hasNextPage}
        onClick={() => controllers.pager.nextPage()}
      >
        Next
      </Button>
    </Box>
  );
}

export default Pager;
