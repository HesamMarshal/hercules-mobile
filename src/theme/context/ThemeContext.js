import React from 'react';

export const ThemeContext = React.createContext({
  theme: null,
  themeMode: 'light',
  isRTL: true,
  toggleTheme: () => {},
  setThemeMode: () => {},
  toggleRTL: () => {},
  setIsRTL: () => {},
});

// Custom hook to use theme
export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
