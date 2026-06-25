import { createTheme } from "@mui/material/styles";

export const appTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#2563eb",
    },
    secondary: {
      main: "#0f766e",
    },
    background: {
      default: "#f7f8fb",
      paper: "#ffffff",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: ["Inter", "Segoe UI", "Arial", "sans-serif"].join(","),
  },
});
