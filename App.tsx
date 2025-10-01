// App.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { I18nextProvider } from 'react-i18next';
import { StatusBar } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';

import { enableScreens } from 'react-native-screens';
import { RTLProvider } from '@/contexts/RTLContext';
import { AuthProvider } from '@/contexts/AuthContext';

enableScreens();

export default function App() {
  return (
    // TODO: Check ERROR BOUNDARY
    // <ErrorBoundary>
    <RTLProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </RTLProvider>
    // </ErrorBoundary>

    // <I18nextProvider i18n={i18n}>
    //   <AuthProvider>
    //     <NavigationContainer>
    //       <StatusBar barStyle="dark-content" />
    //       <AppNavigator />
    //     </NavigationContainer>
    //   </AuthProvider>
    // </I18nextProvider>
  );
}
