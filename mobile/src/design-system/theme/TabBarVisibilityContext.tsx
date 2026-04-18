import { createContext, useContext, useMemo, useRef, type ReactNode } from 'react';
import { Animated, type NativeScrollEvent, type NativeSyntheticEvent } from 'react-native';

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
export function useTabBarScrollProps(): TabBarScrollProps | Record<string, never> {
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
