import { createTheme } from "@mui/material/styles";

export const buildTheme = (P) =>
  createTheme({
    palette: {
      ...P.palette,
    },
    spacing: P.design.spacingUnit,
    shape: {
      borderRadius: P.design.radius,
    },
    shadows: [
      "none",
      P.design.shadows.level1,
      P.design.shadows.level2,
      P.design.shadows.card,
      ...Array(21).fill("none"),
    ],

    typography: {
      fontFamily: P.design.typography.fontFamily,
      h6: {
        fontWeight: P.design.typography.h6.weight,
        letterSpacing: P.design.typography.h6.letterSpacing,
        fontSize: "1rem",
      },
      body1: {
        fontSize: P.design.typography.body1.size,
        lineHeight: P.design.typography.body1.lineHeight,
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backdropFilter: "blur(12px)",
            border:
              P.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.06)",
            paddingTop: 0,
            paddingBottom: 0,
            boxShadow: P.design.shadows.appBar,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            paddingTop: "12px",
            paddingBottom: "12px",
            display: "flex",
            justifyContent: "space-between",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: P.design.radius,
            padding: "16px",
            marginBottom: "16px",
            boxShadow: P.design.shadows.level1,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            transition: "all 0.2s ease"
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              borderRadius: "8px",
              fontSize: "0.9rem",
            },
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            borderRadius: "6px",
            marginBottom: "4px",
            "&:hover": {
              backgroundColor: "rgba(0,0,0,0.04)",
              cursor: "Pointer",
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h6: {
            fontWeight: P.design.typography.h6.weight,
            letterSpacing: P.design.typography.h6.letterSpacing,
            fontSize: "1rem",
          },
          body1: {
            fontSize: "0.9rem",
            lineHeight: "1.4",
          },
        },
      },
    },
  });
