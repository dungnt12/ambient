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
  type TabKey,
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
import { GardenScreen } from './src/screens/garden';

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
          <StatusBar style="dark" />
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
  | 'garden'
  | 'journalList'
  | 'journalCompose'
  | 'entryDetail'
  | 'entryEdit';

const ROUTE_ORDER: Route[] = [
  'onboarding',
  'signIn',
  'email',
  'otp',
  'garden',
  'journalList',
  'journalCompose',
  'entryDetail',
  'entryEdit',
];

const TAB_ROUTES: Record<TabKey, TabRoute> = {
  garden: 'garden',
  journal: 'journalList',
  group: 'journalList',
  you: 'journalList',
};

type TabRoute = 'garden' | 'journalList';

const TAB_ROUTE_SET = new Set<Route>(['garden', 'journalList']);
const TAB_LAYER_KEY = 'tabs';

function isTabRoute(route: Route): route is TabRoute {
  return TAB_ROUTE_SET.has(route);
}

function transitionKey(route: Route): string {
  return isTabRoute(route) ? TAB_LAYER_KEY : route;
}

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

type TabsLayerProps = {
  activeRoute: TabRoute;
  activeTabKey: TabKey;
  onTabChange: (tab: TabKey) => void;
  onFabPress: () => void;
  onEntryPress: () => void;
};

function TabsLayer({
  activeRoute,
  activeTabKey,
  onTabChange,
  onFabPress,
  onEntryPress,
}: TabsLayerProps) {
  const [mounted, setMounted] = useState<Set<TabRoute>>(() => new Set([activeRoute]));

  if (!mounted.has(activeRoute)) {
    // Lazy-mount a tab the first time it becomes active.
    setMounted((prev) => {
      if (prev.has(activeRoute)) return prev;
      const next = new Set(prev);
      next.add(activeRoute);
      return next;
    });
  }

  return (
    <View style={{ flex: 1 }}>
      {mounted.has('garden') ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { display: activeRoute === 'garden' ? 'flex' : 'none' },
          ]}
        >
          <GardenScreen
            activeTab={activeTabKey}
            onTabChange={onTabChange}
            onFabPress={onFabPress}
          />
        </View>
      ) : null}
      {mounted.has('journalList') ? (
        <View
          style={[
            StyleSheet.absoluteFillObject,
            { display: activeRoute === 'journalList' ? 'flex' : 'none' },
          ]}
        >
          <JournalListScreen
            entries={SAMPLE_ENTRIES}
            activeTab={activeTabKey}
            onTabChange={onTabChange}
            onFabPress={onFabPress}
            onEntryPress={onEntryPress}
          />
        </View>
      ) : null}
    </View>
  );
}

function AuthFlow() {
  // TEMP: auth flow disabled for UI testing — flip back to 'onboarding' when auth is needed again.
  const [route, setRoute] = useState<Route>('garden');
  const [tabKey, setTabKey] = useState<TabKey>('garden');
  const [email, setEmail] = useState('');
  const previousRouteRef = useRef<Route>(route);

  const handleTabChange = useCallback((next: TabKey) => {
    setTabKey(next);
    setRoute(TAB_ROUTES[next]);
  }, []);

  const direction: RouteDirection = useMemo(() => {
    const prev = previousRouteRef.current;
    if (prev === route) return 'none';
    if (transitionKey(prev) === transitionKey(route)) return 'none';
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
      case 'garden':
      case 'journalList':
        return (
          <TabsLayer
            activeRoute={route}
            activeTabKey={tabKey}
            onTabChange={handleTabChange}
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
            onCancel={() => setRoute('journalList')}
            onSave={() => setRoute('entryDetail')}
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
    <RouteTransition routeKey={transitionKey(route)} direction={direction}>
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
