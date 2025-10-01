import React, { useState, useMemo, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { createTheme } from '../index';
import { fallbackTheme } from '../fallbackTheme';
import { useColorScheme } from 'react-native';

export const ThemeProvider = ({ children, defaultMode = 'light', defaultRTL = true }) => {
  const colorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState(defaultMode);
  const [isRTL, setIsRTL] = useState(defaultRTL);

  // Sync with system color scheme
  useEffect(() => {
    if (defaultMode === 'auto') {
      setThemeMode(colorScheme);
    }
  }, [colorScheme, defaultMode]);

  // Create theme object with error handling
  const theme = useMemo(() => {
    try {
      return createTheme(themeMode, isRTL);
    } catch (error) {
      console.error('Error creating theme, using fallback:', error);
      return {
        ...fallbackTheme,
        mode: themeMode,
        isRTL,
        components: {},
      };
    }
  }, [themeMode, isRTL]);

  // Toggle functions
  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const toggleRTL = () => {
    setIsRTL((prev) => !prev);
  };

  const contextValue = {
    theme,
    themeMode,
    isRTL,
    toggleTheme,
    setThemeMode: (mode) => setThemeMode(mode),
    toggleRTL,
    setIsRTL: (rtl) => setIsRTL(rtl),
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
