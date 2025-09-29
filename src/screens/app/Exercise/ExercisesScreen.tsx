import { useAuth } from '@/contexts/AuthContext';
import { exerciseAPI } from '@/services/exerciseApi';
import { Exercise } from '@/types/exercise';
import React, { useState, useEffect } from 'react';
import {
  View,  
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  
} from 'react-native';
import { Card, Title, Paragraph, Chip, Searchbar, Button } from 'react-native-paper';
import { styles } from './ExercisesScreen.styles';



export const ExercisesScreen = ({ navigation }: any) => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedbody_part, setSelectedbody_part] = useState<string>('all');
  const [error, setError] = useState<string>('');
  const { isAuthenticated, logout } = useAuth();

  const body_parts = [
    'all',
    'chest',
    'back',
    'legs',
    'shoulders',
    'arms',
    'core',
    'cardio'
  ];

  useEffect(() => {
    loadExercises();
  }, []);

  useEffect(() => {
    filterExercises();
  }, [exercises, searchQuery, selectedbody_part]);

  const loadExercises = async () => {
    // Check if user is authenticated
    if (!isAuthenticated) {
      setError('Please login to view exercises');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const data = await exerciseAPI.getAllExercises();
      setExercises(data);
    } catch (error: any) {
      console.error('Error loading exercises:', error);
      
      if (error.message.includes('Unauthorized')) {
        setError('Session expired. Please login again.');
        // Optionally auto-logout after 2 seconds
        setTimeout(() => {
          logout();
        }, 2000);
      } else {
        setError('Failed to load exercises. Please try again.');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadExercises();
  };

  const filterExercises = () => {
    let filtered = exercises;

    if (searchQuery) {
      filtered = filtered.filter(exercise =>
        exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exercise.body_part.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedbody_part !== 'all') {
      filtered = filtered.filter(exercise =>
        exercise.body_part.toLowerCase() === selectedbody_part.toLowerCase()
      );
    }

    setFilteredExercises(filtered);
  };

 const handleExercisePress = (exercise: Exercise) => {
  navigation.navigate('ExerciseDetail', { exerciseId: exercise.id });
};

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity onPress={() => handleExercisePress(item)}>
      <Card style={styles.exerciseCard} mode="elevated">
        <Card.Content>
          <View style={styles.exerciseHeader}>
            <Title style={styles.exerciseName}>{item.name}</Title>
            <Chip 
              mode="outlined" 
              style={[
                styles.difficultyChip,
                item.difficulty === 'beginner' && styles.beginnerChip,
                item.difficulty === 'intermediate' && styles.intermediateChip,
                item.difficulty === 'advanced' && styles.advancedChip,
              ]}
            >
              {item.difficulty}
            </Chip>
          </View>
          
          <Chip 
            mode="flat" 
            style={styles.body_partChip}
            textStyle={styles.body_partText}
          >
            {item.body_part}
          </Chip>
          
          <Paragraph numberOfLines={2} style={styles.exerciseDescription}>
            {item.description}
          </Paragraph>
          
          {item.exercise_type && (
            <View style={styles.exercise_typeContainer}>
              <Paragraph style={styles.exercise_typeLabel}>exercise_type: </Paragraph>
              <Paragraph style={styles.exercise_typeValue}>{item.exercise_type}</Paragraph>
            </View>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const renderbody_partFilter = () => (
    <View style={styles.filterContainer}>
      <FlatList
        horizontal
        data={body_parts}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <Chip
            mode={selectedbody_part === item ? 'flat' : 'outlined'}
            selected={selectedbody_part === item}
            onPress={() => setSelectedbody_part(item)}
            style={styles.body_partFilterChip}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Chip>
        )}
      />
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Paragraph style={styles.loadingText}>Loading exercises...</Paragraph>
      </View>
    );
  }

  if (!isAuthenticated) {
    return (
      <View style={styles.centered}>
        <Paragraph style={styles.errorText}>Please login to view exercises</Paragraph>
        <Button mode="contained" onPress={() => navigation.navigate('MobileNumber')}>
          Login
        </Button>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search exercises..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
      />

      {renderbody_partFilter()}

      {error ? (
        <View style={styles.errorContainer}>
          <Paragraph style={styles.errorText}>{error}</Paragraph>
          <Button mode="contained" onPress={loadExercises} style={styles.retryButton}>
            Retry
          </Button>
        </View>
      ) : (
        <FlatList
          data={filteredExercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#0000ff']}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Paragraph style={styles.emptyText}>
                {searchQuery || selectedbody_part !== 'all' 
                  ? 'No exercises found matching your criteria'
                  : 'No exercises available'
                }
              </Paragraph>
            </View>
          }
        />
      )}
    </View>
  );
};
