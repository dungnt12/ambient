import { ScrollView, View, type ScrollViewProps, type ViewStyle } from 'react-native';
import { useSafeAreaInsets, type Edge } from 'react-native-safe-area-context';
import { useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';

export type ScreenProps = {
  children: React.ReactNode;
  edges?: Edge[];
  background?: ColorToken;
  scroll?: boolean;
  padHorizontal?: boolean;
  contentContainerStyle?: ViewStyle;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
};

export function Screen({
  children,
  edges = ['top'],
  background = 'bg',
  scroll = false,
  padHorizontal = false,
  contentContainerStyle,
  scrollProps,
}: ScreenProps) {
  const t = useTheme();
  const insets = useSafeAreaInsets();

  const padding = {
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
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

  if (scroll) {
    return (
      <ScrollView
        style={{ flex: 1, backgroundColor: bg }}
        contentContainerStyle={[padding, contentContainerStyle]}
        {...scrollProps}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[{ flex: 1, backgroundColor: bg }, padding]}>{children}</View>;
}
