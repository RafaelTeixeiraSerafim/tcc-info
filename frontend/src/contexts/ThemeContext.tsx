import { CssBaseline, ThemeProvider } from "@mui/material";
import React, { useEffect, useState } from "react";
import { ThemeContext } from ".";
import { darkTheme, lightTheme } from "../themes";

interface ThemeProviderWrapperProps {
  children: React.ReactElement;
}

const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [hasCheckedLocalStorage, setHasCheckedLocalStorage] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setDarkMode(storedTheme === "dark");
    }

    setHasCheckedLocalStorage(true);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (!hasCheckedLocalStorage) return;

    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode, hasCheckedLocalStorage]);

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
