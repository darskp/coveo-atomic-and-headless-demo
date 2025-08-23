export const darkPalette = {
  palette: {
    mode: "dark",
    background: { default: "#121212", paper: "#1e1e1e" },
    primary: { main: "#90caf9", contrastText: "#000000" },
    secondary: { main: "#9c27b0", dark: "#7b1fa2", contrastText: "#ffffff" },
    divider: "rgba(255,255,255,0.12)",
  },
  design: {
    radius: 16,
    spacingUnit: 8,
    shadows: {
      appBar: "0 1px 0 rgba(255,255,255,0.1)",
      card: "0 8px 20px rgba(0,0,0,0.3)",
      level1: "0 2px 4px rgba(0,0,0,0.2)",
      level2: "0 4px 8px rgba(0,0,0,0.25)",
    },
    typography: {
      fontFamily: "'Inter','Roboto',sans-serif",
      h6: { weight: 700, letterSpacing: "0.5px" },
      body1: { size: "1.1rem", lineHeight: 1.7 },
    },
  },
};

