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
          // Add safe area padding here:
          paddingBottom: 5,
          paddingTop: 10,
          height: 70, // Increase total height if needed
          // flexDirection: 'row-reverse',
          // paddingBottom: insets.bottom + 10,
          // paddingTop: 10,
          // height: 60 + insets.bottom, // Adjust base height as needed
          // Ensure RTL layout
          // flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
          // flexDirection: isRTL ? 'row-reverse' : 'row',
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

        // This ensures proper RTL behavior in React Navigation
        // animation: I18nManager.isRTL ? 'shift' : 'default',
      })}
      initialRouteName="Profile"
      // Force RTL layout direction
      // screenLayoutDirection={I18nManager.isRTL ? 'rtl' : 'ltr'}
    >
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ title: 'تنظیمات' }} />
      <Tab.Screen name="Exercises" component={ExercisesScreen} options={{ title: 'حرکات ورزشی' }} />
      <Tab.Screen name="Plans" component={PlansScreen} options={{ title: 'برنامه ها' }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'پروفایل' }} />
    </Tab.Navigator>
  );
};
