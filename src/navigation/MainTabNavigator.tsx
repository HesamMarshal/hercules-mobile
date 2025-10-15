// src/navigation/MainTabNavigator.tsx

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import WorkoutsScreen from '../screens/app/Workouts/WorkoutsScreen';
import SettingsScreen from '../screens/app/Settings/SettingsScreen';
import ProfileScreen from '@/screens/app/Profile/ProfileScreen';
import { ExercisesScreen } from '@/screens/app/Exercise/ExercisesScreen';
import { useRTL } from '../contexts/RTLContext';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '@/theme/properties/colors';
import PlansScreen from '@/screens/app/Plan/PlansScreen';
import { Platform } from 'react-native';

export type MainTabParamList = {
  Profile: undefined;
  Exercises: undefined;
  Settings: undefined;
  Plans: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

export const MainTabNavigator = () => {
  const { isRTL } = useRTL();
  const insets = useSafeAreaInsets();

  // Calculate safe area padding for Android
  const tabBarPaddingBottom = Platform.OS === 'android' ? Math.max(insets.bottom, 16) : 5;
  const tabBarHeight = Platform.OS === 'android' ? 60 + insets.bottom : 60;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Exercises') {
            iconName = focused ? 'fitness' : 'fitness-outline';
          } else if (route.name === 'Plans') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.activeTintColor,
        tabBarInactiveTintColor: colors.inactiveTintColor,
        tabBarStyle: {
          backgroundColor: colors.tabBackgroundColor,
          borderTopWidth: 1,
          borderTopColor: colors.tabBorderTopColor,
          // Apply safe area padding
          paddingBottom: tabBarPaddingBottom,
          paddingTop: 10,
          height: tabBarHeight,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: Platform.OS === 'android' ? 0 : 4, // Adjust label margin for Android
        },
        headerStyle: {
          backgroundColor: colors.activeTintColor,
        },
        headerTintColor: colors.tabHeaderTintColor,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        animation: 'shift',
        // TODO: Set to right for android and center for ios
        headerTitleAlign: 'center',
      })}
      initialRouteName="Profile"
    >
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'پروفایل' }} />
      <Tab.Screen name="Plans" component={PlansScreen} options={{ title: 'برنامه ها' }} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} options={{ title: 'حرکات ورزشی' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'تنظیمات' }} />
    </Tab.Navigator>
  );
};
