import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { AuthScreen } from '../screens/auth/AuthScreen';
import { ProfileScreen } from '../screens/app/ProfileScreen';
import { PlansScreen } from '../screens/app/PlansScreen';
import { ExercisesScreen } from '../screens/app/ExercisesScreen';
import { SettingsScreen } from '../screens/app/SettingsScreen';
import { Text } from 'react-native';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { paddingVertical: 10, height: 60 },
        headerShown: false,
      }}
    >
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{ tabBarIcon: () => <Text>👤</Text> }}
      />
      <Tab.Screen 
        name="Plans" 
        component={PlansScreen}
        options={{ tabBarIcon: () => <Text>📋</Text> }}
      />
      <Tab.Screen 
        name="Exercises" 
        component={ExercisesScreen}
        options={{ tabBarIcon: () => <Text>💪</Text> }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{ tabBarIcon: () => <Text>⚙️</Text> }}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Text style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        Loading...
      </Text>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : (
          <Stack.Screen name="Main" component={TabNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}