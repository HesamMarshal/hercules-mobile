// src/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { MainTabNavigator } from './MainTabNavigator';
import ExerciseDetailScreen from '@/screens/app/Exercise/ExerciseDetailScreen';
import { I18nManager } from 'react-native';
import { RTLProvider } from '@/contexts/RTLContext';
import CreatePlanScreen from '@/screens/app/Plan/CreatePlanScreen';
import WorkoutScreen from '@/screens/app/Workouts/WorkoutsScreen';
import PracticeScreen from '@/screens/app/Practice/PracticeScreen';
import { colors } from '@/theme/properties/colors';
// import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '@/types/navigation.type';
import CreatePracticeScreen from '@/screens/app/Practice/CreatePracticeScreen';
import EditPlanScreen from '@/screens/app/Plan/EditPlanScreen';

// Force RTL at app level
// I18nManager.forceRTL(true);
// I18nManager.allowRTL(true);

// TODO  :Implement theme and dark and light theme

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <RTLProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={() => null} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </RTLProvider>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ route }) => ({
          cardStyle: { flex: 1 },
        })}
      >
        {isAuthenticated ? (
          // Authenticated users - show main app with tabs
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              name="CreatePlan"
              component={CreatePlanScreen}
              options={{
                title: 'CreatePlan',
                headerStyle: {
                  backgroundColor: colors.activeTintColor,
                },
                headerTintColor: 'white',
              }}
            />
            <Stack.Screen
              name="EditPlan"
              component={EditPlanScreen}
              options={{ title: 'ویرایش پلن' }}
            />

            <Stack.Screen
              name="WorkoutScreen"
              component={WorkoutScreen}
              options={({ route }) => ({
                title: route.params.planName || 'تمرین‌ها',
                headerTintColor: colors.activeTintColor,
                paddingBottom: 5,
                paddingTop: 10,
                height: 70,
              })}
            />
            <Stack.Screen
              name="PracticeScreen"
              component={PracticeScreen}
              options={({ route }) => ({
                title: route.params?.workoutName || 'تمرین‌ها',
              })}
            />
            <Stack.Screen
              name="CreatePractice"
              component={CreatePracticeScreen}
              options={{ title: 'افزودن تمرین' }}
            />
            <Stack.Screen
              name="ExerciseDetail"
              component={ExerciseDetailScreen}
              options={{
                title: 'Exercise Details',
                headerStyle: {
                  backgroundColor: colors.activeTintColor,
                },
                headerTintColor: 'white',
              }}
            />
          </>
        ) : (
          // Unauthenticated users - show auth
          <Stack.Screen name="Auth" component={AuthScreen} options={{ headerShown: false }} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
