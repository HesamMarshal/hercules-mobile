import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '@/theme/context/ThemeContext';

const ThemeTest = () => {
  const { theme } = useTheme();

  return (
    <View style={{ padding: 20 }}>
      <Text style={theme.typography.title.medium}>
        Theme Test - RTL: {theme.isRTL ? 'Yes' : 'No'}
      </Text>
      <Text style={theme.typography.body.medium}>Colors: {theme.colors.primary}</Text>
      <Text style={theme.typography.body.small}>Spacing: {theme.spacing.md}</Text>
    </View>
  );
};

export default ThemeTest;
