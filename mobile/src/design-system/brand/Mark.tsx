import Svg, { Circle } from 'react-native-svg';
import { useTheme } from '../theme';

export type MarkProps = {
  size?: number;
  tone?: 'light' | 'dark';
};

export function Mark({ size, tone = 'light' }: MarkProps) {
  const t = useTheme();
  const resolvedSize = size ?? t.brand.mark.default;
  const brand = t.colors.brand;
  const ringOuterColor = tone === 'dark' ? t.palette.brand.coral : brand;
  const c = resolvedSize / 2;
  const stroke = Math.max(t.brand.mark.strokeMin, resolvedSize * t.brand.mark.strokeWidthRatio);

  return (
    <Svg width={resolvedSize} height={resolvedSize} viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}>
      <Circle
        cx={c}
        cy={c}
        r={resolvedSize * t.brand.mark.outerRingRadiusRatio - stroke / 2}
        stroke={ringOuterColor}
        strokeOpacity={t.brand.mark.outerRingOpacity}
        strokeWidth={stroke}
        fill="none"
      />
      <Circle
        cx={c}
        cy={c}
        r={resolvedSize * t.brand.mark.innerRingRadiusRatio - stroke / 2}
        stroke={ringOuterColor}
        strokeOpacity={t.brand.mark.innerRingOpacity}
        strokeWidth={stroke}
        fill="none"
      />
      <Circle cx={c} cy={c} r={resolvedSize * t.brand.mark.dotRadiusRatio} fill={brand} />
    </Svg>
  );
}
