import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { MainTabNavigator } from './MainTabNavigator';
import ExerciseDetailScreen from '@/screens/app/Exercise/ExerciseDetailScreen';

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
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Auth" component={() => null} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
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
