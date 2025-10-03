// src/screens/WorkoutScreen.tsx
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, Button, Card, Title, FAB } from 'react-native-paper';
import { workoutStyles as styles } from '@/theme/styles';
import { RefreshControl } from 'react-native-gesture-handler';
import { workoutAPI } from '@/services/workoutsApi';
import { Workout } from '@/types/workout.type';
import { colors } from '@/theme/properties/colors';

const isRTL = I18nManager.isRTL;

interface WorkoutScreenProps {
  route: any;
  navigation: any;
}

const WorkoutScreen = ({ route, navigation }: WorkoutScreenProps) => {
  const { planId, planName } = route.params;
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [exercisesLoading, setExercisesLoading] = useState<{ [key: string]: boolean }>({});
  const { token } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      title: planName || 'تمرین‌ها',
    });
    loadWorkouts();
  }, [planId]);

  const loadWorkouts = async () => {
    if (!token) {
      setError('لطفاً برای مشاهده تمرین‌ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const workoutsData = await workoutAPI.getAllWorkoutsByPlanId(planId);

      if (workoutsData && workoutsData.length > 0) {
        // Load exercises for each workout
        const workoutsWithExercises = await Promise.all(
          workoutsData.map(async (workout: Workout) => {
            try {
              setExercisesLoading((prev) => ({ ...prev, [workout.id]: true }));
              const exercises = await workoutAPI.getExercisesByWorkoutId(workout.id);
              return { ...workout, exercises: exercises || [] };
            } catch (error) {
              console.error(`Error loading exercises for workout ${workout.id}:`, error);
              return { ...workout, exercises: [] };
            } finally {
              setExercisesLoading((prev) => ({ ...prev, [workout.id]: false }));
            }
          })
        );
        setWorkouts(workoutsWithExercises);
      } else {
        setWorkouts(workoutsData || []);
      }
    } catch (error: any) {
      setError('خطا در بارگذاری تمرین‌ها');
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

  const handleWorkoutPress = (workout: Workout) => {
    // Navigate to workout detail or start workout
    navigation.navigate('WorkoutDetail', {
      workoutId: workout.id,
      workoutName: workout.name,
      planId: planId,
    });
  };

  const handleStartWorkout = (workout: Workout) => {
    Alert.alert('شروع تمرین', `آیا می‌خواهید تمرین "${workout.name}" را شروع کنید؟`, [
      { text: 'لغو', style: 'cancel' },
      {
        text: 'شروع',
        onPress: () => {
          // Navigate to active workout screen
          navigation.navigate('ActiveWorkout', {
            workoutId: workout.id,
            workoutName: workout.name,
          });
        },
      },
    ]);
  };

  const handleAddWorkout = () => {
    navigation.navigate('CreateWorkout', {
      planId: planId,
      onWorkoutCreated: loadWorkouts,
    });
  };

  const renderExerciseItem = (exercise: Exercise) => (
    <View
      key={exercise.id}
      style={[workoutStyles.exerciseItem, workoutStyles.exerciseItemContainer]}
    >
      <MaterialIcons
        name="sports-gymnastics"
        size={14}
        color="#666"
        style={workoutStyles.exerciseIcon}
      />
      <Text style={[workoutStyles.exerciseText, workoutStyles.text]} numberOfLines={1}>
        {exercise.name}
      </Text>
      <View style={workoutStyles.exerciseDetails}>
        {exercise.sets && <Text style={workoutStyles.exerciseDetailText}>{exercise.sets} ست</Text>}
        {exercise.reps && (
          <Text style={workoutStyles.exerciseDetailText}>{exercise.reps} تکرار</Text>
        )}
      </View>
    </View>
  );

  const renderWorkoutItem = ({ item }: { item: Workout }) => {
    const isLoadingExercises = exercisesLoading[item.id];
    const hasExercises = item.exercises && item.exercises.length > 0;

    return (
      <Card style={[styles.workoutCard, workoutStyles.card]} mode="elevated">
        <Card.Content style={workoutStyles.cardContent}>
          {/* Workout Header */}
          <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
            <View style={workoutStyles.workoutHeader}>
              <View style={workoutStyles.workoutTitleContainer}>
                <Title style={[styles.workoutName, workoutStyles.text]}>{item.name}</Title>
                {item.difficulty && (
                  <View style={workoutStyles.difficultyBadge}>
                    <Text style={workoutStyles.difficultyText}>{item.difficulty}</Text>
                  </View>
                )}
              </View>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="#666"
                style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
              />
            </View>
          </TouchableOpacity>

          {/* Workout Details */}
          <View style={workoutStyles.detailsContainer}>
            {item.description && (
              <Text style={[styles.detailText, workoutStyles.text]}>{item.description}</Text>
            )}
            {item.duration && (
              <View style={workoutStyles.detailItem}>
                <MaterialIcons name="schedule" size={14} color="#666" />
                <Text style={[styles.detailText, workoutStyles.text]}>{item.duration} دقیقه</Text>
              </View>
            )}
          </View>

          {/* Exercises Section */}
          <View style={workoutStyles.exercisesSection}>
            <Text style={[workoutStyles.exercisesTitle, workoutStyles.text]}>
              حرکات ({hasExercises ? item.exercises!.length : 0})
            </Text>

            {isLoadingExercises ? (
              <View style={workoutStyles.loadingExercises}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={[workoutStyles.loadingText, workoutStyles.text]}>
                  در حال بارگذاری حرکات...
                </Text>
              </View>
            ) : hasExercises ? (
              <View style={workoutStyles.exercisesList}>
                {item.exercises!.slice(0, 3).map(renderExerciseItem)}
                {item.exercises!.length > 3 && (
                  <Text style={[workoutStyles.moreExercisesText, workoutStyles.text]}>
                    + {item.exercises!.length - 3} حرکت دیگر
                  </Text>
                )}
              </View>
            ) : (
              <Text style={[workoutStyles.noExercisesText, workoutStyles.text]}>
                هیچ حرکتی برای این تمرین تعریف نشده
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={workoutStyles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => handleWorkoutPress(item)}
              style={workoutStyles.detailButton}
            >
              مشاهده جزئیات
            </Button>
            <Button
              mode="contained"
              onPress={() => handleStartWorkout(item)}
              style={workoutStyles.startButton}
            >
              شروع تمرین
            </Button>
          </View>
        </Card.Content>
      </Card>
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, workoutStyles.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, workoutStyles.text]}>در حال بارگذاری تمرین‌ها...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, workoutStyles.container]}>
      {error ? (
        <View style={[styles.errorContainer, workoutStyles.container]}>
          <Text style={[styles.errorText, workoutStyles.text]}>{error}</Text>
          <Button mode="contained" onPress={loadWorkouts} style={workoutStyles.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.listContainer, workoutStyles.listContainer]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.activeTintColor]}
              />
            }
            ListEmptyComponent={
              <View style={[styles.emptyContainer, workoutStyles.container]}>
                <MaterialIcons name="fitness-center" size={64} color="#999" />
                <Text style={[styles.emptyText, workoutStyles.text]}>
                  هیچ تمرینی برای این پلن وجود ندارد
                </Text>
                <Text style={[workoutStyles.emptySubtext, workoutStyles.text]}>
                  اولین تمرین را به این پلن اضافه کنید
                </Text>
                <Button
                  mode="contained"
                  onPress={handleAddWorkout}
                  style={workoutStyles.emptyButton}
                  icon="plus"
                >
                  افزودن تمرین
                </Button>
              </View>
            }
          />

          {/* Floating Action Button */}
          {workouts.length > 0 && (
            <FAB style={workoutStyles.fab} icon="plus" onPress={handleAddWorkout} color="white" />
          )}
        </>
      )}
    </View>
  );
};

const workoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: isRTL ? 'row-reverse' : 'row',
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  cardContent: {
    alignItems: isRTL ? 'flex-end' : 'flex-start',
  },
  text: {
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  workoutHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
    marginBottom: 12,
  },
  workoutTitleContainer: {
    flex: 1,
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: isRTL ? 'flex-end' : 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  listContainer: {
    paddingVertical: 8,
    flexGrow: 1,
  },
  button: {
    marginTop: 16,
    alignSelf: 'center',
  },
  emptySubtext: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
    textAlign: isRTL ? 'right' : 'left',
    marginBottom: 16,
  },
  emptyButton: {
    marginTop: 16,
    alignSelf: 'center',
  },
  exercisesSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginBottom: 16,
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  exercisesList: {
    width: '100%',
  },
  exerciseItemContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  exerciseItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    flex: 1,
  },
  exerciseIcon: {
    marginHorizontal: 8,
  },
  exerciseText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  exerciseDetails: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
  },
  exerciseDetailText: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 4,
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyBadge: {
    backgroundColor: colors.activeTintColor,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginHorizontal: 8,
  },
  difficultyText: {
    fontSize: 10,
    color: 'white',
    fontWeight: 'bold',
  },
  moreExercisesText: {
    fontSize: 12,
    color: colors.activeTintColor,
    marginTop: 4,
    textAlign: isRTL ? 'right' : 'left',
  },
  noExercisesText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: isRTL ? 'right' : 'left',
  },
  loadingExercises: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  loadingText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 8,
  },
  detailButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  startButton: {
    flex: 1,
    marginHorizontal: 4,
    backgroundColor: '#28a745',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: isRTL ? undefined : 0,
    left: isRTL ? 0 : undefined,
    bottom: 0,
    backgroundColor: colors.activeTintColor,
  },
});

export default WorkoutScreen;
