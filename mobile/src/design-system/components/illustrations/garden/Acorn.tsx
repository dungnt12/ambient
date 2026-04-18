import Svg, { Line, Path } from 'react-native-svg';
import { useTheme } from '../../../theme';

type Props = { size?: number; color?: string };

export function Acorn({ size = 60, color }: Props) {
  const theme = useTheme();
  const stroke = color ?? theme.colors.fgMuted;
  return (
    <Svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      {/* nut body */}
      <Path
        d="M30 48 C20 44 18 32 30 24 C42 32 40 44 30 48 Z"
        fill={theme.colors.brand}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* cap */}
      <Path
        d="M18 24 C18 18 24 14 30 14 C36 14 42 18 42 24 C42 26 36 26 30 26 C24 26 18 26 18 24 Z"
        fill={theme.colors.bgMuted}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {/* stem */}
      <Line
        x1={30}
        y1={10}
        x2={30}
        y2={14}
        stroke={stroke}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
