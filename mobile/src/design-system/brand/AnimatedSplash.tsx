import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../theme';
import { Wordmark } from './Wordmark';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type AnimatedSplashProps = {
  /** Called once the intro animation finishes (≈1100ms). */
  onDone?: () => void;
};

/**
 * Ambient splash — a warm dot radiating two fading rings (the brand mark
 * in motion). Renders on a parchment background. Total intro: ~1.1s.
 */
export function AnimatedSplash({ onDone }: AnimatedSplashProps) {
  const t = useTheme();
  const dotScale = useRef(new Animated.Value(t.brand.splash.dotScaleStart)).current;
  const ringInnerProgress = useRef(new Animated.Value(0)).current;
  const ringOuterProgress = useRef(new Animated.Value(0)).current;
  const wordmarkOpacity = useRef(new Animated.Value(0)).current;
  const wordmarkTranslate = useRef(new Animated.Value(t.brand.wordmark.entranceTranslateY)).current;

  useEffect(() => {
    const { duration, easing, spring, stagger } = t.motion;
    const intro = Animated.parallel([
      Animated.spring(dotScale, {
        toValue: 1,
        ...spring.standard,
        useNativeDriver: false,
      }),
      Animated.stagger(stagger.loose, [
        Animated.timing(ringInnerProgress, {
          toValue: 1,
          duration: duration.splash,
          easing: easing.entrance,
          useNativeDriver: false,
        }),
        Animated.timing(ringOuterProgress, {
          toValue: 1,
          duration: duration.splash,
          easing: easing.entrance,
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.delay(t.motion.stagger.loose * t.brand.splash.wordmarkDelayMultiplier),
        Animated.parallel([
          Animated.timing(wordmarkOpacity, {
            toValue: 1,
            duration: duration.slower,
            easing: easing.entrance,
            useNativeDriver: true,
          }),
          Animated.timing(wordmarkTranslate, {
            toValue: 0,
            duration: duration.slower,
            easing: easing.entrance,
            useNativeDriver: true,
          }),
        ]),
      ]),
    ]);

    intro.start(({ finished }) => {
      if (finished) onDone?.();
    });

    return () => intro.stop();
  }, [
    dotScale,
    ringInnerProgress,
    ringOuterProgress,
    wordmarkOpacity,
    wordmarkTranslate,
    onDone,
    t.brand.splash.wordmarkDelayMultiplier,
    t.motion,
  ]);

  const size = t.brand.mark.splash;
  const c = size / 2;
  const stroke = Math.max(t.brand.mark.strokeMin, size * t.brand.mark.strokeWidthRatio);

  const ringInnerR = ringInnerProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      size * t.brand.mark.dotRadiusRatio,
      size * t.brand.mark.innerRingRadiusRatio - stroke / 2,
    ],
  });
  const ringInnerOpacity = ringInnerProgress.interpolate({
    inputRange: [0, t.brand.splash.ringPeakProgress, 1],
    outputRange: [0, t.brand.splash.ringInnerPeakOpacity, t.brand.mark.innerRingOpacity],
  });
  const ringOuterR = ringOuterProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [
      size * t.brand.mark.dotRadiusRatio,
      size * t.brand.mark.outerRingRadiusRatio - stroke / 2,
    ],
  });
  const ringOuterOpacity = ringOuterProgress.interpolate({
    inputRange: [0, t.brand.splash.ringPeakProgress, 1],
    outputRange: [0, t.brand.splash.ringOuterPeakOpacity, t.brand.mark.outerRingOpacity],
  });

  return (
    <View style={[styles.root, { backgroundColor: t.colors.bg }]}>
      <View style={styles.stack}>
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            <AnimatedCircle
              cx={c}
              cy={c}
              r={ringOuterR}
              stroke={t.colors.brand}
              strokeOpacity={ringOuterOpacity}
              strokeWidth={stroke}
              fill="none"
            />
            <AnimatedCircle
              cx={c}
              cy={c}
              r={ringInnerR}
              stroke={t.colors.brand}
              strokeOpacity={ringInnerOpacity}
              strokeWidth={stroke}
              fill="none"
            />
          </Svg>
          <Animated.View
            style={[
              styles.dot,
              {
                width: size * (t.brand.mark.dotRadiusRatio * 2),
                height: size * (t.brand.mark.dotRadiusRatio * 2),
                borderRadius: size * t.brand.mark.dotRadiusRatio,
                backgroundColor: t.colors.brand,
                transform: [{ scale: dotScale }],
              },
            ]}
          />
        </View>
        <Animated.View
          style={{
            opacity: wordmarkOpacity,
            transform: [{ translateY: wordmarkTranslate }],
            marginTop: t.spacing.lg,
          }}
        >
          <Wordmark size={t.brand.wordmark.splashSize} />
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stack: {
    alignItems: 'center',
  },
  dot: {
    position: 'absolute',
  },
});
