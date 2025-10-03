// App.tsx
import React from 'react';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { enableScreens } from 'react-native-screens';
import { RTLProvider } from '@/contexts/RTLContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { PaperProvider } from 'react-native-paper';
import { QueryProvider } from '@/query/QueryProvider';

enableScreens();

export default function App() {
  return (
    // TODO: Check ERROR BOUNDARY

    <QueryProvider>
      <PaperProvider>
        <RTLProvider>
          <AuthProvider>
            <AppNavigator />
          </AuthProvider>
        </RTLProvider>
      </PaperProvider>
    </QueryProvider>
  );
}
