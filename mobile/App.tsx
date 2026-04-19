import './src/i18n';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/design-system';
import { BootGate, RootNavigator } from './src/navigation';
import { ActiveGroupProvider } from './src/state/activeGroup';
import { GroupInsightsProvider } from './src/state/groupInsights';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BootGate>
            <ActiveGroupProvider>
              <GroupInsightsProvider>
                <NavigationContainer>
                  <StatusBar style="dark" />
                  <RootNavigator />
                </NavigationContainer>
              </GroupInsightsProvider>
            </ActiveGroupProvider>
          </BootGate>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
