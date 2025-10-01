import { exerciseAPI } from '@/services/exerciseApi';
import { Exercise } from '@/types/exercise';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Linking, ActivityIndicator, Dimensions } from 'react-native';
import { Card, Title, Paragraph, Text, Chip, Button, Divider } from 'react-native-paper';

const { width } = Dimensions.get('window');

const ExerciseDetailScreen = ({ route, navigation }: any) => {
  const { exerciseId } = route.params;
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadExerciseDetail();
  }, [exerciseId]);

  const loadExerciseDetail = async () => {
    try {
      setError('');
      const data = await exerciseAPI.getExerciseById(exerciseId);
      setExercise(data);
    } catch (error: any) {
      setError('Failed to load exercise details. Please try again.');
      console.error('Error loading exercise detail:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPress = () => {
    if (exercise?.video_link) {
      Linking.openURL(exercise.video_link).catch((err) =>
        console.error('Failed to open video URL:', err)
      );
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return '#4caf50';
      case 'intermediate':
        return '#ff9800';
      case 'advanced':
        return '#f44336';
      default:
        return '#666';
    }
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
        <Text style={styles.loadingText}>Loading exercise details...</Text>
      </View>
    );
  }

  if (error || !exercise) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error || 'Exercise not found'}</Text>
        <Button mode="contained" onPress={loadExerciseDetail} style={styles.retryButton}>
          Retry
        </Button>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Card style={styles.card}>
        {/* Exercise Header */}
        <Card.Content style={styles.header}>
          <Title style={styles.exerciseName}>{exercise.name}</Title>
          <View style={styles.chipsContainer}>
            {/* <Chip
              mode="flat"
              style={[
                styles.difficultyChip,
                { backgroundColor: getDifficultyColor(exercise.difficulty) },
              ]}
              textStyle={styles.difficultyText}
            >
              {exercise.difficulty.toUpperCase()}
            </Chip> */}
            <Chip mode="outlined" style={styles.body_partChip}>
              {exercise.body_part}
            </Chip>
          </View>
        </Card.Content>

        <Divider style={styles.divider} />

        {/* Exercise Description */}
        <Card.Content style={styles.section}>
          <Title style={styles.sectionTitle}>Instructions</Title>
          <Paragraph style={styles.description}>{exercise.instruction}</Paragraph>
        </Card.Content>

        <Divider style={styles.divider} />

        {/* Exercise Details */}
        <Card.Content style={styles.section}>
          <Title style={styles.sectionTitle}>Details</Title>

          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Muscle Group:</Text>
            <Text style={styles.detailValue}>{exercise.body_part}</Text>
          </View>

          {/* <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Difficulty:</Text>
            <Text style={styles.detailValue}>{exercise.difficulty}</Text>
          </View> */}

          {exercise.exercise_type && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>exercise_type:</Text>
              <Text style={styles.detailValue}>{exercise.exercise_type}</Text>
            </View>
          )}
        </Card.Content>

        {/* Instructions */}
        {exercise.instructions && (
          <>
            <Divider style={styles.divider} />
            <Card.Content style={styles.section}>
              <Title style={styles.sectionTitle}>Instructions</Title>
              <Paragraph style={styles.instructions}>{exercise.instructions}</Paragraph>
            </Card.Content>
          </>
        )}

        {/* Video Link */}
        {exercise.video_link && (
          <>
            <Divider style={styles.divider} />
            <Card.Content style={styles.section}>
              <Title style={styles.sectionTitle}>Video Demonstration</Title>
              <Button
                mode="contained"
                icon="video"
                onPress={handleVideoPress}
                style={styles.videoButton}
              >
                Watch Video
              </Button>
            </Card.Content>
          </>
        )}
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    marginTop: 8,
  },
  card: {
    margin: 16,
    elevation: 4,
  },
  header: {
    paddingBottom: 0,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  difficultyChip: {
    marginRight: 8,
  },
  difficultyText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  body_partChip: {
    backgroundColor: '#e3f2fd',
  },
  divider: {
    marginVertical: 8,
  },
  section: {
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
  },
  videoButton: {
    marginTop: 8,
  },
});

export default ExerciseDetailScreen;
