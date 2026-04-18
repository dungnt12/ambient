import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useTheme } from '../../theme';

export type RouteDirection = 'forward' | 'backward' | 'none';

export type RouteTransitionProps = {
  routeKey: string;
  direction?: RouteDirection;
  children: ReactNode;
};

type Snapshot = { key: string; node: ReactNode };

const SLIDE_RATIO = 0.08;

/**
 * RouteTransition — crossfade + horizontal slide between screens.
 * Snapshots the outgoing screen, animates it out while the new one slides in
 * from the side dictated by `direction`. Uses motion.duration.base + standard
 * easing so all flows share one cadence.
 */
export function RouteTransition({
  routeKey,
  direction = 'forward',
  children,
}: RouteTransitionProps) {
  const t = useTheme();
  const { width } = useWindowDimensions();
  const progress = useRef(new Animated.Value(1)).current;
  const lastKeyRef = useRef(routeKey);
  const lastChildrenRef = useRef<ReactNode>(children);
  const [previous, setPrevious] = useState<Snapshot | null>(null);

  // Snapshot prev + animate when routeKey changes. Children-only changes skip.
  useEffect(() => {
    if (routeKey === lastKeyRef.current) return;
    setPrevious({ key: lastKeyRef.current, node: lastChildrenRef.current });
    lastKeyRef.current = routeKey;
    progress.setValue(0);
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration: t.motion.duration.base,
      easing: t.motion.easing.standard,
      useNativeDriver: true,
    });
    anim.start(({ finished }) => {
      if (finished) setPrevious(null);
    });
    return () => anim.stop();
  }, [routeKey, progress, t.motion]);

  // Track latest children for the next snapshot. Runs after the route effect.
  useEffect(() => {
    lastChildrenRef.current = children;
  }, [children]);

  const distance = width * SLIDE_RATIO;
  const sign = direction === 'backward' ? -1 : direction === 'none' ? 0 : 1;

  const incomingStyle = {
    opacity: progress,
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [sign * distance, 0],
        }),
      },
    ],
  };

  const outgoingStyle = {
    opacity: progress.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }),
    transform: [
      {
        translateX: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -sign * distance],
        }),
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      {previous ? (
        <Animated.View
          key={previous.key}
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, outgoingStyle]}
        >
          {previous.node}
        </Animated.View>
      ) : null}
      <Animated.View key={routeKey} style={[{ flex: 1 }, incomingStyle]}>
        {children}
      </Animated.View>
    </View>
  );
}
