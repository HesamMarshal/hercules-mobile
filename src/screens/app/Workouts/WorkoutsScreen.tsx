import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Card, Title, Paragraph, Button, Text } from 'react-native-paper';
import { useAuth } from '../../../contexts/AuthContext';

interface Workout {
  id: string;
  name: string;
  description: string;
  duration: number;
  difficulty: string;
  createdAt: string;
}

const WorkoutsScreen = ({ navigation }: any) => {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    loadWorkouts();
  }, []);

  const loadWorkouts = async () => {
    if (!token) {
      setError('Please login to view workouts');
      setLoading(false);
      return;
    }

    try {
      setError('');
      // TODO: Replace with actual API call
      // const response = await fetch(`${API_BASE_URL}/workouts` , {
      //   headers: {
      //     'Authorization': `Bearer ${token}`,
      //   },
      // });
      // const data = await response.json();
      
      // Mock data for now
      const mockWorkouts: Workout[] = [
        {
          id: '1',
          name: 'Full Body Strength',
          description: 'Complete full body workout focusing on compound movements',
          duration: 60,
          difficulty: 'intermediate',
          createdAt: '2024-01-01',
        },
        {
          id: '2',
          name: 'Upper Body Power',
          description: 'Focus on chest, back, and shoulder strength',
          duration: 45,
          difficulty: 'beginner',
          createdAt: '2024-01-01',
        },
        {
          id: '3',
          name: 'Lower Body Blast',
          description: 'Intense leg and core workout',
          duration: 50,
          difficulty: 'advanced',
          createdAt: '2024-01-01',
        },
      ];
      
      setWorkouts(mockWorkouts);
    } catch (error: any) {
      setError('Failed to load workouts');
      console.error('Error loading workouts:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadWorkouts();
  };

  const renderWorkoutItem = ({ item }: { item: Workout }) => (
    <TouchableOpacity onPress={() => {/* Navigate to workout detail */}}>
      <Card style={styles.workoutCard} mode="elevated">
        <Card.Content>
          <Title style={styles.workoutName}>{item.name}</Title>
          <Paragraph style={styles.workoutDescription}>
            {item.description}
          </Paragraph>
          <View style={styles.workoutDetails}>
            <Text style={styles.detailText}>Duration: {item.duration} min</Text>
            <Text style={styles.detailText}>Difficulty: {item.difficulty}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading workouts...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button mode="contained" onPress={loadWorkouts}>
            Retry
          </Button>
        </View>
      ) : (
        <FlatList
          data={workouts}
          renderItem={renderWorkoutItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No workouts available</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    paddingBottom: 16,
  },
  workoutCard: {
    marginBottom: 12,
    elevation: 2,
  },
  workoutName: {
    fontSize: 18,
    marginBottom: 8,
  },
  workoutDescription: {
    color: '#666',
    marginBottom: 8,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#888',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default WorkoutsScreen;