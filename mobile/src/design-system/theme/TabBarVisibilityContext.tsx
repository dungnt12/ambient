import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import {
  Animated,
  type LayoutChangeEvent,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

// Minimum vertical overflow (contentHeight − containerHeight) before a
// scroll container is allowed to drive the tab-bar hide animation. Below
// this, a short scroll on a mostly-static screen (settings, profile) would
// flip the bar for no reason.
export const TAB_BAR_HIDE_MIN_OVERFLOW = 160;

// Shared scroll signal that lets a floating tab bar hide on scroll down and
// reveal on scroll up. Any scroll container inside the provider spreads the
// props from `useTabBarScrollProps()` to feed its offset into `scrollY`;
// the bar derives translateY via `Animated.diffClamp` so the math runs on
// the native thread.
type Ctx = { scrollY: Animated.Value };

const TabBarVisibilityContext = createContext<Ctx | null>(null);

export function TabBarVisibilityProvider({
  scrollY,
  children,
}: {
  scrollY: Animated.Value;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ scrollY }), [scrollY]);
  return (
    <TabBarVisibilityContext.Provider value={value}>{children}</TabBarVisibilityContext.Provider>
  );
}

export function useTabBarVisibility(): Ctx | null {
  return useContext(TabBarVisibilityContext);
}

// Stable Animated.Value used when no provider is mounted; keeps hook output
// shape consistent without allocating per render.
const noopScrollY = new Animated.Value(0);

export function useTabBarVisibilityScrollY(): Animated.Value {
  return useContext(TabBarVisibilityContext)?.scrollY ?? noopScrollY;
}

export type TabBarScrollProps = {
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollEventThrottle: number;
};

// Spread onto Animated.ScrollView / Animated.FlatList to connect the scroller
// to the tab bar visibility signal. No-op when outside a provider.
function useTabBarScrollProps(): TabBarScrollProps | Record<string, never> {
  const ctx = useContext(TabBarVisibilityContext);
  return useMemo((): TabBarScrollProps | Record<string, never> => {
    if (!ctx) return {};
    return {
      onScroll: Animated.event([{ nativeEvent: { contentOffset: { y: ctx.scrollY } } }], {
        useNativeDriver: true,
      }),
      scrollEventThrottle: 16,
    };
  }, [ctx]);
}

export function useTabBarScrollY(): Animated.Value {
  const ref = useRef<Animated.Value | null>(null);
  if (ref.current === null) ref.current = new Animated.Value(0);
  return ref.current;
}

export type ScrollSurfaceMode = 'never' | 'overflow' | 'always';

export type ScrollSurfaceMeasurementProps = {
  onLayout?: (e: LayoutChangeEvent) => void;
  onContentSizeChange?: (w: number, h: number) => void;
};

export type ScrollSurfaceBehavior = {
  measurementProps: ScrollSurfaceMeasurementProps;
  scrollProps: TabBarScrollProps | Record<string, never>;
  /** Content overflows the container — scroll gestures should be enabled. */
  overflows: boolean;
  /** Overflow exceeds `TAB_BAR_HIDE_MIN_OVERFLOW` — tab-bar hide is armed. */
  tabBarHideArmed: boolean;
  scrollEnabled: boolean;
  bounces: boolean;
  showsVerticalScrollIndicator: boolean;
};

type ScrollSurfaceMeasuredState = {
  overflows: boolean;
  tabBarHideArmed: boolean;
};

const OVERFLOW_EPSILON = 0.5;
const EMPTY_SCROLL_SURFACE_MEASUREMENT_PROPS = Object.freeze({}) as ScrollSurfaceMeasurementProps;
const EMPTY_SCROLL_SURFACE_SCROLL_PROPS = Object.freeze({}) as Record<string, never>;

function shallowEqualScrollSurfaceState(
  a: ScrollSurfaceMeasuredState,
  b: ScrollSurfaceMeasuredState,
): boolean {
  return a.overflows === b.overflows && a.tabBarHideArmed === b.tabBarHideArmed;
}

