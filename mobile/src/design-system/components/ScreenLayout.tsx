// Screen foundation with a pinned header and a scrollable body. The `footer`
// slot (if any) scrolls with the body — pinning a footer is fragile to get
// right alongside a floating tab bar, keyboard open, and short content, so
// we keep everything below the header inside the same scroller.
import {
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  View,
  type ScrollViewProps,
  type ViewStyle,
} from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { useBottomBarInset, useScrollSurfaceBehavior, useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';
import type { SpacingToken } from '../tokens/spacing';
import { FadeUnderHeader } from './FadeUnderHeader';
import { getFadeMaskHeight } from './FadeMask';

/**
 * Shared helper: how much bottom padding a screen root should reserve for
 * the system safe-area edge. A floating bottom bar (if any) is layered on
 * top by the caller. Kept here so `Screen` / `ScreenList` can reuse the same
 * logic. Screen.tsx inlines the equivalent — keep in sync.
 */
export function resolveScreenPaddingBottom({
  edges,
  insetBottom,
}: {
  edges: Edge[];
  insetBottom: number;
}): number {
  return edges.includes('bottom') ? insetBottom : 0;
}

export type ScreenLayoutProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  /** Rendered as the last item inside the scrollable body. Not pinned. */
  footer?: React.ReactNode;
  edges?: Edge[];
  background?: ColorToken;
  padHorizontal?: boolean;
  /** When true, this layout's body scroll drives the floating tab bar hide/show animation. */
  enableTabBarHideOnScroll?: boolean;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
  bodyContentContainerStyle?: ViewStyle;
  disableScroll?: boolean;
  /** When true, the body shifts up when the keyboard opens; header stays pinned. */
  avoidKeyboard?: boolean;
  /** Opt out of auto-padding for a floating bottom bar (tab bar etc.). */
  ignoreBottomBarInset?: boolean;
  /** When true, tapping the body (non-interactive areas) dismisses the keyboard. */
  dismissKeyboardOnBodyTap?: boolean;
  /**
   * Soft fade overlay below the pinned header so scrolling content dissolves
   * into the header instead of hard-cutting. Defaults to `true` whenever a
   * `header` is present. Pass `false` to disable.
   */
  fadeUnderHeader?: boolean;
  /**
   * Vertical gap between direct children of the body. When set, children are
   * wrapped in a single View with this `gap`. Pass a `SpacingToken` (resolved
   * against `t.spacing`) or a raw number. Leave undefined to preserve the
   * legacy behavior where callers manage spacing via `bodyContentContainerStyle`.
   */
  bodyGap?: SpacingToken | number;
};

export function ScreenLayout({
  header,
  children,
  footer,
  edges = ['top', 'bottom'],
  background = 'bg',
  padHorizontal = false,
  enableTabBarHideOnScroll = false,
  scrollProps,
  bodyContentContainerStyle,
  disableScroll = false,
  avoidKeyboard = false,
  ignoreBottomBarInset = false,
  dismissKeyboardOnBodyTap = false,
  fadeUnderHeader = true,
  bodyGap,
}: ScreenLayoutProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rawBottomBarInset = useBottomBarInset();
  const bottomBarInset = ignoreBottomBarInset ? 0 : rawBottomBarInset;
  const scrollSurface = useScrollSurfaceBehavior({
    mode: disableScroll ? 'never' : 'overflow',
    enableTabBarHideOnScroll,
  });

  // A floating bar already covers the bottom safe-area — skip edge padding to
  // avoid double-counting.
  const rootPaddingBottom =
    bottomBarInset > 0 ? 0 : resolveScreenPaddingBottom({ edges, insetBottom: insets.bottom });

  const rootStyle: ViewStyle = {
    flex: 1,
    backgroundColor: t.colors[background],
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: rootPaddingBottom,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  const slotPadX: ViewStyle | null = padHorizontal
    ? { paddingHorizontal: t.layout.screenPaddingX }
    : null;

  // Footer now scrolls inside the body, so the body always owns the floating
  // bar inset on its bottom padding.
  const callerPaddingBottom = bodyContentContainerStyle?.paddingBottom as number | undefined;
  // Only render the fade when there's actually a scroller underneath — a
  // non-scrolling body has nothing to dissolve into the header, so the dim
  // band would just be dead visual weight near the top.
  const fadeActive = header !== undefined && fadeUnderHeader !== false && !disableScroll;
  // Reserve the fade's height at the top so initial content doesn't sit
  // under the dimming gradient. Sums with any caller-provided paddingTop.
  const callerPaddingTop = bodyContentContainerStyle?.paddingTop as number | undefined;
  const fadeInset = fadeActive ? getFadeMaskHeight(t) : 0;
  const bodyContainerStyle: ViewStyle = {
    flexGrow: 1,
    ...(slotPadX ?? {}),
    ...(bodyContentContainerStyle ?? {}),
    paddingTop: (callerPaddingTop ?? 0) + fadeInset,
    paddingBottom:
      callerPaddingBottom !== undefined ? callerPaddingBottom + bottomBarInset : bottomBarInset,
  };

  // Short content → footer bottoms out (flexGrow on the children wrapper
  // pushes footer to the bottom of the viewport). Tall content → children
  // exceed the viewport, ScrollView takes over, footer scrolls with content
  // and sits below the last item. Matches the Figma "sticky at bottom when
  // short, scroll when long" behavior without pinning.
  // In disableScroll mode, the body must be able to shrink (e.g. under a
  // keyboard with `avoidKeyboard`) — flexGrow:1 with default flexBasis:auto
  // won't go below content's natural size, trapping flex:1 children at full
  // height. flex:1 + minHeight:0 releases that floor.
  const resolvedBodyGap =
    bodyGap === undefined ? undefined : typeof bodyGap === 'number' ? bodyGap : t.spacing[bodyGap];

  const childrenWrapperStyle: ViewStyle = {
    ...(disableScroll ? { flex: 1, minHeight: 0 } : { flexGrow: 1 }),
    ...(resolvedBodyGap !== undefined ? { gap: resolvedBodyGap } : null),
  };

  const bodyInner = (
    <>
      <View style={childrenWrapperStyle}>{children}</View>
      {footer}
    </>
  );

  const bodyChildren = dismissKeyboardOnBodyTap ? (
    <Pressable accessible={false} onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      {bodyInner}
    </Pressable>
  ) : (
    bodyInner
  );

  const body = disableScroll ? (
    <View style={[{ flex: 1 }, bodyContainerStyle]}>{bodyChildren}</View>
  ) : (
    <Animated.ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={bodyContainerStyle}
      scrollEnabled={scrollSurface.scrollEnabled}
      alwaysBounceVertical={false}
      bounces={scrollSurface.bounces}
      showsVerticalScrollIndicator={scrollSurface.showsVerticalScrollIndicator}
      keyboardShouldPersistTaps="handled"
      {...scrollSurface.measurementProps}
      {...scrollSurface.scrollProps}
      {...scrollProps}
    >
      {bodyChildren}
    </Animated.ScrollView>
  );

  const bodyWrapped = avoidKeyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {body}
    </KeyboardAvoidingView>
  ) : (
    body
  );

  return (
    <View style={rootStyle}>
      {header !== undefined ? <View style={slotPadX ?? undefined}>{header}</View> : null}
      <FadeUnderHeader enabled={fadeActive} background={background}>
        {bodyWrapped}
      </FadeUnderHeader>
    </View>
  );
}
