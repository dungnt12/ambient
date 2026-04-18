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
import {
  EntryDetailScreen,
  EntryEditScreen,
  JournalComposeScreen,
  JournalListScreen,
  type JournalListEntry,
} from './src/screens/journal';

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

type Route =
  | 'onboarding'
  | 'signIn'
  | 'email'
  | 'otp'
  | 'journalList'
  | 'journalCompose'
  | 'entryDetail'
  | 'entryEdit';

const ROUTE_ORDER: Route[] = [
  'onboarding',
  'signIn',
  'email',
  'otp',
  'journalList',
  'journalCompose',
  'entryDetail',
  'entryEdit',
];

const SAMPLE_ENTRIES: JournalListEntry[] = [
  {
    id: 'apr17',
    dateLabel: 'TODAY · APR 17',
    preview:
      'Morning coffee. I brewed slower than usual — weighing beans, watching the steam rise.',
  },
  {
    id: 'apr16',
    dateLabel: 'WEDNESDAY · APR 16',
    preview: 'A long meeting, then a walk. The street was quieter than I expected.',
  },
  {
    id: 'apr15',
    dateLabel: 'TUESDAY · APR 15',
    preview: "Couldn't sleep. Ended up texting my sister instead of scrolling.",
  },
  {
    id: 'apr13',
    dateLabel: 'SUNDAY · APR 13',
    preview: 'Finished the book. A gentler ending than I expected.',
  },
];

const SAMPLE_ENTRY_BODY =
  "Morning coffee tastes different — must be the new beans. Watching sunlight fall onto the balcony, noticed the plants I forgot to water. Not sad, not happy. An ordinary morning, and ordinary feels enough right now. The 10am meeting ran long. Came home to mom's cooking. Tonight I'll finish the book I started.";

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
        return (
          <OtpScreen
            email={email}
            onBack={() => setRoute('email')}
            onVerify={() => setRoute('journalList')}
          />
        );
      case 'journalList':
        return (
          <JournalListScreen
            entries={SAMPLE_ENTRIES}
            onFabPress={() => setRoute('journalCompose')}
            onEntryPress={() => setRoute('entryDetail')}
          />
        );
      case 'journalCompose':
        return (
          <JournalComposeScreen
            dayLabel="THURSDAY · APR 17"
            prompt="Is anything lighter today than yesterday?"
            promptFollowup="Yesterday you wrote about feeling low. How's tonight?"
            onSave={() => setRoute('journalList')}
          />
        );
      case 'entryDetail':
        return (
          <EntryDetailScreen
            dateEyebrow="TODAY · APR 17 · 08:24"
            headline="You feel ordinary today."
            body={SAMPLE_ENTRY_BODY}
            aiSummary="This person is having a quiet day — steady, unshaken. A warm gratitude for familiar things."
            mood={3}
            onBack={() => setRoute('journalList')}
            onEdit={() => setRoute('entryEdit')}
          />
        );
      case 'entryEdit':
        return (
          <EntryEditScreen
            dateEyebrow="TODAY · APR 17 · 08:24"
            initialContent={SAMPLE_ENTRY_BODY}
            initialMood={3}
            onCancel={() => setRoute('entryDetail')}
            onSave={() => setRoute('entryDetail')}
          />
        );
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
