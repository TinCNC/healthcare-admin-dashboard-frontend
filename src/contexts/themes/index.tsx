import { createTheme } from "@mui/material";

// const customTheme = createTheme({
//   customVariable: {
//     custom: "#330f49",
//   },
// });

export const LightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1976D2",
      light: "#4791db",
      dark: "#115293",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#fff",
            }),
        }),
      },
    },
  },
});

export const DarkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#15BFFD",
      light: "#56CCF2",
      dark: "#377DFF",
    },
    secondary: {
      main: "#6E86C2",
      // main: "#8F8F8F",
      dark: "#475D96",
    },
    info: {
      main: "#8F8F8F",
    },
    success: {
      main: "#38CB89",
      light: "#00FF85",
      dark: "#4DB678",
    },
    background: {
      default: "#1B1C31",
      paper: "#222338",
    },
  },
  components: {
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: "12px",
        },
        secondary: {
          fontSize: "11px",
          color: "#8F8F8F",
        },
      },
    },

    MuiListItemSecondaryAction: {
      styleOverrides: {
        root: {
          right: "0",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              color: "#fff",
            }),
        }),
      },
    },
  },
});
