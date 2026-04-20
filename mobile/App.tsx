import './src/i18n';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/design-system';
import { BootGate, RootNavigator } from './src/navigation';
import { ActiveGroupProvider } from './src/state/activeGroup';
import { GroupInsightsProvider } from './src/state/groupInsights';
import { PendingInvitesProvider } from './src/state/pendingInvites';
import { GroupOverridesProvider } from './src/state/groupOverrides';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <BootGate>
            <ActiveGroupProvider>
              <GroupOverridesProvider>
                <GroupInsightsProvider>
                  <PendingInvitesProvider>
                    <NavigationContainer>
                      <StatusBar style="dark" />
                      <RootNavigator />
                    </NavigationContainer>
                  </PendingInvitesProvider>
                </GroupInsightsProvider>
              </GroupOverridesProvider>
            </ActiveGroupProvider>
          </BootGate>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
