import { Box, Typography, FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";

function Facet({ engine }) {
  const facet = useSelector((state) => state.search.facet);
  const controllers = useSelector((state) => state.search.controllers);

  if (!controllers.facet) return null;

  const toggleFacetValue = (value) => {
    controllers.facet.toggleSelect(value);
    engine.executeFirstSearch();
  };

  return (
    <Box mt={3} mb={2}>
      <Typography variant="h6">Destination (facet)</Typography>
      <FormGroup>
        {facet.values.map((v) => (
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
  );
}

export default Facet;
