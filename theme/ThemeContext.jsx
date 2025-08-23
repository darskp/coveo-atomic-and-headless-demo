import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import {darkPalette} from "./palette.dark";
import {lightPalette} from "./palette.light";
import {buildTheme}  from "./theme";

const ThemeModeContext = createContext();
export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }) => {
  const [mode, setMode] = useState(localStorage.getItem("themeMode") || "dark");

  useEffect(() => localStorage.setItem("themeMode", mode), [mode]);

  const toggleTheme = () => setMode(m => (m === "dark" ? "light" : "dark"));

  const P = mode === "dark" ? darkPalette : lightPalette;   
  const theme = useMemo(() => buildTheme(P), [P]);           

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
