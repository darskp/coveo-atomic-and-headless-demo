import { AppBar, Container, Toolbar, Typography } from "@mui/material";
import ThemeToggleChip from "../../theme/ThemeToggleChip";

const Header = () => {
  return (
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
          <Typography variant="h6">Coveo Headless + React</Typography>
          <ThemeToggleChip />
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
