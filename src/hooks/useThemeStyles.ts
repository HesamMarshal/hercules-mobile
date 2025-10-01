// src/hooks/useThemeStyles.ts
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '@/theme/context/ThemeContext';

export const useThemeStyles = (styleCreator: (theme: any) => any) => {
  const { theme } = useTheme();
  const styles = useMemo(() => StyleSheet.create(styleCreator(theme)), [theme, styleCreator]);
  return styles;
};
