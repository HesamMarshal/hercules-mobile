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
import { WorkoutScreenRouteProp, WorkoutScreenNavigationProp } from '@/types/navigation';
import { practiceAPI } from '@/services/practiceApi';

const isRTL = I18nManager.isRTL;

interface WorkoutScreenProps {
  route: WorkoutScreenRouteProp;
  navigation: WorkoutScreenNavigationProp;
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
  }, [planId, planName]);

  const loadWorkouts = async () => {
    if (!token) {
      setError('لطفاً برای مشاهده تمرین‌ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const workoutsData = await workoutAPI.getAllWorkoutsByPlanId(+planId);

      if (workoutsData && workoutsData.length > 0) {
        // Load practices for each workout instead of exercises
        const workoutsWithPractices = await Promise.all(
          workoutsData.map(async (workout: Workout) => {
            try {
              setExercisesLoading((prev) => ({ ...prev, [workout.id]: true }));
              // Get practices by workout ID instead of exercises
              const practices = await practiceAPI.getPracticesByWorkoutId(workout.id);

              return { ...workout, practices: practices || [] };
            } catch (error) {
              console.error(`Error loading practices for workout ${workout.id}:`, error);
              return { ...workout, practices: [] };
            } finally {
              setExercisesLoading((prev) => ({ ...prev, [workout.id]: false }));
            }
          })
        );
        setWorkouts(workoutsWithPractices);
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
    navigation.navigate('PracticeScreen', {
      workoutId: workout.id,
      workoutName: workout.name,
      planId: planId,
    });
  };
  const handleStartWorkout = (workout: Workout) => {
    console.log('Call active workout');
    Alert.alert('شروع تمرین', `آیا می‌خواهید تمرین "${workout.name}" را شروع کنید؟`, [
      { text: 'لغو', style: 'cancel' },
      {
        text: 'شروع',
        onPress: () => {
          // Navigate to active workout screen
          // TODO : Create ActiveWorkout screen???  Session

          navigation.navigate('ActiveWorkout', {
            workoutId: workout.id,
            workoutName: workout.name,
          });
        },
      },
    ]);
  };

  const handleAddWorkout = () => {
    // TODO: Add CreateWorkoutScreen
    navigation.navigate('CreateWorkout', {
      planId: planId,
      onWorkoutCreated: loadWorkouts,
    });
  };

  // TODO: Render Practices
  const renderExerciseItem = (exercise: Exercise) => (
    <View key={exercise.id} style={[styles.exerciseItem, styles.exerciseItemContainer]}>
      <MaterialIcons name="sports-gymnastics" size={14} color="#666" style={styles.exerciseIcon} />
      <Text style={[styles.exerciseText, styles.text]} numberOfLines={1}>
        {exercise.name}
      </Text>
      <View style={styles.exerciseDetails}>
        {exercise.sets && <Text style={styles.exerciseDetailText}>{exercise.sets} ست</Text>}
        {exercise.reps && <Text style={styles.exerciseDetailText}>{exercise.reps} تکرار</Text>}
      </View>
    </View>
  );
  const renderPracticeItem = (practice: Practice) => (
    <View key={practice.id} style={[styles.practiceItem, styles.practiceItemContainer]}>
      <MaterialIcons name="fitness-center" size={16} color="#666" style={styles.practiceIcon} />
      <Text style={[styles.practiceText, styles.text]} numberOfLines={1}>
        {practice.exercise.name}
      </Text>
      <View style={styles.practiceDetails}>
        <Text style={styles.practiceDetailText}>{practice.sets} ست</Text>
        <Text style={styles.practiceDetailText}>{practice.reps} تکرار</Text>
      </View>
    </View>
  );

  const renderWorkoutItem = ({ item }: { item: Workout }) => {
    const isLoadingPractices = exercisesLoading[item.id]; // You might want to rename this state to practicesLoading
    const hasPractices = item.practices && item.practices.length > 0;

    return (
      <Card style={[styles.workoutCard, styles.card]} mode="elevated">
        <Card.Content style={styles.cardContent}>
          {/* Workout Header */}
          <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
            <View style={styles.workoutHeader}>
              <View style={styles.workoutTitleContainer}>
                <Title style={[styles.workoutName, styles.text]}>{item.name}</Title>
                {item.difficulty && (
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{item.difficulty}</Text>
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
          <View style={styles.detailsContainer}>
            {item.description && (
              <Text style={[styles.detailText, styles.text]}>{item.description}</Text>
            )}
            {item.duration && (
              <View style={styles.detailItem}>
                <MaterialIcons name="schedule" size={14} color="#666" />
                <Text style={[styles.detailText, styles.text]}>{item.duration} دقیقه</Text>
              </View>
            )}
          </View>

          {/* Practices Section (instead of Exercises) */}
          <View style={styles.practicesSection}>
            <Text style={[styles.practicesTitle, styles.text]}>
              تمرین‌ها ({hasPractices ? item.practices!.length : 0})
            </Text>

            {isLoadingPractices ? (
              <View style={styles.loadingPractices}>
                <ActivityIndicator size="small" color="#007AFF" />
                <Text style={[styles.loadingText, styles.text]}>در حال بارگذاری تمرین‌ها...</Text>
              </View>
            ) : hasPractices ? (
              <View style={styles.practicesList}>
                {item.practices!.slice(0, 3).map(renderPracticeItem)}
                {item.practices!.length > 3 && (
                  <Text style={[styles.morePracticesText, styles.text]}>
                    + {item.practices!.length - 3} تمرین دیگر
                  </Text>
                )}
              </View>
            ) : (
              <Text style={[styles.noPracticesText, styles.text]}>
                هیچ تمرینی برای این workout تعریف نشده
              </Text>
            )}
          </View>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <Button
              mode="outlined"
              onPress={() => handleWorkoutPress(item)}
              style={styles.detailButton}
            >
              مشاهده جزئیات
            </Button>
            <Button
              mode="contained"
              onPress={() => handleStartWorkout(item)}
              style={styles.startButton}
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
      <View style={[styles.centered, styles.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, styles.text]}>در حال بارگذاری تمرین‌ها...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.container]}>
      {error ? (
        <View style={[styles.errorContainer, styles.container]}>
          <Text style={[styles.errorText, styles.text]}>{error}</Text>
          <Button mode="contained" onPress={loadWorkouts} style={styles.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.listContainer, styles.listContainer]}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[colors.activeTintColor]}
              />
            }
            ListEmptyComponent={
              <View style={[styles.emptyContainer, styles.container]}>
                <MaterialIcons name="fitness-center" size={64} color="#999" />
                <Text style={[styles.emptyText, styles.text]}>
                  هیچ تمرینی برای این پلن وجود ندارد
                </Text>
                <Text style={[styles.emptySubtext, styles.text]}>
                  اولین تمرین را به این پلن اضافه کنید
                </Text>
                <Button
                  mode="contained"
                  onPress={handleAddWorkout}
                  style={styles.emptyButton}
                  icon="plus"
                >
                  افزودن تمرین
                </Button>
              </View>
            }
          />

          {/* Floating Action Button */}
          {workouts.length > 0 && (
            <FAB style={styles.fab} icon="plus" onPress={handleAddWorkout} color="white" />
          )}
        </>
      )}
    </View>
  );
};

export default WorkoutScreen;
