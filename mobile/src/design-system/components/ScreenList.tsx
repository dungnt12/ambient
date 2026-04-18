import { Animated, FlatList, type FlatListProps, View, type ViewStyle } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { useBottomBarInset, useTabBarScrollProps, useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';
import { resolveScreenPaddingBottom } from './ScreenLayout';

// Preserve FlatList's generic typing — Animated.FlatList loses it in RN types.
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList) as unknown as typeof FlatList;

export type ScreenListProps<T> = Omit<FlatListProps<T>, 'contentContainerStyle'> & {
  edges?: Edge[];
  background?: ColorToken;
  padHorizontal?: boolean;
  /** Additional content-container style merged on top of the auto paddings. */
  contentContainerStyle?: ViewStyle;
  ignoreBottomBarInset?: boolean;
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
  contentContainerStyle,
  ignoreBottomBarInset = false,
  style,
  ...rest
}: ScreenListProps<T>) {
  const t = useTheme();
  const insets = useSafeAreaInsets();
  const rawBottomBarInset = useBottomBarInset();
  const bottomBarInset = ignoreBottomBarInset ? 0 : rawBottomBarInset;
  const edgeBottom = resolveScreenPaddingBottom({ edges, insetBottom: insets.bottom });
  const tabBarScrollProps = useTabBarScrollProps();

  const bottomInset = bottomBarInset || edgeBottom;
  const callerPaddingBottom = contentContainerStyle?.paddingBottom as number | undefined;

  const auto: ViewStyle = {
    paddingTop: edges.includes('top') ? insets.top : 0,
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

  const merged: ViewStyle = {
    ...auto,
    ...(contentContainerStyle ?? {}),
    paddingBottom:
      callerPaddingBottom !== undefined ? callerPaddingBottom + bottomInset : bottomInset,
  };

  return (
    <View style={{ flex: 1, backgroundColor: t.colors[background] }}>
      <AnimatedFlatList<T>
        contentContainerStyle={merged}
        style={style}
        {...tabBarScrollProps}
        {...rest}
      />
    </View>
  );
}
