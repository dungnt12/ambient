import { View, type ViewStyle } from 'react-native';
import { useTheme } from '../theme';

export type FadeMaskProps = {
  edge?: 'top' | 'bottom';
  height?: number;
  color?: string;
  /** Number of stacked strips. More = smoother, but costs more views. 8 is sweet spot. */
  steps?: number;
  style?: ViewStyle;
};

// Stacked-strip fade: avoids depending on expo-linear-gradient (which requires
// a dev-client rebuild). Each strip is a 1/steps-tall View with a stepped
// alpha of `color`. On parchment bg at 8 steps, banding is imperceptible.
export function FadeMask({ edge = 'top', height, color, steps = 8, style }: FadeMaskProps) {
  const t = useTheme();
  const base = color ?? t.colors.bg;
  const h = height ?? t.spacing.xl;
  const stripHeight = h / steps;

  const strips = Array.from({ length: steps }, (_, i) => {
    // i=0 is nearest the opaque edge (alpha=1), i=steps-1 is nearest the content (alpha→0).
    const t01 = i / (steps - 1);
    const alpha = 1 - t01;
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
