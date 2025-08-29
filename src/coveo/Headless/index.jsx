import { Box, Container, Paper, Typography } from "@mui/material";
import Header from "../../common/Header";
import { engine } from "./engine";
import SearchBoxSection from "./components/SearchBoxSection";
import SearchPage from "./components/SearchPage";

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
          <SearchBoxSection engine={engine}/>
          <SearchPage engine={engine}/>
        </Paper>
      </Container>
    </Box>
  );
};
