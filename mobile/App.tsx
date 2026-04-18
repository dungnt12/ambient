import './src/i18n';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/design-system';
import { BootGate, RootNavigator } from './src/navigation';

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <BootGate>
          <NavigationContainer>
            <StatusBar style="dark" />
            <RootNavigator />
          </NavigationContainer>
        </BootGate>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
