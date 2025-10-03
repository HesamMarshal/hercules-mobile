// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import { RTLProvider } from '@/contexts/RTLContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';

enableScreens();

export default function App() {
  return (
    // TODO: Check ERROR BOUNDARY
    // <ErrorBoundary>
    <PaperProvider>
      <RTLProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </RTLProvider>
    </PaperProvider>
    // </ErrorBoundary>
  );
}
