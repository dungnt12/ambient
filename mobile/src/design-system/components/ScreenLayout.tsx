// Screen foundation with pinned header/footer slots and a body that only
// enables scroll gestures when content actually overflows.
import { useState } from 'react';
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
import { useBottomBarInset, useTabBarScrollProps, useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';

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
  footer?: React.ReactNode;
  edges?: Edge[];
  background?: ColorToken;
  padHorizontal?: boolean;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
  bodyContentContainerStyle?: ViewStyle;
  disableScroll?: boolean;
  /** When true, body + footer shift up when the keyboard opens; header stays pinned. */
  avoidKeyboard?: boolean;
  /** Opt out of auto-padding for a floating bottom bar (tab bar etc.). */
  ignoreBottomBarInset?: boolean;
  /** When true, tapping the body (non-interactive areas) dismisses the keyboard. */
  dismissKeyboardOnBodyTap?: boolean;
};

export function ScreenLayout({
  header,
  children,
  footer,
  edges = ['top', 'bottom'],
  background = 'bg',
  padHorizontal = false,
  scrollProps,
  bodyContentContainerStyle,
  disableScroll = false,
  avoidKeyboard = false,
  ignoreBottomBarInset = false,
  dismissKeyboardOnBodyTap = false,
}: ScreenLayoutProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rawBottomBarInset = useBottomBarInset();
  const bottomBarInset = ignoreBottomBarInset ? 0 : rawBottomBarInset;
  const [containerHeight, setContainerHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const overflows = contentHeight > containerHeight + 0.5;

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

  // If a footer is pinned, it owns the bottom edge (we push the floating-bar
  // inset down to the footer wrapper instead). Otherwise the scrollable body
  // needs the bottom padding so its last row isn't covered by the bar.
  const bodyBottomPadding = footer !== undefined ? 0 : bottomBarInset;

  const callerPaddingBottom = bodyContentContainerStyle?.paddingBottom as number | undefined;
  const bodyContainerStyle: ViewStyle = {
    flexGrow: 1,
    ...(slotPadX ?? {}),
    ...(bodyContentContainerStyle ?? {}),
    paddingBottom:
      callerPaddingBottom !== undefined
        ? callerPaddingBottom + bodyBottomPadding
        : bodyBottomPadding,
  };

  const bodyChildren = dismissKeyboardOnBodyTap ? (
    <Pressable accessible={false} onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      {children}
    </Pressable>
  ) : (
    children
  );

  const tabBarScrollProps = useTabBarScrollProps();

  const body = disableScroll ? (
    <View style={[{ flex: 1 }, bodyContainerStyle]}>{bodyChildren}</View>
  ) : (
    <Animated.ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={bodyContainerStyle}
      scrollEnabled={overflows}
      alwaysBounceVertical={false}
      bounces={overflows}
      showsVerticalScrollIndicator={overflows}
      keyboardShouldPersistTaps="handled"
      onLayout={(e) => setContainerHeight(e.nativeEvent.layout.height)}
      onContentSizeChange={(_, h) => setContentHeight(h)}
      {...tabBarScrollProps}
      {...scrollProps}
    >
      {bodyChildren}
    </Animated.ScrollView>
  );

  const footerSlot =
    footer !== undefined ? (
      <View style={[slotPadX, bottomBarInset > 0 ? { paddingBottom: bottomBarInset } : null]}>
        {footer}
      </View>
    ) : null;

  const bodyAndFooter = avoidKeyboard ? (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {body}
      {footerSlot}
    </KeyboardAvoidingView>
  ) : (
    <>
      {body}
      {footerSlot}
    </>
  );

  return (
    <View style={rootStyle}>
      {header !== undefined ? <View style={slotPadX ?? undefined}>{header}</View> : null}
      {bodyAndFooter}
    </View>
  );
}
