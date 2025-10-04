import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { colors } from '@/theme/properties/colors';

interface LoadingProps {
  message?: string; // optional custom message
}

const Loading: React.FC<LoadingProps> = ({ message = 'در حال بارگذاری...' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.activeTintColor} />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    marginTop: 12,
    fontSize: 16,
    color: colors.activeTintColor,
  },
});

export default Loading;
