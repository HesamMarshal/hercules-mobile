// src/screens/PlansScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, I18nManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/services/api';
import { ActivityIndicator, Button, Card, FAB, Title } from 'react-native-paper';
import { RefreshControl } from 'react-native-gesture-handler';
import { workoutAPI } from '@/services/workoutsApi';
import { Workout } from '@/types/workout.type';
import { colors } from '@/theme/properties/colors';
import { planStyles as styles } from '@/theme/styles';
import { Plan } from '@/types/plan.type';

const isRTL = I18nManager.isRTL;

const PlansScreen = ({ navigation }: any) => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [workoutsLoading, setWorkoutsLoading] = useState<{ [key: string]: boolean }>({});
  const { token } = useAuth();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = async () => {
    if (!token) {
      setError('لطفاً برای مشاهده برنامه ها وارد شوید');
      setLoading(false);
      return;
    }

    try {
      setError('');
      const response = await fetchWithAuth('/plan');
      const data = await response.json();
      const plans = data.data;

      if (plans && plans.length > 0) {
        await workoutAPI.getAllWorkoutsByPlanId(plans[0].id);
      }

      if (plans && plans.length > 0) {
        const plansWithWorkouts = await Promise.all(
          plans.map(async (plan: Plan) => {
            try {
              setWorkoutsLoading((prev) => ({ ...prev, [plan.id]: true }));
              const workouts = await workoutAPI.getAllWorkoutsByPlanId(+plan.id);
              return { ...plan, workouts: workouts || [] };
            } catch (error) {
              console.error(`Error loading workouts for plan ${plan.id}:`, error);
              return { ...plan, workouts: [] };
            } finally {
              setWorkoutsLoading((prev) => ({ ...prev, [plan.id]: false }));
            }
          })
        );
        setPlans(plansWithWorkouts);
      } else {
        setPlans(plans || []);
      }
    } catch (error: any) {
      setError('خطا در بارگذاری پلن‌ها');
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

  const handleCreatePlan = () => {
    // Navigate to create plan screen
    navigation.navigate('CreatePlan', {
      onPlanCreated: loadPlans, // Refresh the list after creating a plan
    });
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    } catch {
      return dateString;
    }
  };
  const renderWorkoutItem = (workout: Workout) => (
    <View key={workout.id} style={[styles.workoutItem, styles.workoutItemContainer]}>
      <MaterialIcons name="fitness-center" size={16} color="#666" style={styles.workoutIcon} />
      <Text style={[styles.workoutText, styles.text]} numberOfLines={1}>
        {workout.name}
      </Text>
      {workout.day_of_week && (
        <View style={[styles.difficultyBadge, styles.difficultyContainer]}>
          <Text style={styles.difficultyText}>{workout.day_of_week}</Text>
        </View>
      )}
    </View>
  );

  const renderPlanItem = ({ item }: { item: Plan }) => {
    const isLoadingWorkouts = workoutsLoading[item.id];
    const hasWorkouts = item.workouts && item.workouts.length > 0;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WorkoutScreen', {
            planId: item.id,
            planName: item.name,
          })
        }
      >
        <Card style={[styles.planCard, styles.card]} mode="elevated">
          <Card.Content style={styles.cardContent}>
            <View style={styles.planHeader}>
              <Title style={[styles.planName, styles.text]}>{item.name}</Title>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="#666"
                style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
              />
            </View>

            <View style={styles.detailsContainer}>
              <View style={styles.dateContainer}>
                <MaterialIcons name="calendar-today" size={14} color="#666" />
                <Text style={[styles.detailText, styles.text]}>
                  شروع: {formatDate(item.start_date)}
                </Text>
                <MaterialIcons name="event-busy" size={14} color="#666" />
                <Text style={[styles.detailText, styles.text]}>
                  پایان: {formatDate(item.end_date)}
                </Text>
              </View>
            </View>

            {/* Workouts Section */}
            <View style={styles.workoutsSection}>
              <Text style={[styles.workoutsTitle, styles.text]}>
                تمرین‌ها ({hasWorkouts ? item.workouts!.length : 0})
              </Text>

              {isLoadingWorkouts ? (
                <View style={styles.loadingWorkouts}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={[styles.loadingText, styles.text]}>در حال بارگذاری تمرین‌ها...</Text>
                </View>
              ) : hasWorkouts ? (
                <View style={styles.workoutsList}>
                  {item.workouts!.slice(0, 3).map(renderWorkoutItem)}
                  {item.workouts!.length > 3 && (
                    <Text style={[styles.moreWorkoutsText, styles.text]}>
                      + {item.workouts!.length - 3} تمرین دیگر
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={[styles.noWorkoutsText, styles.text]}>
                  هیچ تمرینی برای این پلن تعریف نشده
                </Text>
              )}
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  if (loading) {
    return (
      <View style={[styles.centered, styles.container]}>
        <ActivityIndicator size="large" color={colors.activeTintColor} />
        <Text style={[styles.loadingText, styles.text]}>در حال بارگذاری پلن‌ها...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      {error ? (
        <View style={[styles.errorContainer, styles.container]}>
          <Text style={[styles.errorText, styles.text]}>{error}</Text>
          <Button mode="contained" onPress={loadPlans} style={styles.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={plans}
            renderItem={renderPlanItem}
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
                <MaterialIcons name="assignment" size={64} color="#999" />
                <Text style={[styles.emptyText, styles.text]}>هیچ پلن تمرینی موجود نیست</Text>
                <Text style={[styles.emptySubtext, styles.text]}>
                  پلن‌های تمرینی شما در اینجا نمایش داده می‌شوند
                </Text>
                <Button
                  mode="contained"
                  onPress={handleCreatePlan}
                  style={styles.emptyButton}
                  icon="plus"
                >
                  ایجاد پلن جدید
                </Button>
              </View>
            }
          />
          {/* Floating Action Button */}
          {plans.length > 0 && (
            <FAB style={styles.fab} icon="plus" onPress={handleCreatePlan} color="white" />
          )}
        </>
      )}
    </View>
  );
};

export default PlansScreen;
