import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { FavouritesProvider, StatsProvider, ThemeProvider } from './src/context';
import telemetryService from './src/services/telemetryService';

export default function App() {
  // Initialize telemetry
  React.useEffect(() => {
    telemetryService.trackAppStart();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <FavouritesProvider>
          <StatsProvider>
            <AppNavigator />
            <StatusBar style="light" />
          </StatsProvider>
        </FavouritesProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
