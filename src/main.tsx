import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
// import "./index.css";
import { BrowserRouter } from "react-router-dom";
// import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { createTheme, ThemeProvider } from "@mui/material/styles";

// use default theme
// const theme = createTheme();

// Or Create your Own theme:
const theme = createTheme({
  palette: {
    secondary: {
      main: "#E33E7F",
    },
    primary: {
      main: "#617AFF",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      {/* <MuiThemeProvider theme={theme}> */}
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      {/* </MuiThemeProvider> */}
    </BrowserRouter>
  </StrictMode>
);
