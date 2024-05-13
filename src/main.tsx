import Euclid from "@/assets/fonts/Euclid-Circular-A-Regular.ttf";
import { ThemeProvider, createTheme } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "react-day-picker/dist/style.css";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import { Toaster } from "sonner";
import App from "./App.tsx";
import "./i18n/i18n.ts";
import i18n from "./i18n/i18n.ts";
import "./index.scss";

const theme = createTheme({
  typography: {
    fontFamily: "Euclid",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
      @font-face {
        font-family: 'Euclid';
        src: local('Euclid'), local('Euclid-Regular'), url(${Euclid}) format('ttf');
        unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
      }
    `,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <I18nextProvider i18n={i18n}>
        <App />
        <Toaster closeButton />
      </I18nextProvider>
    </LocalizationProvider>
  </ThemeProvider>
);
