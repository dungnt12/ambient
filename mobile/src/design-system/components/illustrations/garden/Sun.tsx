import Svg, { Circle, Line } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Sun({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.brand;
  const rayStroke = theme.colors.brandSoft;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <Circle cx={30} cy={30} r={10} fill={theme.colors.brand} stroke={stroke} strokeWidth={1.5} />
      {/* 8 rays */}
      {[
        [30, 10, 30, 16],
        [30, 44, 30, 50],
        [10, 30, 16, 30],
        [44, 30, 50, 30],
        [15, 15, 19, 19],
        [41, 41, 45, 45],
        [45, 15, 41, 19],
        [15, 45, 19, 41],
      ].map(([x1, y1, x2, y2], i) => (
        <Line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={rayStroke}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ))}
    </Svg>
  );
}
