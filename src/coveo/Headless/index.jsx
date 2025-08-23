import { useThemeMode } from "../../../theme/ThemeContext";
import {
  AppBar,
  Box,
  Container,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import ThemeToggleChip from "../../../theme/ThemeToggleChip";

export const Headless = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
      }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          mt: 2,
          maxWidth: "lg",
          mx: "auto",
          borderRadius: 2,
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Toolbar>
            <Typography variant="h6">Coveo (Headless + MUI)</Typography>
            <ThemeToggleChip />
          </Toolbar>
        </Container>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 0 }}>
        <Paper>
          <Typography variant="h4" gutterBottom></Typography>
          <Typography color="text.secondary">
            Result list
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
