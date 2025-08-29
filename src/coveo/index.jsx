import { Box, Container, Paper } from "@mui/material";
import Header from "../common/Header";
import { engine } from "./engine";
import SearchPage from "../components/SearchPage/SearchPage";

export const Headless = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <Header />
      <Container maxWidth="lg">
        <Paper elevation={3}>
          <SearchPage engine={engine} />
        </Paper>
      </Container>
    </Box>
  );
};
