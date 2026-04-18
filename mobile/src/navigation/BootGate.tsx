import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AnimatedSplash, useAppFonts, useTheme } from '../design-system';

SplashScreen.preventAutoHideAsync().catch(() => undefined);

type Props = { children: ReactNode };

export function BootGate({ children }: Props) {
  const t = useTheme();
  const fontsLoaded = useAppFonts();
  const [introDone, setIntroDone] = useState(false);
  const [overlayOpacity] = useState(() => new Animated.Value(1));
  const [overlayMounted, setOverlayMounted] = useState(true);

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync().catch(() => undefined);
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
      {fontsLoaded ? children : null}
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
