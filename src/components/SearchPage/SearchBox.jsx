import { TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import { setQuery } from "../../reduxTookit/slices/searchSlice";

function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);
  const controllers = useSelector((state) => state.search.controllers);
  if (!controllers.searchBox) return null;

  const handleSubmit = () => controllers.searchBox.submit();

  return (
    <TextField
      fullWidth
      placeholder="Search - Air India, Indigo, or SpiceJet"
      value={query}
      onChange={(e) => {
        dispatch(setQuery(e.target.value));
        controllers.searchBox.updateText(e.target.value);
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
              <IconButton size="small" onClick={() => dispatch(setQuery(""))}>
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
}

export default SearchBox;
