// import React from 'react';
// import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/contexts/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

// Import required for react-native-screens (improves performance)
import { enableScreens } from 'react-native-screens';
import { RTLProvider } from '@/contexts/RTLContext';
enableScreens();

export default function App() {
  return (
    // TODO: Check ERROR BOUNDARY
  //  <ErrorBoundary>
      <RTLProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </RTLProvider>
    // </ErrorBoundary>
  );
}