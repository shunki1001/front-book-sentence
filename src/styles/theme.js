import React from "react";
import { createTheme } from "@mui/material/styles";

const fontFamily = [
  "Zen Old Mincho",
  "Roboto",
  "Helvetica",
  "Arial",
  "sans-serif",
].join(",");

const theme = createTheme({
  palette: {
    primary: {
      main: "#FDFEFF",
    },
    secondary: {
      main: "#0A0A0A",
    },
    success: {
      main: "#1976d2",
    },
    text: {
      primary: "#FDFEFF",
    },
    divider: "rgba(255,255,255,0.12)",
    background: {
      paper: "#0A0A0A",
      default: "#0A0A0A",
    },
  },
  typography: {
    fontFamily: fontFamily, // フォント
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: "#FDFEFF",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          border: "2px solid #707070",
          borderRadius: "5px",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          lineHeight: "20px",
          fontSize: "14px",
        },
        h2: {
          fontSize: "20px",
        },
        h6: {
          fontWeight: 900,
          fontSize: "16px",
        },
        caption: {
          opacity: 0.5,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          "&.MuiDialog-paper": {
            backgroundColor: "#262628",
            borderRadius: "20px",
          },
        },
      },
    },
    // MuiDialog: {
    //   styleOverrides: {
    //     root: {
    //       backgroundColor: "rgba(255,255,255,0.5)",
    //     },
    //   },
    // },
  },
});

export default theme;
