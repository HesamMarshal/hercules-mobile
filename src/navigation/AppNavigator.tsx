// src/navigation/AppNavigator.tsx

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { MainTabNavigator } from './MainTabNavigator';
import ExerciseDetailScreen from '@/screens/app/Exercise/ExerciseDetailScreen';
import { I18nManager } from 'react-native';
import { RTLProvider } from '@/contexts/RTLContext';

// Force RTL at app level
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

// TODO  :Implement theme and dark and light theme
// Create custom theme based on DefaultTheme
// const CustomTheme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     primary: '#007AFF',
//     background: 'white',
//     card: '#007AFF',
//     text: 'white',
//     border: '#f0f0f0',
//     notification: '#FF3B30',
//   },
// };

export type RootStackParamList = {
  Auth: undefined;
  MainTabs: undefined;
  ExerciseDetail: { exerciseId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log('AppNavigator - Auth State:', {
    isAuthenticated,
    loading,
  });

  if (loading) {
    return (
      <RTLProvider>
        <NavigationContainer
        // theme={CustomTheme}
        >
          <Stack.Navigator>
            <Stack.Screen name="Auth" component={() => null} options={{ headerShown: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </RTLProvider>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // Authenticated users - show main app with tabs
          <>
            <Stack.Screen
              name="MainTabs"
              component={MainTabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ExerciseDetail"
              component={ExerciseDetailScreen}
              options={{
                title: 'Exercise Details',
                headerStyle: {
                  backgroundColor: '#007AFF',
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
