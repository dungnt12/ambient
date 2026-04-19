import { View, type ViewStyle } from 'react-native';
import { useTheme, type Theme } from '../theme';

// The fade dissolves over one spacing.xl from the opaque edge. Exported so
// scroll containers can reserve matching top padding and keep initial content
// out from under the mask.
export function getFadeMaskHeight(t: Theme): number {
  return t.spacing.xl;
}

export type FadeMaskProps = {
  edge?: 'top' | 'bottom';
  /**
   * Background color the fade dissolves into. Defaults to `theme.colors.bg`.
   * Only override when the scroll area sits on a non-bg surface.
   */
  color?: string;
  style?: ViewStyle;
};

// Single source of truth for the fade-under-header effect. Height, step count,
// alpha curve are baked in so every screen (list, scroll, pinned) renders the
// exact same dissolve. Do not expose these as props — uniformity is the point.
const FADE_STEPS = 14;
const FADE_MAX_ALPHA = 0.92;

// Stacked-strip fade with ease-out curve so alpha drops fast near the opaque
// edge and settles slowly toward transparent — avoids the "solid band" look a
// linear ramp produces when content sits flush against the header.
export function FadeMask({ edge = 'top', color, style }: FadeMaskProps) {
  const t = useTheme();
  const base = color ?? t.colors.bg;
  const h = getFadeMaskHeight(t);
  const stripHeight = h / FADE_STEPS;
  const steps = FADE_STEPS;

  const strips = Array.from({ length: steps }, (_, i) => {
    // i=0 sits at the opaque edge. Ease-out: alpha = maxAlpha * (1 - t)^2.
    const t01 = i / (steps - 1);
    const eased = (1 - t01) * (1 - t01);
    const alpha = FADE_MAX_ALPHA * eased;
    const alphaHex = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, '0');
    return `${base}${alphaHex}`;
  });

  const orderedStrips = edge === 'top' ? strips : [...strips].reverse();

  return (
    <View
      pointerEvents="none"
      style={[
        {
          position: 'absolute',
          left: 0,
          right: 0,
          height: h,
        },
        edge === 'top' ? { top: 0 } : { bottom: 0 },
        style,
      ]}
    >
      {orderedStrips.map((bg, i) => (
        <View
          key={i}
          style={{
            height: stripHeight,
            backgroundColor: bg,
          }}
        />
      ))}
    </View>
  );
}
