import { Animated, View, type ScrollViewProps, type ViewStyle } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { useBottomBarInset, useScrollSurfaceBehavior, useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';

export type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  background?: ColorToken;
  scroll?: boolean;
  /** When true, this screen's scroll drives the floating tab bar hide/show animation. */
  enableTabBarHideOnScroll?: boolean;
  padHorizontal?: boolean;
  contentContainerStyle?: ViewStyle;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
  // Opt out of auto-padding for a floating bottom bar (e.g. tab bar).
  // Defaults to false so every screen sitting inside a BottomBarInsetProvider
  // reserves the right amount of space without threading props.
  ignoreBottomBarInset?: boolean;
};

export function Screen({
  children,
  edges = ['top'],
  background = 'bg',
  scroll = false,
  enableTabBarHideOnScroll = false,
  padHorizontal = false,
  contentContainerStyle,
  scrollProps,
  ignoreBottomBarInset = false,
}: ScreenProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rawBottomBarInset = useBottomBarInset();
  const bottomBarInset = ignoreBottomBarInset ? 0 : rawBottomBarInset;

  // When Screen is the ScrollView itself, apply the floating-bar inset to its
  // content so the last row isn't covered. When Screen is just a flex container
  // wrapping another scroller (FlatList, etc.), leave the bottom alone — the
  // inner scroller reads useBottomBarInset() itself. In both cases, the bar
  // covers the bottom safe-area so we skip the edge 'bottom' inset when a
  // provider is active.
  const edgeBottom = edges.includes('bottom') ? insets.bottom : 0;
  const paddingBottom = scroll ? bottomBarInset || edgeBottom : bottomBarInset > 0 ? 0 : edgeBottom;

  const padding = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom,
    paddingLeft: edges.includes('left')
      ? insets.left + (padHorizontal ? t.layout.screenPaddingX : 0)
      : padHorizontal
        ? t.layout.screenPaddingX
        : 0,
    paddingRight: edges.includes('right')
      ? insets.right + (padHorizontal ? t.layout.screenPaddingX : 0)
      : padHorizontal
        ? t.layout.screenPaddingX
        : 0,
  };

  const bg = t.colors[background];
  const scrollSurface = useScrollSurfaceBehavior({
    mode: scroll ? 'always' : 'never',
    enableTabBarHideOnScroll,
  });

  if (scroll) {
    return (
      <Animated.ScrollView
        style={{ flex: 1, backgroundColor: bg }}
        contentContainerStyle={[padding, contentContainerStyle]}
        scrollEnabled={scrollSurface.scrollEnabled}
        bounces={scrollSurface.bounces}
        showsVerticalScrollIndicator={scrollSurface.showsVerticalScrollIndicator}
        {...scrollSurface.measurementProps}
        {...scrollSurface.scrollProps}
        {...scrollProps}
      >
        {children}
      </Animated.ScrollView>
    );
  }

  return <View style={[{ flex: 1, backgroundColor: bg }, padding]}>{children}</View>;
}
