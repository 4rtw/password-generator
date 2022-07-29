import PasswordGenerator from "./PasswordGenerator";
import { useMemo, useState, useEffect } from "react";
import {
  createTheme,
  CssBaseline,
  ThemeProvider,
  useMediaQuery,
} from "@mui/material";
import { cookieService } from "./Service/CookieService";

const App = () => {
  //Tab title
  useEffect(() => {
    document.title = "Password generator";
  }, []);

  // handle dark mode
  const [darkMode, setDarkMode] = useState(
    cookieService.getCookie("darkMode") || "dark"
  );

  const setMode = (mode) => {
    cookieService.setCookie("darkMode", mode);
    setDarkMode(mode);
  };

  const prefersDarkMode = useMediaQuery(`(prefers-color-scheme: ${darkMode})`);

  const toogleDarkMode = () => {
    darkMode === "light" ? setMode("dark") : setMode("light");
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? "dark" : "light",
        },
      }),
    [prefersDarkMode]
  );
  // end handle dark mode

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PasswordGenerator setTheme={() => toogleDarkMode()} />
    </ThemeProvider>
  );
};

export default App;
