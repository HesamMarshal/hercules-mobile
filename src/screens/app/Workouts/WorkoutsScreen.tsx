// src/screens/Workouts/WorkoutScreen.tsx
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  I18nManager,
  Alert,
  RefreshControl,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator, Button, Card, Title, FAB, Menu, Divider } from 'react-native-paper';
import { workoutStyles as styles } from '@/theme/workouts.style';
import { workoutAPI } from '@/services/workoutsApi';
import { practiceAPI } from '@/services/practiceApi';
import { colors } from '@/theme/properties/colors';
import { WorkoutScreenRouteProp, WorkoutScreenNavigationProp } from '@/types/navigation.type';
import { Workout } from '@/interfaces/workout.interface';
import { Practice } from '@/interfaces/practice.interface';
import Loading from '@/components/common/Loading';

const isRTL = I18nManager.isRTL;

interface WorkoutScreenProps {
  route: WorkoutScreenRouteProp;
  navigation: WorkoutScreenNavigationProp;
}

// // Extended interface for workouts with practices
// interface WorkoutWithPractices extends Workout {
//   practices?: Practice[];
// }

// Extended interface for workouts with practices

const WorkoutScreen = ({ route, navigation }: WorkoutScreenProps) => {
  const { planId, planName, refresh = false } = route.params;
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [practicesLoading, setPracticesLoading] = useState<{ [key: string]: boolean }>({});
  const { token } = useAuth();
  const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    navigation.setOptions({
      title: planName || 'تمرین‌ها',
    });
    loadWorkouts(refresh);
  }, [planId, planName, refresh]);

  const loadWorkouts = async (forceRefresh = false) => {
    if (!token) {
      setError('لطفاً برای مشاهده تمرین‌ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');

      if (forceRefresh) {
        const workoutCacheKey = `workouts_by_plan_${planId}`;
        // await CacheService.remove(workoutCacheKey);
        console.log('🧹 Cleared workout cache for plan:', planId);
      }

      const workoutsData = await workoutAPI.getAllWorkoutsByPlanId(+planId);

      if (workoutsData && workoutsData.length > 0) {
        const workoutsWithPractices = await Promise.all(
          workoutsData.map(async (workout: Workout) => {
            try {
              setPracticesLoading((prev) => ({ ...prev, [workout.id]: true }));
              const practices = await practiceAPI.getPracticesByWorkoutId(workout.id);
              return { ...workout, practices: practices || [] };
            } catch (error) {
              console.error(`Error loading practices for workout ${workout.id}:`, error);
              return { ...workout, practices: [] };
            } finally {
              setPracticesLoading((prev) => ({ ...prev, [workout.id]: false }));
            }
          })
        );
        setWorkouts(workoutsWithPractices);
      } else {
        setWorkouts(workoutsData || []);
      }
    } catch (error: any) {
      console.error('Error loading workouts:', error);
      setError('خطا در بارگذاری تمرین‌ها');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true);
    loadWorkouts(true);
  };

  const handleCreateWorkout = () => {
    navigation.navigate('CreateWorkoutScreen', {
      planId: planId,
      onWorkoutCreated: () => {
        console.log('🔄 Workout created callback called');
        loadWorkouts(true); // This will force refresh the list after creation
      },
    });
  };

  const handleEditWorkout = (workout: Workout) => {
    setMenuVisible({ ...menuVisible, [workout.id]: false });
    navigation.navigate('EditWorkoutScreen', {
      workoutId: workout.id,
      planId: planId,
      planName: planName,
      onWorkoutUpdated: () => loadWorkouts(true), // Force refresh after update
    });
  };

  const handleDeleteWorkout = (workout: Workout) => {
    setMenuVisible({ ...menuVisible, [workout.id]: false });
    deleteWorkout(workout.id);
    loadWorkouts(true);

    // Alert.alert(
    //   'حذف تمرین',
    //   `آیا از حذف تمرین "${workout.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`,
    //   [
    //     { text: 'لغو', style: 'cancel' },
    //     {
    //       text: 'حذف',
    //       style: 'destructive',
    //       onPress: () => deleteWorkout(workout.id),
    //     },
    //   ]
    // );
  };

  const deleteWorkout = async (workoutId: string) => {
    try {
      await workoutAPI.deleteWorkout(workoutId);

      // Remove the workout from local state immediately
      setWorkouts(workouts.filter((workout) => workout.id !== workoutId));

      Alert.alert('موفقیت', 'تمرین با موفقیت حذف شد');
    } catch (error: any) {
      console.error('Error deleting workout:', error);
      Alert.alert('خطا', 'خطا در حذف تمرین. لطفاً مجدداً تلاش کنید.');
    }
  };

  const toggleMenu = (workoutId: string) => {
    setMenuVisible({
      ...menuVisible,
      [workoutId]: !menuVisible[workoutId],
    });
  };

  const closeAllMenus = () => {
    setMenuVisible({});
  };

  const handleWorkoutPress = (workout: Workout) => {
    navigation.navigate('PracticeScreen', {
      workoutId: workout.id,
      workoutName: workout.name,
      planId: planId,
    });
  };

  // const handleStartWorkout = (workout: Workout) => {
  //   console.log('Call active workout');
  //   Alert.alert('شروع تمرین', `آیا می‌خواهید تمرین "${workout.name}" را شروع کنید؟`, [
  //     { text: 'لغو', style: 'cancel' },
  //     {
  //       text: 'شروع',
  //       onPress: () => {
  //         // Navigate to active workout screen
  //         navigation.navigate('ActiveWorkout', {
  //           workoutId: workout.id,
  //           workoutName: workout.name,
  //         });
  //       },
  //     },
  //   ]);
  // };

  const renderPracticeItem = (practice: Practice) => (
    <View key={practice.id} style={[styles.practiceItem, styles.practiceItemContainer]}>
      <MaterialIcons name="fitness-center" size={16} color="#666" style={styles.practiceIcon} />
      <Text style={[styles.practiceText, styles.text]} numberOfLines={1}>
        {/* Note: You might need to fetch exercise name separately or adjust your Practice interface */}
        تمرین #{practice.id}
      </Text>
      <View style={styles.practiceDetails}>
        <Text style={styles.practiceDetailText}>{practice.sets} ست</Text>
        <Text style={styles.practiceDetailText}>{practice.reps} تکرار</Text>
      </View>
    </View>
  );

  const renderWorkoutItem = ({ item }: { item: Workout }) => {
    const isLoadingPractices = practicesLoading[item.id];
    const hasPractices = item.practices && item.practices.length > 0;

    return (
      <TouchableOpacity onPress={closeAllMenus} activeOpacity={0.9}>
        <Card style={[styles.workoutCard, styles.card]} mode="elevated">
          <Card.Content style={styles.cardContent}>
            {/* Workout Header with Menu */}

            <View style={styles.workoutHeader}>
              <TouchableOpacity
                onPress={() => handleWorkoutPress(item)}
                style={styles.workoutTitleContainer}
              >
                <Title style={[styles.workoutName, styles.text]}>{item.name}</Title>
                {/* {item.difficulty && (
                  <View style={styles.difficultyBadge}>
                    <Text style={styles.difficultyText}>{item.difficulty}</Text>
                  </View>
                )} */}
              </TouchableOpacity>

              <View style={styles.headerActions}>
                <Menu
                  visible={!!menuVisible[item.id]}
                  onDismiss={() => setMenuVisible({ ...menuVisible, [item.id]: false })}
                  anchor={
                    <TouchableOpacity
                      onPress={() => toggleMenu(item.id)}
                      style={styles.menuButton}
                      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    >
                      <MaterialIcons name="more-vert" size={24} color="#666" />
                    </TouchableOpacity>
                  }
                  contentStyle={styles.menuContent}
                >
                  <Menu.Item
                    onPress={() => handleEditWorkout(item)}
                    title="ویرایش"
                    leadingIcon="pencil"
                    style={styles.menuItem}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => handleDeleteWorkout(item)}
                    title="حذف"
                    leadingIcon="delete"
                    titleStyle={styles.deleteMenuText}
                    style={styles.menuItem}
                  />
                </Menu>

                <TouchableOpacity onPress={() => handleWorkoutPress(item)}>
                  <MaterialIcons
                    name="chevron-left"
                    size={24}
                    color="#666"
                    style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>
              </View>
            </View>

            {/*             Workout Details */}
            {/* <View style={styles.detailsContainer}>
              {item.description && (
                <Text style={[styles.detailText, styles.text]}>{item.description}</Text>
              )}
              {item.duration && (
                <View style={styles.detailItem}>
                  <MaterialIcons name="schedule" size={14} color="#666" />
                  <Text style={[styles.detailText, styles.text]}>{item.duration} دقیقه</Text>
                </View>
              )}
            </View> */}

            {/* Practices Section */}
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
              {/* <Button
                mode="contained"
                onPress={() => handleStartWorkout(item)}
                style={styles.startButton}
              >
                شروع تمرین
              </Button> */}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return <Loading message="در حال بارگذاری تمرین  ها..." />;
  }

  return (
    <View style={[styles.container]}>
      {error ? (
        <View style={[styles.errorContainer, styles.container]}>
          <Text style={[styles.errorText, styles.text]}>{error}</Text>
          <Button mode="contained" onPress={() => loadWorkouts(true)} style={styles.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={workouts}
            renderItem={renderWorkoutItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={[styles.listContainer]}
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
                  onPress={handleCreateWorkout}
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
            <FAB style={styles.fab} icon="plus" onPress={handleCreateWorkout} color="white" />
          )}
        </>
      )}
    </View>
  );
};

export default WorkoutScreen;
