import { IconButton } from "@mui/material";
import { useThemeMode } from "./ThemeContext";
import { LightMode, DarkMode } from "@mui/icons-material";

function ThemeToggleChip() {
  const { mode, toggleTheme } = useThemeMode();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {mode === "dark" ? <LightMode /> : <DarkMode />}
    </IconButton>
  );
}

export default ThemeToggleChip;