function deriveScrollSurfaceMeasuredState({
  mode,
  containerHeight,
  contentHeight,
}: {
  mode: ScrollSurfaceMode;
  containerHeight: number;
  contentHeight: number;
}): ScrollSurfaceMeasuredState {
  const overflows =
    mode === 'overflow' ? contentHeight > containerHeight + OVERFLOW_EPSILON : false;
  const tabBarHideArmed =
    mode !== 'never' && contentHeight - containerHeight > TAB_BAR_HIDE_MIN_OVERFLOW;

  return { overflows, tabBarHideArmed };
}

function deriveScrollSurfaceBehavior({
  mode,
  measured,
}: {
  mode: ScrollSurfaceMode;
  measured: ScrollSurfaceMeasuredState;
}) {
  const scrollEnabled = mode === 'always' ? true : mode === 'overflow' ? measured.overflows : false;
  return {
    overflows: measured.overflows,
    tabBarHideArmed: measured.tabBarHideArmed,
    scrollEnabled,
    bounces: scrollEnabled,
    showsVerticalScrollIndicator: scrollEnabled,
  };
}

// Single controller for scroll surfaces. It decides if a container should
// scroll at all, and whether that scroll is allowed to drive the floating
// tab bar hide animation. Non-opt-in surfaces avoid measurement and scroll
// listeners entirely.
export function useScrollSurfaceBehavior({
  mode,
  enableTabBarHideOnScroll = false,
}: {
  mode: ScrollSurfaceMode;
  enableTabBarHideOnScroll?: boolean;
}): ScrollSurfaceBehavior {
  const nativeScrollProps = useTabBarScrollProps();
  const containerHeightRef = useRef(0);
  const contentHeightRef = useRef(0);
  const initialMeasured = useMemo(
    () =>
      deriveScrollSurfaceMeasuredState({
        mode,
        containerHeight: containerHeightRef.current,
        contentHeight: contentHeightRef.current,
      }),
    [mode],
  );
  const measuredRef = useRef(initialMeasured);
  const [measured, setMeasured] = useState(initialMeasured);
  const needsMeasurement = mode === 'overflow' || (mode === 'always' && enableTabBarHideOnScroll);

  const commitMeasured = useCallback((next: ScrollSurfaceMeasuredState) => {
    if (shallowEqualScrollSurfaceState(measuredRef.current, next)) return;
    measuredRef.current = next;
    setMeasured(next);
  }, []);

  const recomputeMeasured = useCallback(() => {
    const next = deriveScrollSurfaceMeasuredState({
      mode,
      containerHeight: containerHeightRef.current,
      contentHeight: contentHeightRef.current,
    });
    commitMeasured(next);
  }, [commitMeasured, mode]);

  useEffect(() => {
    if (!needsMeasurement) {
      commitMeasured({ overflows: false, tabBarHideArmed: false });
      return;
    }
    recomputeMeasured();
  }, [commitMeasured, needsMeasurement, recomputeMeasured]);

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const nextHeight = e.nativeEvent.layout.height;
      if (containerHeightRef.current === nextHeight) return;
      containerHeightRef.current = nextHeight;
      recomputeMeasured();
    },
    [recomputeMeasured],
  );

  const onContentSizeChange = useCallback(
    (_: number, h: number) => {
      if (contentHeightRef.current === h) return;
      contentHeightRef.current = h;
      recomputeMeasured();
    },
    [recomputeMeasured],
  );

  const measurementProps = useMemo(
    (): ScrollSurfaceMeasurementProps =>
      needsMeasurement
        ? {
            onLayout,
            onContentSizeChange,
          }
        : EMPTY_SCROLL_SURFACE_MEASUREMENT_PROPS,
    [needsMeasurement, onContentSizeChange, onLayout],
  );

  const scrollProps = useMemo(
    (): TabBarScrollProps | Record<string, never> =>
      enableTabBarHideOnScroll && measured.tabBarHideArmed
        ? nativeScrollProps
        : EMPTY_SCROLL_SURFACE_SCROLL_PROPS,
    [enableTabBarHideOnScroll, measured.tabBarHideArmed, nativeScrollProps],
  );

  const behavior = useMemo(
    () =>
      deriveScrollSurfaceBehavior({
        mode,
        measured,
      }),
    [measured, mode],
  );

  return {
    measurementProps,
    scrollProps,
    ...behavior,
  };
}
