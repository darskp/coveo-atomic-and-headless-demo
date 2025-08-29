import { Paper, Button } from "@mui/material";
import { useSelector } from "react-redux";

function Suggestions() {
  const suggestions = useSelector((state) => state.search.suggestions);
  const controllers = useSelector((state) => state.search.controllers);

  if (!controllers.searchBox || suggestions.length === 0) return null;

  const handleSuggestionClick = (s) => {
    controllers.searchBox.updateText(s.rawValue);
    controllers.searchBox.submit();
  };

  return (
    <Paper variant="outlined" sx={{ mt: 1 }}>
      {suggestions.map((s, i) => (
        <Button
          key={i}
          fullWidth
          onClick={() => handleSuggestionClick(s)}
          sx={{
            justifyContent: "flex-start", 
            textTransform: "none", 
            padding: "8px 16px", 
          }}
        >
          <span
            style={{ textAlign: "left", width: "100%", display: "block" }}
            dangerouslySetInnerHTML={{ __html: s.highlightedValue }}
          />
        </Button>
      ))}
    </Paper>
  );
}

export default Suggestions;
