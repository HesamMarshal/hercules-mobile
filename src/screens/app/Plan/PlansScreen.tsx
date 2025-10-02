// src/screens/PlansScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
// import { planStyles as styles } from '@/theme/styles';
import { useAuth } from '@/contexts/AuthContext';
import { API_BASE_URL, fetchWithAuth } from '@/services/api';
import { ActivityIndicator, Button, Card, Paragraph, Title } from 'react-native-paper';
import { workoutStyles as styles } from '@/theme/styles';
import { RefreshControl } from 'react-native-gesture-handler';
import { workoutAPI } from '@/services/workoutsApi';

interface Plan {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
}

const PlansScreen = ({ navigation }: any) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    // In a real app, you'd fetch from your backend
    loadPlans();
  }, []);

  const loadPlans = async () => {
    if (!token) {
      // TODO: Transalte
      setError('Please login to view plans');
      setLoading(false);
      return;
    }

    try {
      setError('');
      // TODO: Replace with actual API call
      const response = await fetchWithAuth('/plan');
      const data = await response.json();
      const plans = data.data;
      const workouts = await workoutAPI.getAllWorkoutsByPlanId(plans[0].id);
      console.log(workouts);

      setPlans(plans);
    } catch (error: any) {
      setError('Failed to load plans');
      console.error('Error loading plans:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadPlans();
  };

  const renderPlanItem = ({ item }: { item: Plan }) => {
    console.log(item.id);
    return (
      <TouchableOpacity
        onPress={() => {
          // TODO: Navigate to workouts screen Plan detail => get allworkouts by plan ID
        }}
      >
        <Card style={styles.workoutCard} mode="elevated">
          <Card.Content>
            <Title style={styles.workoutName}>{item.name}</Title>
            {/* <Paragraph style={styles.workoutDescription}>{item.description}</Paragraph> */}
            <View style={styles.workoutDetails}>
              <Text style={styles.detailText}>Duration: {item.start_date} min</Text>
              <Text style={styles.detailText}>Difficulty: {item.end_date}</Text>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    // TODO: Translate it
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading plans...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={loadPlans}>
            Retry
          </Button>
        </View>
      ) : (
        <FlatList
          data={plans}
          renderItem={renderPlanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
          // TODO: Translate
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No Plan available</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

export default PlansScreen;
