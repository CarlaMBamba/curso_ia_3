import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { appTheme } from "./theme/appTheme";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("No se encontro el elemento root para arrancar React.");
}

createRoot(rootElement).render(
  <StrictMode>
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
