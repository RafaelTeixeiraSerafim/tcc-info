import { createTheme } from "@mui/material/styles";
import type {} from "@mui/material/themeCssVarsAugmentation";
import "../styles/index.css";

/* Cores padrões da nossa logo: */
/* Verde: #29524A */
/* Roxo: #20275A */

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#e37e03",
    },
    secondary: {
      main: "#467fbd",
    },
    background: {
      default: "#f3f3f3",
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      fontSize: "5rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#e37e03",
    },
    secondary: {
      main: "#7b9ec4",
    },
    background: {
      default: "#0e0e0e",
    },
  },
  typography: {
    fontFamily: "Inter",
    h1: {
      fontSize: "5rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const dashboardTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#3d79ba",
        },
        secondary: {
          main: "#e37e03",
        },
        background: {
          default: "#f3f3f3",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#467fbd",
        },
        secondary: {
          main: "#e37e03",
        },
        background: {
          default: "#0e0e0e",
        },
      },
    },
  },
  typography: {
    fontFamily: "Inter",
    body1: {
      fontSize: "1rem",
    },
    h1: {
      fontSize: "5rem",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

export { dashboardTheme, lightTheme, darkTheme };
