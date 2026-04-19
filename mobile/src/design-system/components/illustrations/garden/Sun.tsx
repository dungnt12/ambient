import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number };

const RAYS: [number, number, number, number][] = [
  [30, 10, 30, 16],
  [30, 44, 30, 50],
  [10, 30, 16, 30],
  [44, 30, 50, 30],
  [15.5, 15.5, 19.5, 19.5],
  [40.5, 40.5, 44.5, 44.5],
  [44.5, 15.5, 40.5, 19.5],
  [15.5, 44.5, 19.5, 40.5],
];

export function Sun({ size = 60 }: Props) {
  const t = useTheme();
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Circle cx={30} cy={30} r={8} fill={t.colors.brandSoft} />
      {RAYS.map(([x1, y1, x2, y2], i) => (
        <Line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={t.colors.brandSoft}
          strokeWidth={2}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}
