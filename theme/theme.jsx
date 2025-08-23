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
    ],
    typography: {
      fontFamily: P.design.typography.fontFamily,
      h6: {
        fontWeight: P.design.typography.h6.weight,
        letterSpacing: P.design.typography.h6.letterSpacing,
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
      MuiChip: {
        styleOverrides: {
          root: ({ theme }) => ({
            fontWeight: "bold",
            padding: "6px 12px",
            borderRadius: "9999px",
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            cursor: "pointer",
            "&:hover": {
              backgroundColor: theme.palette.secondary.dark,
            },
          }),
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: P.design.radius,
            padding: "24px",
            marginBottom: "24px",
            boxShadow: P.design.shadows.card,
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          h6: {
            fontWeight: P.design.typography.h6.weight,
            letterSpacing: P.design.typography.h6.letterSpacing,
          },
          body1: {
            fontSize: P.design.typography.body1.size,
            lineHeight: P.design.typography.body1.lineHeight,
          },
        },
      },
    },
  });
