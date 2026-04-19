import type { ReactNode } from 'react';
import { Animated, FlatList, type FlatListProps, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { useBottomBarInset, useScrollSurfaceBehavior, useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';
import { FadeUnderHeader } from './FadeUnderHeader';
import { getFadeMaskHeight } from './FadeMask';
import { resolveScreenPaddingBottom } from './ScreenLayout';

// Preserve FlatList's generic typing — Animated.FlatList loses it in RN types.
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as typeof FlatList;

export type ScreenListProps<T> = Omit<FlatListProps<T>, 'contentContainerStyle'> & {
  edges?: Edge[];
  background?: ColorToken;
  padHorizontal?: boolean;
  /** When true, this list's scroll drives the floating tab bar hide/show animation. */
  enableTabBarHideOnScroll?: boolean;
  /** Additional content-container style merged on top of the auto paddings. */
  contentContainerStyle?: ViewStyle;
  ignoreBottomBarInset?: boolean;
  /**
   * Pinned header rendered above the list. When provided, the top edge inset
   * is applied to the header wrapper (not the list) and a top FadeMask is
   * overlaid on the list so content fades under the header as it scrolls.
   * Set `fadeUnderHeader={false}` to disable the fade.
   */
  pinnedHeader?: ReactNode;
  /** Soft fade under the pinned header. Defaults to `true` when pinnedHeader is set. */
  fadeUnderHeader?: boolean;
};

/**
 * Scrollable list screen with the same edge / bottom-bar inset handling as
 * `Screen` / `ScreenLayout`. Use when the primary surface is a FlatList and
 * you need virtualization (Garden grid, Journal list, etc).
 *
 * Preserves any caller-provided `paddingBottom` by summing it with the
 * floating-bar or safe-area inset.
 */
export function ScreenList<T>({
  edges = ['top'],
  background = 'bg',
  padHorizontal = false,
  enableTabBarHideOnScroll = false,
  contentContainerStyle,
  ignoreBottomBarInset = false,
  pinnedHeader,
  fadeUnderHeader,
  style,
  ...rest
}: ScreenListProps<T>) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rawBottomBarInset = useBottomBarInset();
  const bottomBarInset = ignoreBottomBarInset ? 0 : rawBottomBarInset;
  const edgeBottom = resolveScreenPaddingBottom({ edges, insetBottom: insets.bottom });
  const scrollSurface = useScrollSurfaceBehavior({
    mode: 'always',
    enableTabBarHideOnScroll,
  });

  const bottomInset = bottomBarInset || edgeBottom;
  const callerPaddingBottom = contentContainerStyle?.paddingBottom as number | undefined;
  const callerPaddingTop = contentContainerStyle?.paddingTop as number | undefined;
  const showFade = (fadeUnderHeader ?? Boolean(pinnedHeader)) && Boolean(pinnedHeader);
  // Reserve the fade's height so the first row isn't rendered under the
  // dimming gradient. Sums with any caller-provided paddingTop.
  const fadeInset = showFade ? getFadeMaskHeight(t) : 0;

  // Pinned header owns the top inset — don't double-apply it to the list.
  const listTopEdge = pinnedHeader ? false : edges.includes('top');

  // Single rule for "safe-area inset (if that edge is on) + screen padding
  // (if padHorizontal)". Shared between the list content padding and the
  // pinned-header wrapper so they can never drift.
  const resolveSidePadding = (edge: 'left' | 'right'): number => {
    const insetPx = edge === 'left' ? insets.left : insets.right;
    const padX = padHorizontal ? t.layout.screenPaddingX : 0;
    return edges.includes(edge) ? insetPx + padX : padX;
  };

  const sidePaddings = {
    paddingLeft: resolveSidePadding('left'),
    paddingRight: resolveSidePadding('right'),
  };

  const auto: ViewStyle = {
    paddingTop: listTopEdge ? insets.top : 0,
    ...sidePaddings,
  };

  const autoPaddingTop = (auto.paddingTop as number | undefined) ?? 0;
  const merged: ViewStyle = {
    ...auto,
    ...(contentContainerStyle ?? {}),
    paddingTop: (callerPaddingTop ?? autoPaddingTop) + fadeInset,
    paddingBottom:
      callerPaddingBottom !== undefined ? callerPaddingBottom + bottomInset : bottomInset,
  };

  // The pinned header wrapper owns the top edge inset AND the horizontal
  // padding (when `padHorizontal`) so callers never have to re-apply screen
  // padding by hand. Matches `ScreenLayout`'s `header` behavior.
  const headerSlot = pinnedHeader ? (
    <View
      style={{
        paddingTop: edges.includes('top') ? insets.top : 0,
        ...sidePaddings,
      }}
    >
      {pinnedHeader}
    </View>
  ) : null;

  return (
    <View style={{ flex: 1, backgroundColor: t.colors[background] }}>
      {headerSlot}
      <FadeUnderHeader enabled={showFade} background={background}>
        <AnimatedFlatList<T>
          contentContainerStyle={merged}
          style={style}
          scrollEnabled={scrollSurface.scrollEnabled}
          bounces={scrollSurface.bounces}
          showsVerticalScrollIndicator={scrollSurface.showsVerticalScrollIndicator}
          {...scrollSurface.measurementProps}
          {...scrollSurface.scrollProps}
          {...rest}
        />
      </FadeUnderHeader>
    </View>
  );
}
