import type { ReactNode } from 'react';
import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';
import type { ColorToken } from '../tokens/colors';
import { FadeMask } from './FadeMask';

export type FadeUnderHeaderProps = {
  /** Disable the overlay without removing the wrapper. */
  enabled?: boolean;
  /** Background token the fade dissolves into. Must match the surface behind. */
  background?: ColorToken;
  children: ReactNode;
  style?: ViewStyle;
};

// Wraps a scroller and overlays a top FadeMask so content dissolves into the
// pinned header above. Single source of truth for the pattern — every screen
// with a pinned header should compose through this instead of hand-rolling
// the View + FadeMask pair.
export function FadeUnderHeader({
  enabled = true,
  background = 'bg',
  children,
  style,
}: FadeUnderHeaderProps) {
  const t = useTheme();
  return (
    <View style={[{ flex: 1 }, style]}>
      {children}
      {enabled ? <FadeMask edge="top" color={t.colors[background]} /> : null}
    </View>
  );
}
