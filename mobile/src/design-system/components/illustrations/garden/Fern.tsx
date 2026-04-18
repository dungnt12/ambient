import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Fern({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  const frond = theme.colors.bgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* stem */}
      <Line
        x1={30}
        y1={12}
        x2={30}
        y2={48}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
      {/* fronds left & right, four pairs */}
      <Path
        d="M30 18 C24 18 20 14 20 10 C26 11 30 14 30 18 Z"
        fill={frond}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <Path
        d="M30 24 C36 24 40 20 40 16 C34 17 30 20 30 24 Z"
        fill={frond}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <Path
        d="M30 32 C23 32 18 28 18 22 C25 23 30 26 30 32 Z"
        fill={frond}
        stroke={stroke}
        strokeWidth={1.5}
      />
      <Path
        d="M30 40 C37 40 42 36 42 30 C35 31 30 34 30 40 Z"
        fill={frond}
        stroke={stroke}
        strokeWidth={1.5}
      />
    </Svg>
  );
}
