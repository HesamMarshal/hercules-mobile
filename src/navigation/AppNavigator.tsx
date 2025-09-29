import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/auth/AuthScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import { ExercisesScreen } from '@/screens/app/ExercisesScreen';
import ProfileScreen from '@/screens/app/ProfileScreen';


// Define stack param list for TypeScript
export type RootStackParamList = {
  Auth: undefined;
  Profile: undefined;
  Exercises: undefined;
  ExerciseDetail: { exerciseId: string };
  Loading: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  console.log('AppNavigator - Auth State:', { 
    isAuthenticated, 
    loading 
  });

  if (loading) {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen 
            name="Loading" 
            component={() => null}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isAuthenticated ? (
          // User has tokens - show main app
          <>
            <Stack.Screen 
              name="Profile" 
              component={ProfileScreen}
              options={{ title: 'Profile' }}
            />
            <Stack.Screen 
              name="Exercises" 
              component={ExercisesScreen}
              options={{ title: 'Exercises' }}
            />
            <Stack.Screen 
              name="ExerciseDetail" 
              component={ExerciseDetailScreen}
              options={{ title: 'Exercise Details' }}
            />
          </>
        ) : (
          // No tokens - show auth screen
          <Stack.Screen 
            name="Auth" 
            component={AuthScreen}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};