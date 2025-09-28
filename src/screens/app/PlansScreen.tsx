import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function PlansScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Plans</Text>
      <Text style={styles.placeholder}>Your workout plans will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#666',
  },
});
