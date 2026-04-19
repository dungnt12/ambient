import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

// Upward-pointing leaflets, pine-tree shape. Each pair at a y-position,
// with half-width that grows toward the base.
const LEAFLETS: { y: number; w: number }[] = [
  { y: 18, w: 5 },
  { y: 24, w: 8 },
  { y: 32, w: 11 },
  { y: 40, w: 13 },
];

export function Fern({ size = 60 }: Props) {
  const t = useTheme();
  const sage = t.colors.illoSage;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Line x1={30} y1={12} x2={30} y2={50} stroke={sage} strokeWidth={1.5} strokeLinecap="round" />
      {/* top bud */}
      <Path d="M30 14 C28.5 12 28.5 11 30 10 C31.5 11 31.5 12 30 14 Z" fill={sage} />
      {LEAFLETS.map(({ y, w }) => (
        <Path
          key={`l-${y}`}
          d={`M30 ${y + 2} L${30 - w} ${y - 1} C${30 - w - 1} ${y + 1} ${30 - w / 2} ${y + 3} 30 ${y + 2} Z`}
          fill={sage}
        />
      ))}
      {LEAFLETS.map(({ y, w }) => (
        <Path
          key={`r-${y}`}
          d={`M30 ${y + 2} L${30 + w} ${y - 1} C${30 + w + 1} ${y + 1} ${30 + w / 2} ${y + 3} 30 ${y + 2} Z`}
          fill={sage}
        />
      ))}
    </Svg>
  );
}
