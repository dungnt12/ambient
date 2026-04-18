import './src/i18n';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  AnimatedSplash,
  RouteTransition,
  ThemeProvider,
  useAppFonts,
  useTheme,
  type RouteDirection,
} from './src/design-system';
import { OnboardingWelcomeScreen } from './src/screens/onboarding';
import { EmailScreen, OtpScreen, SignInScreen } from './src/screens/auth';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

function AppInner() {
  const t = useTheme();
  const fontsLoaded = useAppFonts();
  const [introDone, setIntroDone] = useState(false);
  const [overlayOpacity] = useState(() => new Animated.Value(1));
  const [overlayMounted, setOverlayMounted] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().catch(() => undefined);
    }
  }, [fontsLoaded]);

  const ready = fontsLoaded && introDone;

  useEffect(() => {
    if (!ready) return;
    Animated.timing(overlayOpacity, {
      toValue: 0,
      duration: t.motion.duration.slow,
      easing: t.motion.easing.exit,
      useNativeDriver: true,
    }).start(() => setOverlayMounted(false));
  }, [ready, overlayOpacity, t.motion]);

  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  return (
    <View style={{ flex: 1, backgroundColor: t.colors.bg }}>
      {fontsLoaded ? (
        <>
          <AuthFlow />
          <StatusBar style="dark" translucent backgroundColor="transparent" />
        </>
      ) : null}
      {overlayMounted ? (
        <Animated.View
          pointerEvents={ready ? 'none' : 'auto'}
          style={[StyleSheet.absoluteFillObject, { opacity: overlayOpacity }]}
        >
          <AnimatedSplash onDone={handleIntroDone} />
        </Animated.View>
      ) : null}
    </View>
  );
}

type Route = 'onboarding' | 'signIn' | 'email' | 'otp';

const ROUTE_ORDER: Route[] = ['onboarding', 'signIn', 'email', 'otp'];

function AuthFlow() {
  const [route, setRoute] = useState<Route>('onboarding');
  const [email, setEmail] = useState('');
  const previousRouteRef = useRef<Route>(route);

  const direction: RouteDirection = useMemo(() => {
    const prev = previousRouteRef.current;
    if (prev === route) return 'none';
    return ROUTE_ORDER.indexOf(route) >= ROUTE_ORDER.indexOf(prev) ? 'forward' : 'backward';
  }, [route]);

  useEffect(() => {
    previousRouteRef.current = route;
  }, [route]);

  const screen = (() => {
    switch (route) {
      case 'onboarding':
        return (
          <OnboardingWelcomeScreen
            onContinue={() => setRoute('signIn')}
            onSignIn={() => setRoute('signIn')}
          />
        );
      case 'signIn':
        return (
          <SignInScreen
            onApple={() => setRoute('email')}
            onEmail={() => setRoute('email')}
            onNewHere={() => setRoute('onboarding')}
          />
        );
      case 'email':
        return (
          <EmailScreen
            onBack={() => setRoute('signIn')}
            onSendCode={(value) => {
              setEmail(value);
              setRoute('otp');
            }}
            onUseApple={() => setRoute('signIn')}
          />
        );
      case 'otp':
        return <OtpScreen email={email} onBack={() => setRoute('email')} />;
    }
  })();

  return (
    <RouteTransition routeKey={route} direction={direction}>
      {screen}
    </RouteTransition>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
