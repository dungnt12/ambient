import { useEffect, useMemo, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TabBar, useTabBarVisibilityScrollY, useTheme, type TabKey } from '../design-system';
import type { RootNav, TabParamList } from './types';

const ROUTE_TO_TAB_KEY: Record<keyof TabParamList, TabKey> = {
  Garden: 'garden',
  Journal: 'journal',
  Group: 'group',
  You: 'you',
};

const TAB_KEY_TO_ROUTE: Record<TabKey, keyof TabParamList> = {
  garden: 'Garden',
  journal: 'Journal',
  group: 'Group',
  you: 'You',
};

// How much vertical scroll we need to see (in one direction) before flipping
// the tab bar visibility. Keeps jitter from micro-scrolls from re-triggering.
const DIRECTION_THRESHOLD = 6;

// How fast the bar snaps to fully hidden / fully visible.
const SNAP_DURATION_MS = 220;

export function AppTabBar({ state, navigation }: BottomTabBarProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rootNav = useNavigation<RootNav<'Tabs'>>();
  const activeRouteName = state.routes[state.index].name as keyof TabParamList;
  const active = ROUTE_TO_TAB_KEY[activeRouteName];

  const scrollY = useTabBarVisibilityScrollY();
  const hideDistance = t.spacing.xs + t.layout.tabBarHeight + Math.max(insets.bottom, t.spacing.xs);

  // `hidden` is a 0→1 toggle (not a tracking translate) so the bar always
  // snaps to fully-visible or fully-hidden — never parks mid-slide. The
  // Animated.timing itself runs on the native thread via useNativeDriver.
  const hidden = useRef(new Animated.Value(0)).current;
  const lastY = useRef(0);
  const lastDirection = useRef<'up' | 'down' | null>(null);
  const anim = useRef<Animated.CompositeAnimation | null>(null);
  // After a tab switch, treat incoming scroll events as baseline-only (no
  // direction decision) until BOTH conditions clear:
  //   1. The resync time window has elapsed, AND
  //   2. At least one event has arrived to re-baseline `lastY`.
  // Reason: React Navigation keeps previous tabs mounted, so their scrollers
  // can emit stray events during the handoff, and the new tab's scroller
  // often fires mount/layout-driven events before the user actually scrolls.
  // Using only a time window fails when no event arrives inside it and the
  // first later event jumps from a stale `lastY` to the new offset — read
  // as a huge "down" delta and the bar hides immediately.
  const resyncUntil = useRef(0);
  const needsBaseline = useRef(true);
  const RESYNC_WINDOW_MS = 350;

  const snapTo = useRef((toValue: 0 | 1) => {
    anim.current?.stop();
    anim.current = Animated.timing(hidden, {
      toValue,
      duration: SNAP_DURATION_MS,
      useNativeDriver: true,
    });
    anim.current.start();
  }).current;

  // When the active tab changes, the previous tab's scroll position is
  // irrelevant — force the bar visible and reset the tracking state so the
  // new tab starts from a clean baseline. Without this, hiding the bar on
  // tab A and then switching to tab B leaves the bar hidden on B (no scroll
  // events fire to bring it back). scrollY is shared across tabs via
  // context, so also reset it to 0 so the new tab's first downward scroll
  // correctly registers as "down" instead of matching the stale offset.
  useEffect(() => {
    lastDirection.current = 'up';
    resyncUntil.current = Date.now() + RESYNC_WINDOW_MS;
    needsBaseline.current = true;
    snapTo(0);
  }, [state.index, snapTo]);

  useEffect(() => {
    const id = scrollY.addListener(({ value }) => {
      // Baseline-only while inside the resync window, OR until the first
      // event after a switch has arrived to re-seed `lastY`. See the
      // `resyncUntil` / `needsBaseline` declaration for why both are needed.
      if (needsBaseline.current || Date.now() < resyncUntil.current) {
        needsBaseline.current = false;
        lastY.current = value;
        return;
      }

      // At/near the top, always show — overscroll bounce shouldn't hide the bar.
      if (value <= 0) {
        if (lastDirection.current !== 'up') {
          lastDirection.current = 'up';
          snapTo(0);
        }
        lastY.current = value;
        return;
      }

      const dy = value - lastY.current;
      if (Math.abs(dy) < DIRECTION_THRESHOLD) return;

      const direction: 'up' | 'down' = dy > 0 ? 'down' : 'up';
      if (direction !== lastDirection.current) {
        lastDirection.current = direction;
        snapTo(direction === 'down' ? 1 : 0);
      }
      lastY.current = value;
    });

    return () => {
      scrollY.removeListener(id);
      anim.current?.stop();
    };
  }, [scrollY, snapTo]);

  const translateY = useMemo(
    () => hidden.interpolate({ inputRange: [0, 1], outputRange: [0, hideDistance] }),
    [hidden, hideDistance],
  );

  return (
    <Animated.View
      pointerEvents="box-none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        paddingTop: t.spacing.xs,
        paddingBottom: Math.max(insets.bottom, t.spacing.xs),
        backgroundColor: 'transparent',
        transform: [{ translateY }],
      }}
    >
      <TabBar
        active={active}
        onChange={(next) => navigation.navigate(TAB_KEY_TO_ROUTE[next])}
        onFabPress={() => rootNav.navigate('JournalCompose')}
      />
    </Animated.View>
  );
}
