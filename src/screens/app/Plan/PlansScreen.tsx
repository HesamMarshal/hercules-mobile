import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { planStyles as styles } from '@/theme/styles';

export function PlansScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Plans</Text>
      <Text style={styles.placeholder}>Your workout plans will appear here</Text>
    </View>
  );
}
