// src/screens/PlansScreen.tsx
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
import { ActivityIndicator, Button, Card, FAB, Title, Menu, Divider } from 'react-native-paper';
import { colors } from '@/theme/properties/colors';
import { planStyles as styles } from '@/theme/plan.style';
import { Plan } from '@/interfaces/plan.interface';
import { Workout } from '@/interfaces/workout.interface';
import { planAPI } from '@/services/planApi';
import { workoutAPI } from '@/services/workoutsApi';
import Loading from '@/components/common/Loading';
import { formatDate } from '@/utils/date.util';

const isRTL = I18nManager.isRTL;

// Extended interface for plans with workouts
interface PlanWithWorkouts extends Plan {
  workouts?: Workout[];
}

const PlansScreen = ({ navigation }: any) => {
  const [plans, setPlans] = useState<PlanWithWorkouts[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState('');
  const [workoutsLoading, setWorkoutsLoading] = useState<{ [key: string]: boolean }>({});
  const [menuVisible, setMenuVisible] = useState<{ [key: string]: boolean }>({});
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
      const plansData = await planAPI.getAllPlans();

      if (plansData && plansData.length > 0) {
        const plansWithWorkouts = await Promise.all(
          plansData.map(async (plan: Plan) => {
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
        setPlans(plansData || []);
      }
    } catch (error: any) {
      console.error('Error loading plans:', error);
      setError('خطا در بارگذاری پلن‌ها');
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
    navigation.navigate('CreatePlan', {
      onPlanCreated: loadPlans,
    });
  };

  const handleEditPlan = (plan: Plan) => {
    setMenuVisible({ ...menuVisible, [plan.id]: false });
    navigation.navigate('EditPlan', {
      planId: plan.id,
      planName: plan.name,
      startDate: plan.start_date,
      endDate: plan.end_date,
      onPlanUpdated: loadPlans,
    });
  };

  const handleDeletePlan = (plan: Plan) => {
    setMenuVisible({ ...menuVisible, [plan.id]: false });
    deletePlan(plan.id);
    loadPlans();
    // Alert.alert(
    //   'حذف پلن',
    //   `آیا از حذف پلن "${plan.name}" اطمینان دارید؟ این عمل غیرقابل بازگشت است.`,
    //   [
    //     { text: 'لغو', style: 'cancel' },
    //     {
    //       text: 'حذف',
    //       style: 'destructive',
    //       onPress: () => deletePlan(plan.id),
    //     },
    //   ]
    // );
  };

  const deletePlan = async (planId: string) => {
    try {
      await planAPI.deletePlan(planId);
      setPlans(plans.filter((plan) => plan.id !== planId));
      Alert.alert('موفقیت', 'پلن با موفقیت حذف شد');
    } catch (error: any) {
      console.error('Error deleting plan:', error);
      Alert.alert('خطا', 'خطا در حذف پلن. لطفاً مجدداً تلاش کنید.');
    }
  };

  const toggleMenu = (planId: string) => {
    setMenuVisible({
      ...menuVisible,
      [planId]: !menuVisible[planId],
    });
  };

  const closeAllMenus = () => {
    setMenuVisible({});
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

  const renderPlanItem = ({ item }: { item: PlanWithWorkouts }) => {
    const isLoadingWorkouts = workoutsLoading[item.id];
    const hasWorkouts = item.workouts && item.workouts.length > 0;

    return (
      <TouchableOpacity onPress={closeAllMenus} activeOpacity={0.9}>
        <Card style={[styles.planCard, styles.card]} mode="elevated">
          <Card.Content style={styles.cardContent}>
            {/* Plan Header with Menu */}
            <View style={styles.planHeader}>
              <View style={styles.planTitleContainer}>
                <Title style={[styles.planName, styles.text]}>{item.name}</Title>
              </View>

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
                    onPress={() => handleEditPlan(item)}
                    title="ویرایش"
                    leadingIcon="pencil"
                    style={styles.menuItem}
                  />
                  <Divider />
                  <Menu.Item
                    onPress={() => handleDeletePlan(item)}
                    title="حذف"
                    leadingIcon="delete"
                    titleStyle={styles.deleteMenuText}
                    style={styles.menuItem}
                  />
                </Menu>

                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('WorkoutScreen', {
                      planId: item.id,
                      planName: item.name,
                    })
                  }
                >
                  <MaterialIcons
                    name="chevron-left"
                    size={24}
                    color="#666"
                    style={isRTL ? {} : { transform: [{ rotate: '180deg' }] }}
                  />
                </TouchableOpacity>
              </View>
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
    return <Loading message="در حال بارگذاری پلن‌ها..." />;
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
