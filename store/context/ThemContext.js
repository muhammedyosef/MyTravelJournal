import React, { createContext, useState } from "react";
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };
  const theme = {
    isDarkMode,
    toggleTheme,
    colors: isDarkMode
      ? {
          // Dark theme colors
          background: "#121212",
          text: "#ffffff",
          cardBackground: "#1e1e1e",
          buttonBackground: "#6200ee",
          buttonText: "#ffffff",
          headerBackground: "#1e1e1e",
          headerText: "#ffffff",
        }
      : {
          // Light theme colors
          background: "#ffffff",
          text: "#000000",
          cardBackground: "#f5f5f5",
          buttonBackground: "#6200ee",
          buttonText: "#ffffff",
          headerBackground: "#6200ee",
          headerText: "#ffffff",
        },
  };
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};
