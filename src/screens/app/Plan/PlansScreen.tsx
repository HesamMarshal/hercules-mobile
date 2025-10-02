// src/screens/PlansScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, I18nManager } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { fetchWithAuth } from '@/services/api';
import { ActivityIndicator, Button, Card, Title } from 'react-native-paper';
import { workoutStyles as styles } from '@/theme/styles';
import { RefreshControl } from 'react-native-gesture-handler';
import { workoutAPI } from '@/services/workoutsApi';
import { Workout } from '@/types/workout.type';

const isRTL = I18nManager.isRTL;

interface Plan {
  id: string;
  name: string;
  start_date: string;
  end_date: string;
  workouts?: Workout[];
}

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

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('fa-IR');
    } catch {
      return dateString;
    }
  };
  const renderWorkoutItem = (workout: Workout) => (
    <View key={workout.id} style={[rtlAware.workoutItem, rtlAware.workoutItemContainer]}>
      <MaterialIcons name="fitness-center" size={16} color="#666" style={rtlAware.workoutIcon} />
      <Text style={[rtlAware.workoutText, rtlAware.text]} numberOfLines={1}>
        {workout.name}
      </Text>
      {workout.day_of_week && (
        <View style={[rtlAware.difficultyBadge, rtlAware.difficultyContainer]}>
          <Text style={rtlAware.difficultyText}>{workout.day_of_week}</Text>
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
          navigation.navigate('PlanWorkouts', {
            planId: item.id,
            planName: item.name,
          })
        }
      >
        {/* <Card style={[styles.workoutCard, rtlAware.card]} mode="elevated">
          <Card.Content style={rtlAware.cardContent}>
            <Title style={[styles.workoutName, rtlAware.text]}>{item.name}</Title>
            <View style={rtlAware.detailsContainer}>
              <Text style={[styles.detailText, rtlAware.text]}>
                تاریخ شروع: {formatDate(item.start_date)}
              </Text>
              <Text style={[styles.detailText, rtlAware.text]}>
                تاریخ پایان: {formatDate(item.end_date)}
              </Text>
            </View>
          </Card.Content>
        </Card> */}

        <Card style={[styles.workoutCard, rtlAware.card]} mode="elevated">
          <Card.Content style={rtlAware.cardContent}>
            <View style={rtlAware.planHeader}>
              <Title style={[styles.workoutName, rtlAware.text]}>{item.name}</Title>
              <MaterialIcons
                name="chevron-left"
                size={24}
                color="#666"
                style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
              />
            </View>

            <View style={rtlAware.detailsContainer}>
              <View style={rtlAware.dateContainer}>
                <MaterialIcons name="calendar-today" size={14} color="#666" />
                <Text style={[styles.detailText, rtlAware.text]}>
                  شروع: {formatDate(item.start_date)}
                </Text>
              </View>
              <View style={rtlAware.dateContainer}>
                <MaterialIcons name="event-busy" size={14} color="#666" />
                <Text style={[styles.detailText, rtlAware.text]}>
                  پایان: {formatDate(item.end_date)}
                </Text>
              </View>
            </View>

            {/* Workouts Section */}
            <View style={rtlAware.workoutsSection}>
              <Text style={[rtlAware.workoutsTitle, rtlAware.text]}>
                تمرین‌ها ({hasWorkouts ? item.workouts!.length : 0})
              </Text>

              {isLoadingWorkouts ? (
                <View style={rtlAware.loadingWorkouts}>
                  <ActivityIndicator size="small" color="#007AFF" />
                  <Text style={[rtlAware.loadingText, rtlAware.text]}>
                    در حال بارگذاری تمرین‌ها...
                  </Text>
                </View>
              ) : hasWorkouts ? (
                <View style={rtlAware.workoutsList}>
                  {item.workouts!.slice(0, 3).map(renderWorkoutItem)}
                  {item.workouts!.length > 3 && (
                    <Text style={[rtlAware.moreWorkoutsText, rtlAware.text]}>
                      + {item.workouts!.length - 3} تمرین دیگر
                    </Text>
                  )}
                </View>
              ) : (
                <Text style={[rtlAware.noWorkoutsText, rtlAware.text]}>
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
      <View style={[styles.centered, rtlAware.container]}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={[styles.loadingText, rtlAware.text]}>در حال بارگذاری پلن‌ها...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, rtlAware.container]}>
      {error ? (
        <View style={[styles.errorContainer, rtlAware.container]}>
          <Text style={[styles.errorText, rtlAware.text]}>{error}</Text>
          <Button mode="contained" onPress={loadPlans} style={rtlAware.button}>
            تلاش مجدد
          </Button>
        </View>
      ) : (
        <FlatList
          data={plans}
          renderItem={renderPlanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={[styles.listContainer, rtlAware.listContainer]}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={['#007AFF']}
            />
          }
          ListEmptyComponent={
            <View style={[styles.emptyContainer, rtlAware.container]}>
              <MaterialIcons name="assignment" size={64} color="#999" />
              <Text style={[styles.emptyText, rtlAware.text]}>هیچ پلن تمرینی موجود نیست</Text>
              <Text style={[rtlAware.emptySubtext, rtlAware.text]}>
                پلن‌های تمرینی شما در اینجا نمایش داده می‌شوند
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const rtlAware = StyleSheet.create({
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
  planHeader: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  detailsContainer: {
    flexDirection: 'column',
    alignItems: isRTL ? 'flex-end' : 'flex-start',
    width: '100%',
    marginBottom: 16,
  },
  dateContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  listContainer: {
    paddingVertical: 8,
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
  },
  workoutsSection: {
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
  },
  workoutsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  workoutsList: {
    width: '100%',
  },
  workoutItemContainer: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    marginBottom: 6,
    paddingHorizontal: 8,
  },
  workoutItem: {
    flexDirection: isRTL ? 'row-reverse' : 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 8,
    borderRadius: 6,
    flex: 1,
  },
  workoutIcon: {
    marginHorizontal: 8,
  },
  workoutText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  difficultyContainer: {
    marginLeft: isRTL ? 0 : 8,
    marginRight: isRTL ? 8 : 0,
  },
  difficultyBadge: {
    backgroundColor: '#e9ecef',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  difficultyText: {
    fontSize: 10,
    color: '#666',
    fontWeight: '500',
  },
  moreWorkoutsText: {
    fontSize: 12,
    color: '#007AFF',
    marginTop: 4,
    textAlign: isRTL ? 'right' : 'left',
  },
  noWorkoutsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: isRTL ? 'right' : 'left',
  },
  loadingWorkouts: {
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
});

export default PlansScreen;
